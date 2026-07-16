import Image from "next/image";

import founderPortrait from "@/public/images/landing/founder-sue-hough.png";

export default function Testimonial() {
  return (
    <section className="border-y border-[#d6c7af] bg-[#f1ece4]">
      {/* Design measures 128px from section top to the circle's top edge; the photo cutout
          rises 53px above the circle inside the wrapper, so the wrapper padding is 128-53=75px. */}
      <div className="mx-auto flex max-w-[1296px] flex-col items-center px-6 pt-16 pb-12 lg:pt-[75px] lg:pb-16">
        <div className="flex w-full max-w-[764px] flex-col items-center gap-10">
          {/* Portrait: photo cutout rising out of a gradient-filled circle */}
          <div className="relative h-[322px] w-[270px]">
            <div className="absolute bottom-0 left-1/2 size-[269px] -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-[#f5f5f5] bg-white shadow-[0px_6px_13px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, #98a1a0 0%, #808887 25%, #686e6d 50%, #505554 75%, #383b3b 100%)",
                }}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 h-[322px] w-[258px] -translate-x-1/2 overflow-hidden rounded-b-full">
              <Image
                src={founderPortrait}
                alt="Sue Hough, founder of The Canopy, smiling in a denim jacket"
                fill
                sizes="258px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2">
            <p className="font-sans text-xs uppercase leading-6 tracking-[3.6px] text-copper">
              Meet the Founder
            </p>
            <div className="w-full px-2">
              <blockquote className="border-l-2 border-copper px-6">
                <p className="font-serif text-[17px] italic leading-[30px] text-[#3d3f45] sm:text-[20px] sm:leading-[34px]">
                  With over two decades in residential construction, I have
                  learned that the details really matter and that true
                  hospitality isn’t an accident—it’s designed. I brought that
                  discipline here to the Smoky Mountains to establish{" "}
                  <strong className="font-bold">The Canopy</strong>, a retreat
                  built with the sole intention of providing a sanctuary of
                  quiet and rest. Every space has been carefully shaped to
                  ensure that from the moment you arrive, you feel the weight
                  of the world lift and experience what it truly means to be
                  fully cared for
                </p>
              </blockquote>
            </div>
            <div className="w-full px-8">
              <p className="font-sans text-base font-bold leading-6 text-[#3d3f45]/80">
                Sue Hough
              </p>
              <p className="font-sans text-sm leading-6 text-[#3d3f45]/50">
                Founder · 21 Years in Residential Construction · Licensed
                Tennessee GC
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
