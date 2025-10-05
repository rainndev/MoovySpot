import WatchlistPage from "@/pages/WatchlistPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watchlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WatchlistPage />;
}
