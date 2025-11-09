import RecentViewPage from "@/pages/RecentViewPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/recent")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RecentViewPage />;
}
