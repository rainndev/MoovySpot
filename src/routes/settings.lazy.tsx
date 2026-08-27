import SettingsPage from "@/pages/SettingsPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/settings")({
  component: SettingsPage,
});
