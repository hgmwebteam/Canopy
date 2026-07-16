import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

type Props = {
  /** Two heading lines, e.g. ["Only six treehouses.", "One waitlist."] */
  heading: [string, string];
  body?: string;
  /** Lead source recorded with the signup, e.g. "band-top". */
  source: string;
  /** Optional forest background (public path). Ignored when tone="light". */
  bgImage?: string;
  /** "dark" (navy band, default) or "light" (sand band — use between dark sections). */
  tone?: "dark" | "light";
};

const DEFAULT_BODY =
  "Your reconnection begins here. Join us in the Treetops in the Canopy Circle for first access to opening dates at exclusive rates.";

export default function WaitlistBand({
  heading,
  body = DEFAULT_BODY,
  source,
  bgImage,
  tone = "dark",
}: Props) {
  const light = tone === "light";
  return (
    <section
      data-waitlist-band
      className={`relative overflow-hidden ${light ? "bg-sand" : "bg-navy-deep"}`}
    >
      {!light && bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      )}
      <div className="relative mx-auto flex max-w-[1296px] flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-[634px]">
          <h2
            className={`font-serif text-[28px] leading-[36px] sm:text-[35px] sm:leading-[42px] ${
              light ? "text-navy" : "text-cream"
            }`}
          >
            {heading[0]}
            <br />
            {heading[1]}
          </h2>
          <p
            className={`mt-4 text-base leading-6 ${
              light ? "text-[#393939]" : "text-cream"
            }`}
          >
            {body}
          </p>
        </div>
        <WaitlistForm
          source={source}
          variant="stacked"
          buttonLabel="Reserve My Spot"
          className="w-full max-w-[463px] shrink-0"
        />
      </div>
    </section>
  );
}
