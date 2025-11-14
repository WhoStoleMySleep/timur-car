import ListingsList from "@/app/listings/components/ListingsList";
import { prisma } from "../../../libs/prismadb";
import { subDays } from "date-fns";
import { redirect } from "next/navigation";
import InputField from "../../../../../components/inputField";
import getListings from "@/app/actions/getListings";
import ReportCards from "../components/reportCards";
import getListingsCount from "@/app/actions/getListingsCount";
import getUsersCount from "@/app/actions/getUsersCount";
import GetPopularMake from "@/app/actions/getPopularMake";
import { Suspense } from "react";
import LoadingComponent from "@/app/profile/reports/search/loading";

// interface ReportsSearchProps {
//     searchParams: { query: string }
// }

// export default async function Search({searchParams: {query}}: ReportsSearchProps) {

interface ReportsSearchProps {
  searchParams: { query: string };
}

export default async function Search({
  searchParams: { query },
}: ReportsSearchProps) {
  const listings = await getListings();
  const totalListings = await getListingsCount();
  const totalUsers = await getUsersCount();

  const queryData = query;

  const currentDate = new Date();
  const subDate = await subDays(currentDate, +query!);

  const popularMake = await GetPopularMake(subDate!);

  const filteredListingsCount = await prisma.listing.count({
    where: {
      createdAt: {
        gte: subDate,
      },
    },
  });

  const filteredUsersCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: subDate,
      },
    },
  });

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

  return (
    <div className="pt-[64px] md:pt-0">
      <Suspense fallback={<LoadingComponent />}>
        <form
          action={GetDateFilter}
          className="flex flex-wrap items-center h-full max-w-md mx-auto mt-8 px-6"
        >
          <p className="flex-0">Pick time period</p>
          <select
            placeholder="Pick period.."
            name="searchQuery"
            className="mt-2 flex-2 bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-6 py-2 text-left cursor-default focus:outline-none focus:ring-british-green-4 focus:border-british-green-4 sm:text-sm "
          >
            <option
              value=""
              disabled
              selected
              className="cursor-default select-none relative py-2 pl-3 pr-9"
            >
              Pick period
            </option>
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
            totalListings={filteredListingsCount}
            totalUsers={filteredUsersCount}
            popularMake={popularMake}
            queryData={queryData}
          />
        </div>
      </Suspense>
    </div>
  );
}
