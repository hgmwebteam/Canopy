import type { Metadata } from "next";
import LoginForm from "@/components/dashboard/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — The Canopy",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="doclog flex min-h-screen items-center justify-center bg-(--dl-canvas) p-4 font-sans" data-theme="light">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--dl-text-4)">
            The Canopy · Internal
          </p>
          <h1 className="mt-1 font-serif text-3xl text-(--dl-text)">Dashboard sign-in</h1>
        </div>
        <div className="rounded-2xl bg-(--dl-card) p-6 ring-1 ring-(--dl-ring)">
          <LoginForm />
        </div>
        <p className="mt-4 text-center text-xs text-(--dl-text-4)">
          Access is for the Canopy / HGM team only.
        </p>
      </div>
    </div>
  );
}
