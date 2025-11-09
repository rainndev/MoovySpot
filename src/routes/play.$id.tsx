import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const PlaySearchSchema = z.object({
  // 'type' is optional, but often validated. Using .pipe(z.string()) to enforce a type if present.
  type: z.enum(["tv", "movie"]).optional(),

  // 'episode' is optional and expected to be a string (or missing)
  episode: z.number().optional(),

  season: z.number().optional(),
});

export type PlaySearch = z.infer<typeof PlaySearchSchema>;

export const Route = createFileRoute("/play/$id")({
  validateSearch: PlaySearchSchema,
});
