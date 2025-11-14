"use client";

import { Suspense } from "react";
import LoadingComponent from "@/app/contact/loading";
import Image from "next/image";
import contactPhoto from "../../../public/contactPhoto.jpg";

const Contact: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <div className="pt-[64px] md:pt-0">
          <div className="relative bg-gray-100 w-full min-h-screen">
            <div className="lg:absolute lg:inset-0">
              <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <Image
                  src={contactPhoto}
                  className="h-64 w-full object-cover lg:absolute lg:h-full"
                  alt="Photo for contact page"
                />
              </div>
            </div>
            <div className="flex h-screen items-center relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-32">
              <div className="lg:pr-8">
                <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0 font-rubik">
                  <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Let&apos;s work together
                  </h2>
                  <p className="mt-4 text-xl font-medium text-gray-500 sm:mt-3">
                    We&apos;d love to hear from you! You are welcome to contact
                    us via the ways listed below.
                  </p>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl mt-6">
                    Email:
                    <span className="ml-2 font-light">support@flatsix.com</span>
                  </h3>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl mt-6">
                    Phone:
                    <span className="ml-2 font-light">+11 111 111 111</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Contact;
