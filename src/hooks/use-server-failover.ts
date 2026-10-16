import { useCallback, useEffect, useRef, useState } from "react";

export interface FailoverServer {
  name: string;
  url: string;
}

export type ServerFailoverStatus =
  | "probing"
  | "loading"
  | "playing"
  | "exhausted";

interface UseServerFailoverOptions {
  /**
   * How long a server may stay in the "loading" state before it is treated as
   * down. Cross-origin embeds cannot be inspected, so a missing `load` event is
   * the only reliable signal that the host never rendered.
   */
  loadTimeoutMs?: number;
  /**
   * How long the pre-flight reachability check may take. An unreachable host
   * (DNS failure, refused connection) rejects `fetch` almost instantly, so this
   * is only a safety net for a stalled request.
   */
  probeTimeoutMs?: number;
  /** Pauses the watchdog (and open-ended cycling) until the player is on screen. */
  enabled?: boolean;
  onServerFailed?: (server: FailoverServer) => void;
  onSwitch?: (next: FailoverServer, previous: FailoverServer) => void;
  onExhausted?: () => void;
}

export const useServerFailover = (
  servers: FailoverServer[],
  {
    loadTimeoutMs = 12000,
    probeTimeoutMs = 6000,
    enabled = true,
    onServerFailed,
    onSwitch,
    onExhausted,
  }: UseServerFailoverOptions = {},
) => {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<ServerFailoverStatus>("probing");
  const [failedNames, setFailedNames] = useState<string[]>([]);

  const serversRef = useRef(servers);
  const indexRef = useRef(index);
  const failedRef = useRef<Set<string>>(new Set());
  const callbacksRef = useRef({ onServerFailed, onSwitch, onExhausted });

  serversRef.current = servers;
  indexRef.current = index;
  callbacksRef.current = { onServerFailed, onSwitch, onExhausted };

  const moveTo = useCallback((nextIndex: number) => {
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    setStatus("probing");
  }, []);

  const advancePastFailure = useCallback(
    (failed: FailoverServer) => {
      const list = serversRef.current;
      failedRef.current.add(failed.name);
      setFailedNames(Array.from(failedRef.current));
      callbacksRef.current.onServerFailed?.(failed);

      let nextIndex = -1;
      for (let step = 1; step <= list.length; step += 1) {
        const candidate = (indexRef.current + step) % list.length;
        if (!failedRef.current.has(list[candidate].name)) {
          nextIndex = candidate;
          break;
        }
      }

      if (nextIndex === -1) {
        setStatus("exhausted");
        callbacksRef.current.onExhausted?.();
        return;
      }

      callbacksRef.current.onSwitch?.(list[nextIndex], failed);
      moveTo(nextIndex);
    },
    [moveTo],
  );

  // A fresh set of servers (new media/season/episode) restarts the cycle.
  useEffect(() => {
    failedRef.current = new Set();
    setFailedNames([]);
    indexRef.current = 0;
    setIndex(0);
    setStatus("probing");
  }, [servers]);

  // Pre-flight check: an unreachable host rejects `fetch` right away, which is
  // the reliable "the server IP address could not be found" signal. Chrome still
  // fires the iframe `load` event for its own network-error page, so the load
  // event alone cannot tell a dead host from a working one.
  useEffect(() => {
    if (!enabled || status !== "probing" || servers.length === 0) return;

    const current = servers[index];
    if (!current) return;

    const controller = new AbortController();
    let settled = false;
    const timeout = window.setTimeout(() => controller.abort(), probeTimeoutMs);

    fetch(current.url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(() => {
        settled = true;
        setStatus("loading");
      })
      .catch(() => {
        if (!settled) advancePastFailure(current);
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      settled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [
    advancePastFailure,
    enabled,
    index,
    probeTimeoutMs,
    servers,
    status,
  ]);

  useEffect(() => {
    if (!enabled || status !== "loading" || servers.length === 0) return;

    const current = servers[index];
    if (!current) return;

    const timer = window.setTimeout(() => {
      advancePastFailure(current);
    }, loadTimeoutMs);

    return () => window.clearTimeout(timer);
  }, [advancePastFailure, enabled, index, loadTimeoutMs, servers, status]);

  const markReady = useCallback(() => {
    setStatus((previous) => (previous === "loading" ? "playing" : previous));
  }, []);

  const selectServer = useCallback(
    (nextIndex: number) => {
      const target = serversRef.current[nextIndex];
      if (!target) return;

      if (failedRef.current.delete(target.name)) {
        setFailedNames(Array.from(failedRef.current));
      }
      moveTo(nextIndex);
    },
    [moveTo],
  );

  /**
   * Manual equivalent of a watchdog timeout: the user says this source cannot
   * play the title, so mark it failed and hand off to the next one.
   */
  const reportUnavailable = useCallback(() => {
    const current = serversRef.current[indexRef.current];
    if (!current) return;
    advancePastFailure(current);
  }, [advancePastFailure]);

  const retry = useCallback(() => {
    failedRef.current = new Set();
    setFailedNames([]);
    moveTo(0);
  }, [moveTo]);

  return {
    server: servers[index],
    serverIndex: index,
    status,
    failedNames,
    isExhausted: status === "exhausted",
    markReady,
    selectServer,
    reportUnavailable,
    retry,
  };
};
