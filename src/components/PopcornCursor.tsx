import { useEffect, useRef } from "react";

const kernelShapes = [
  "M9 14 C4 13 3 8 6 5 C8 2 12 1 15 3 C18 0 22 1 23 4 C26 3 29 6 27 9 C30 11 28 15 24 15 C24 18 19 19 17 16 C14 19 9 17 9 14 Z",
  "M8 13 C3 11 4 6 8 5 C9 2 14 1 16 4 C19 1 23 3 22 6 C26 6 27 11 23 13 C24 16 19 18 16 15 C13 18 8 16 8 13 Z",
  "M10 15 C5 15 3 10 7 7 C7 3 12 1 15 4 C18 1 22 2 22 6 C27 5 28 10 24 12 C25 16 20 18 17 15 C15 18 10 18 10 15 Z",
];

const kernelColors = ["#fff8e3", "#fff3cf", "#ffe9a8", "#ffdf8c"];
const interactiveSelector =
  "a, button, input, select, textarea, label, [role='button'], .hover-target";

const PopcornCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const kernels = new Set<HTMLElement>();

    if (!cursor || !finePointer.matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      cursor.style.opacity = "1";
      cursor.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 2}px, 0)`;
    };

    const handlePointerOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest(interactiveSelector)) {
        cursor.classList.add("open");
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const current = (event.target as Element | null)?.closest(
        interactiveSelector,
      );
      const next = (event.relatedTarget as Element | null)?.closest?.(
        interactiveSelector,
      );

      if (current && current !== next) cursor.classList.remove("open");
    };

    const spawnKernel = (x: number, y: number) => {
      const kernel = document.createElement("div");
      const size = 12 + Math.random() * 10;
      const shape = kernelShapes[Math.floor(Math.random() * kernelShapes.length)];
      const color = kernelColors[Math.floor(Math.random() * kernelColors.length)];
      const driftX = (Math.random() - 0.5) * 120;
      const fallY = 80 + Math.random() * 100;
      const rotation = (Math.random() - 0.5) * 500;

      kernel.className = "popcorn-kernel";
      kernel.style.left = `${x}px`;
      kernel.style.top = `${y}px`;
      kernel.innerHTML = `<svg viewBox="0 0 32 22" width="${size}" height="${size * 0.7}" aria-hidden="true"><path d="${shape}" fill="${color}" stroke="#e0a83a" stroke-width="0.6" /></svg>`;
      document.body.appendChild(kernel);
      kernels.add(kernel);

      const animation = kernel.animate(
        [
          { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${driftX * 0.5}px), calc(-50% - 20px)) rotate(${rotation * 0.3}deg)`,
            opacity: 1,
            offset: 0.25,
          },
          {
            transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${fallY}px)) rotate(${rotation}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 600 + Math.random() * 500,
          easing: "cubic-bezier(.4, 0, .2, 1)",
        },
      );

      animation.onfinish = () => {
        kernels.delete(kernel);
        kernel.remove();
      };
    };

    const handleMouseDown = (event: MouseEvent) => {
      cursor.classList.remove("open", "clicked");
      void cursor.offsetWidth;
      cursor.classList.add("clicked");

      if (reducedMotion.matches) return;

      const count = 8 + Math.floor(Math.random() * 5);
      for (let index = 0; index < count; index += 1) {
        window.setTimeout(
          () => spawnKernel(event.clientX, event.clientY),
          index * 20,
        );
      }
    };

    const handleMouseUp = () => cursor.classList.remove("clicked");
    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      cursor.classList.remove("open");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      kernels.forEach((kernel) => kernel.remove());
    };
  }, []);

  return (
    <div ref={cursorRef} className="popcorn-cursor" aria-hidden="true">
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 16 L31 16 L28 36 L12 36 Z"
          fill="#14c4b4"
          stroke="#141419"
          strokeWidth="1"
        />
        <path d="M13 16 L11 36 L15 36 L16.5 16 Z" fill="#f2f2f2" />
        <path d="M22 16 L21 36 L25 36 L24.5 16 Z" fill="#f2f2f2" />
        <rect x="8" y="13" width="24" height="4" rx="1.5" fill="#0e9c8f" />
        <circle cx="13" cy="11" r="4" fill="#ffe9a8" />
        <circle cx="19" cy="8" r="4.5" fill="#fff3cf" />
        <circle cx="25" cy="10.5" r="4" fill="#ffe9a8" />
        <circle cx="16" cy="7.5" r="3.5" fill="#fff8e3" />
        <circle cx="23" cy="6.5" r="3.5" fill="#ffe9a8" />
      </svg>
    </div>
  );
};

export default PopcornCursor;
