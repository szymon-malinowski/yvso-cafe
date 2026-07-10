/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import "../../index.css";
import HeroComponent from "../../components/szymon/HeroComponent";

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return <HeroComponent />;
}
