import PlayVideoPage from "@/pages/PlayVideoPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/play/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { id } = Route.useParams();

  return <PlayVideoPage searchParams={search} id={id} />;
}
