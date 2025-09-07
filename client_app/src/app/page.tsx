import InstantContactUs from "@/components/layout/Global/InstantContactUs";
import HeroSection from "@/components/layout/HomePage/HeroSection";
import WhyUs from "@/components/layout/HomePage/WhyUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      {/* hero section */}
      <HeroSection />

      {/* business introduction section */}
      <WhyUs />
      
      {/* isntant contact us section */}
      <InstantContactUs />

      
    </div>
  );
}
