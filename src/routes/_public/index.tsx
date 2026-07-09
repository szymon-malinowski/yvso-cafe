/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import "../../index.css";
import Navbar from "../../components/szymon/Navbar";

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Navbar />
    </main>
  );
}
