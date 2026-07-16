import Image from "next/image";
import Link from "next/link";

import canopyWordmarkLight from "@/public/images/landing/map-canopy-wordmark.svg";

/**
 * Slim dark header strip for funnel pages (reservation / checkout / reserved).
 * Uses the light wordmark variant (the same mark MapSection sets on navy-deep)
 * so the lockup reads on the dark strip — the primary canopy-wordmark.svg is
 * navy-on-transparent and would disappear here.
 */
export default function FunnelHeader() {
  return (
    <header className="bg-navy-deep">
      <div className="mx-auto flex h-16 max-w-[1296px] items-center justify-center px-6">
        <Link href="/" aria-label="The Canopy — home">
          <Image
            src={canopyWordmarkLight}
            alt="The Canopy"
            width={160}
            height={25}
            className="h-auto w-[150px] sm:w-[160px]"
          />
        </Link>
      </div>
    </header>
  );
}
