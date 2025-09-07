import InstantContactUs from "@/components/layout/Global/InstantContactUs";
import BusinessRegistrationProcess from "@/components/layout/HomePage/BusinessRegistrationProcess";
import HeroSection from "@/components/layout/HomePage/HeroSection";
import HighlightSection from "@/components/layout/HomePage/HighlightSection";
import WhyUs from "@/components/layout/HomePage/WhyUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      {/* hero section */}
      <HeroSection />

      {/* business introduction section */}
      <WhyUs />

      {/* hightlight section */}
      <HighlightSection />
      
      {/* how process flow */}
      <BusinessRegistrationProcess />
      
      {/* isntant contact us section */}
      <InstantContactUs />

      
    </div>
  );
}
