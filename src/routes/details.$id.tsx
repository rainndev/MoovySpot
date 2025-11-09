import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const VideoDetailsPageSchema = z.object({
  // 'type' is optional, but often validated. Using .pipe(z.string()) to enforce a type if present.
  type: z.enum(["tv", "movie"]).optional(),
});

export type VideoDetailsPageType = z.infer<typeof VideoDetailsPageSchema>;

export const Route = createFileRoute("/details/$id")({
  validateSearch: VideoDetailsPageSchema,
});
