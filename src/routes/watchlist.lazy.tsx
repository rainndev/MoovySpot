import WatchlistPage from "@/pages/WatchlistPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/watchlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WatchlistPage />;
}
