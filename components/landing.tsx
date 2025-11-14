"use client";

import landingPhoto from "../public/landingPhoto.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface LandingProps {
  currentUser: User;
}

export const Landing: React.FC<LandingProps> = () => {
  const router = useRouter();
  const {
    // data: session
    status: status,
  } = useSession();

  useEffect(() => {
    router.prefetch("/listings/create");
    router.prefetch("/signin");
    router.prefetch("/listings");
  }, [router]);

  const handleCreateOnClick = () => {
    if (status === "authenticated") {
      router.push("/listings/create");
    } else {
      router.push("/signin");
    }
  };

  return (
    <>
      <div className="static flex items-center xs:pt-0 w-full justify-center font-rubik">
        <Image
          src={landingPhoto}
          // unoptimized={true} priority
          alt="Landing Photo"
          className="brightness-[0.6] relative w-full min-h-[270px] sm:max-h-[32rem] object-cover shadow-md"
        />
        <div className="absolute text-white max-w-5xl mx-auto pt-8 sm:pt-10 pb-8 sm:pb-6 lg:pb-0">
          <p className="mt-2 text-xl sm:text-2xl font-semibold px-6 xl:px-0">
            Ваш автомобиль, ваша цена, наша платформа
          </p>
          <p className="mt-4 text-sm sm:text-lg font-light px-6 xl:px-0">
            Попрощайтесь с традиционным процессом продажи автомобиля. Вы можете выставить свой подержанный автомобиль на продажу, привлечь заинтересованных покупателей и заключить
сделку — всего за несколько простых шагов.
          </p>
          <div className="flex justify-center items-center pb-0 sm:pb-12 lg:pb-20 px-6 xl:px-0 sm:block">
            <button
              onClick={handleCreateOnClick}
              className="text-white mt-8 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-md px-6 py-4 text-center sm:mr-4 border border-white bg-transperant hover:bg-british-green-2 dark:focus:ring-british-green-0"
            >
              Добавить объявление
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
