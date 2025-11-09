import CategoryPage from "@/pages/CategoryPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/category")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryPage />;
}
