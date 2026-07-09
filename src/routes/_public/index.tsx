import { createFileRoute } from "@tanstack/react-router";
import "../../index.css";

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return <main></main>;
}
