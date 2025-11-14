import getListings from "@/app/actions/getListings";
import ReportCards from "./components/reportCards";
import getListingsCount from "@/app/actions/getListingsCount";
import getUsersCount from "@/app/actions/getUsersCount";
import GetPopularMake from "@/app/actions/getPopularMake";
// import GetDateFilter from "@/app/actions/getDateFilter";
import { Suspense, useContext } from "react";
import { createServerContext } from "react";
import { headers } from "next/headers";
import { redirect, useSearchParams } from "next/navigation";
import { subDays } from "date-fns";
import { prisma } from "@/app/libs/prismadb";
import SelectMenuCustom from "../../../../components/selectMenuCustom";
import LoadingComponent from "@/app/profile/reports/loading";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Error from "@/app/error";

// export const Reports = async () => {

export default async function Reports() {
  const listings = await getListings();
  const totalListings = await getListingsCount();
  const totalUsers = await getUsersCount();
  const popularMake = await GetPopularMake();

  const currentUser = await getCurrentUser();

  const userRole = currentUser?.role;

  const aggregateMake = await prisma.listing.aggregate({
    _max: {
      make: true,
    },
  });

  const mostPopularMake = await aggregateMake._max.make;

  const GetDateFilter = async (formData: FormData) => {
    "use server";

    const searchQuery = formData.get("searchQuery"?.toString());

    if (searchQuery) redirect("/profile/reports/search?query=" + searchQuery);

    const currentDate = new Date();
    const dateSub = await subDays(currentDate, +searchQuery!);

    const date = await prisma.listing.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        createdAt: {
          lte: dateSub,
        },
      },
    });

    return date;
  };

  const dateOptions = [
    // placeholder
    { label: "Since start", id: "0" },
    { label: "7 days", id: "1" },
    { label: "14 days", id: "2" },
    { label: "30 days", id: "3" },
  ];

  if (userRole !== "ADMIN") {
    return <Error />;
  }

  return (
    <div className="pt-[64px] md:pt-0">
      <Suspense fallback={<LoadingComponent />}>
        <form
          action={GetDateFilter}
          className="flex flex-wrap items-center h-full max-w-md mx-auto mt-8 px-6"
        >
          {/* <input name="searchQuery"></input> */}
          {/* <SelectMenuCustom name="searchQuery" options={dateOptions} /> */}
          <p className="flex-0 font-rubik font-medium">Pick time period</p>
          <select
            name="searchQuery"
            className="mt-2 flex-2 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-6 py-2 text-left cursor-default focus:outline-none focus:ring-british-green-4 focus:border-british-green-4 sm:text-sm "
          >
            {/* <option label="Since start" value="200" className="cursor-default select-none relative py-2 pl-3 pr-9">7 days</option> */}
            <option
              value="7"
              className="cursor-default select-none relative py-2 pl-3 pr-9"
            >
              7 days
            </option>
            <option
              value="14"
              className="cursor-default select-none relative py-2 pl-3 pr-9"
            >
              14 days
            </option>
            <option
              value="31"
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              31 days
            </option>
          </select>
          <button
            type="submit"
            className="mt-4 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
          >
            Submit
          </button>
        </form>
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <ReportCards
            initialItems={listings}
            totalListings={totalListings}
            totalUsers={totalUsers}
            popularMake={popularMake}
            popularMakeStart={mostPopularMake}
          />
        </div>
      </Suspense>
    </div>
  );
}
