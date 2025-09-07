import WhyUs from "@/components/layout/HomePage/WhyUs";
import LargeTitle from "@/components/ui/Title/LargeTitle";
import Title from "@/components/ui/Title/Title";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="mt-16 body-content">
        <div className="w-full px-5 md:w-10/12 lg:w-10/12 mx-auto flex h-fit flex-col items-center justify-center space-y-4">
          <LargeTitle className="text-center">
            Transforming Business Registration for a <span className="text-primary">New Generation of Entrepreneurs</span>
          </LargeTitle>
          <p className="text-sm md:text-md text-center w-10/12">
            At Mr. Registrar, we’re redefining how businesses get started. By
            combining advanced AI technology with expert insights, we’ve created a
            platform that removes complexity, reduces delays, and guides
            entrepreneurs through every step of the registration process. Whether
            you're launching your first venture or expanding into new markets, we
            make business setup faster, smarter, and more reliable—so you can
            focus on building, not filing.{" "}
          </p>
        </div>

        <Image
          src={"/background-about-us.jpg"}
          width={1200}
          height={400}
          alt="hero image"
          className="w-full h-[350px] object-cover object-center mt-8 rounded-lg"
        />

      </div>

      <div className="mb-16">
        <WhyUs />
      </div>
    </div>
  );
};

export default page;
