import Hero from "@/components/landing/Hero";
import LogoIntro from "@/components/landing/LogoIntro";
import QuickInfoBar from "@/components/landing/QuickInfoBar";
import WaitlistBand from "@/components/landing/WaitlistBand";
import IntentionalSection from "@/components/landing/IntentionalSection";
import ForYouHeading from "@/components/landing/ForYouHeading";
import ForYouGrid from "@/components/landing/ForYouGrid";
import PricingGallery from "@/components/landing/PricingGallery";
import TreehouseInfo from "@/components/landing/TreehouseInfo";
import CareSection from "@/components/landing/CareSection";
import StatsSection from "@/components/landing/StatsSection";
import MapSection from "@/components/landing/MapSection";
import PhotoGrid from "@/components/landing/PhotoGrid";
import Testimonial from "@/components/landing/Testimonial";
import PathSteps from "@/components/landing/PathSteps";
import Footer from "@/components/landing/Footer";

/** Step 1 — Landing page, sections in Figma order (node 16418:982). */
export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <LogoIntro />
      <QuickInfoBar />
      <WaitlistBand
        heading={["Only six treehouses.", "One waitlist."]}
        source="band-top"
        bgImage="/images/landing/waitlist-forest-bg.png"
      />
      <IntentionalSection />
      <ForYouHeading />
      <ForYouGrid />
      <PricingGallery />
      <TreehouseInfo />
      <WaitlistBand
        heading={["Only six treehouses.", "One waitlist."]}
        source="band-mid"
      />
      <CareSection />
      <StatsSection />
      <MapSection />
      <PhotoGrid />
      <Testimonial />
      <PathSteps />
      <WaitlistBand
        heading={["Only six treehouses.", "Join our waitlist today!"]}
        source="band-bottom"
        bgImage="/images/landing/final-cta-forest-bg.png"
      />
      <Footer />
    </main>
  );
}
