import RecentViewPage from "@/pages/RecentViewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recent")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RecentViewPage />;
}
