"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/** Celebration animation on the confirmation hero (client-provided .lottie). */
export default function SuccessAnimation() {
  return (
    <div className="pointer-events-none size-28 sm:size-32" aria-hidden="true">
      <DotLottieReact
        src="/HGMedia/Success%20animation.lottie"
        autoplay
        loop={false}
      />
    </div>
  );
}
