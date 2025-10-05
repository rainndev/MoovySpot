import CategoryPage from "@/pages/CategoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/category")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryPage />;
}
