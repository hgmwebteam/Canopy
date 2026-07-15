import Image from "next/image";

import canopyWordmark from "@/public/images/landing/canopy-wordmark.svg";
import mmrMark from "@/public/images/landing/mmr-mark.svg";
import mmrTextLeft from "@/public/images/landing/mmr-text-left.svg";
import mmrTextRight from "@/public/images/landing/mmr-text-right.svg";
import arrowCircleDown from "@/public/images/landing/arrow-circle-down.svg";

/**
 * Logo / tagline intro block below the hero (Figma node 16418:985).
 * THE CANOPY wordmark, Moody Moon Ridge marks, tagline, supporting
 * lines, and the scroll-down arrow rule.
 */
export default function LogoIntro() {
  return (
    <section className="bg-[#f3efe8]">
      <div className="mx-auto flex max-w-[1296px] flex-col items-center gap-8 px-6 py-10 sm:py-12">
        <div className="flex flex-col items-center justify-center gap-[16.8px]">
          <Image
            src={canopyWordmark}
            alt="The Canopy"
            width={309}
            height={49}
            className="h-auto w-[260px] max-w-full sm:w-[309px]"
          />
          <div
            role="img"
            aria-label="Moody Moon Ridge"
            className="flex flex-col items-center gap-[9.6px]"
          >
            <Image
              src={mmrMark}
              alt=""
              width={39}
              height={39}
              className="size-[39px]"
            />
            <div className="flex items-center gap-[8.4px]">
              <Image
                src={mmrTextLeft}
                alt=""
                width={105}
                height={10}
                className="h-[9.8px] w-[105.3px]"
              />
              <Image
                src={mmrTextRight}
                alt=""
                width={42}
                height={10}
                className="h-[9.6px] w-[42.3px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pb-2">
          <h1 className="max-w-[740px] text-center font-serif text-[28px] leading-[36px] text-navy sm:text-[35px] sm:leading-[42px]">
            Luxury Treehouses for Quiet Connection
          </h1>
          <p className="mt-2 max-w-[657px] text-center font-sans text-base leading-6 text-navy">
            The Canopy is hospitality designed to help people finally exhale.
          </p>
          <p className="mt-4 text-center font-sans text-base font-bold leading-6 text-navy">
            {`Tennessee ･20 min from Great Smoky Mountains `}
          </p>
        </div>
        <Image
          src={arrowCircleDown}
          alt=""
          aria-hidden="true"
          width={472}
          height={49}
          className="h-auto w-full max-w-[471.6px]"
        />
      </div>
    </section>
  );
}
