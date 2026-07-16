import tactileNostalgia from "@/public/images/landing/tactile-nostalgia.jpg";
import curatedWellness from "@/public/images/landing/curated-wellness.jpg";

type FeatureRow = {
  /** Ambient video for the media block; poster shows until it loads. */
  video: string;
  poster: typeof tactileNostalgia;
  alt: string;
  title: string;
  body: string;
  /** Figma frame ratio for the media block. */
  aspect: string;
  /** Media sits right of the text on desktop. */
  imageRight?: boolean;
};

const rows: FeatureRow[] = [
  {
    video: "/videos/experience-tactile-nostalgia.mp4",
    poster: tactileNostalgia,
    alt: "Treehouse with floor-to-ceiling windows glowing at golden sunrise, sunbeams streaming through the forest",
    title: "Tactile Nostalgia & Bespoke Arrival",
    body: "Indulge in screen-free interiors featuring phonographs, vinyl records, Polaroid cameras, and wind-up clocks — a true return to presence. Your personalized experience begins even before you arrive: select your preferred library book, curated pantry provisions, and brew bar options for a seamless start.",
    aspect: "aspect-[632/483]",
  },
  {
    video: "/videos/experience-wellness.mp4",
    poster: curatedWellness,
    alt: "Aerial view of a treehouse and private sauna cabin connected by a suspension bridge above the forest canopy",
    title: "Curated Wellness",
    body: "Private sauna, hydrogen-infused soaking tub, and outdoor shower — a wellness circuit in every treehouse.",
    aspect: "aspect-[632/477]",
    imageRight: true,
  },
];

export default function IntentionalSection() {
  return (
    <section className="bg-[#f3efe8]">
      <div className="mx-auto max-w-[1296px] px-6 pt-20 pb-16 lg:pt-[122px] lg:pb-12">
        <div className="mx-auto max-w-[616px] text-center">
          <p className="font-sans text-xs leading-6 tracking-[3.6px] text-copper">
            THE EXPERIENCE
          </p>
          <h2 className="mt-4 font-serif text-[28px] leading-9 text-navy sm:text-[35px] sm:leading-[42px]">
            This isn&apos;t Rustic. It&apos;s intentional
          </h2>
          <p className="mt-4 font-sans text-base leading-6 text-navy">
            Every element has been curated to help you reconnect — with nature,
            with your partner, and with yourself. The Canopy is where luxury
            meets silence.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-16 lg:mt-[52px] lg:gap-[140px]">
          {rows.map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`relative w-full overflow-hidden rounded-3xl ${row.aspect} ${
                  row.imageRight ? "lg:order-2" : ""
                }`}
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={row.video}
                  poster={row.poster.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={row.alt}
                />
              </div>
              <div className={row.imageRight ? "lg:order-1" : ""}>
                <h3 className="font-serif text-[22px] font-bold leading-7 text-navy sm:text-2xl sm:leading-[29px]">
                  {row.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-6 text-navy">
                  {row.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
