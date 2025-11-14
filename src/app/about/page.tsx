"use client";

import Image from "next/image";
import { Suspense } from "react";
import LoadingComponent from "../loading";
import aboutPhoto from "../../../public/aboutPhoto.jpg";

const About: React.FC = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="pt-[64px] md:pt-0">
        <div className="flex min-h-screen items-center justify-center bg-light-green">
          <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-x-8 bg-gray-100 rounded-2xl m-6 md:m-0 p-10 ">
            <div className="max-w-md max-h-md flex flex-col items-center justify-center mx-auto my-20 sm:max-w-lg font-rubik">
              <h2 className="text-4xl font-extrabold font-rubik tracking-tight sm:text-5xl">
                About us
              </h2>
              <h3 className="mt-4 text-xl font-rubik font-medium text-gray-900 sm:mt-3">
                We are FlatSix, the premier marketplace for buying and selling
                used cars. List your vehicles easily and connect with potential
                buyers all around the country.
              </h3>
            </div>
            <Image
              src={aboutPhoto}
              className="h-[26rem] sm:h-[32rem] w-[32rem] object-cover rounded-lg relative"
              alt="Photo for about page"
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default About;
