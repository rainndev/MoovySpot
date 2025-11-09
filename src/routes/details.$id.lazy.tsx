import VideoDetailsPage from "@/pages/VideoDetailsPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/details/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const searchParams = Route.useSearch();
  return <VideoDetailsPage id={id} searchParams={searchParams} />;
}
