import type { Metadata } from "next";
import LogView from "@/components/log/LogView";

export const metadata: Metadata = {
  title: "Project Log — The Canopy",
  robots: { index: false, follow: false },
};

export default function LogPage() {
  return <LogView />;
}
