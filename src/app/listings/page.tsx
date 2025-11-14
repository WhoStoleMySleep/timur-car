import getListings from "../actions/getListings";
import getListingsCount from "../actions/getListingsCount";
import ListingsList from "./components/ListingsList";
import { prisma } from "../libs/prismadb";
import Pagination from "../../../components/pagination";
import ListingCard from "./components/ListingCard";
import { Listing } from "@prisma/client";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/listings/loading";

interface ListingsProps {
  searchParams: {
    page: string;
    make: string;
    model: string;
    year: string;
    price: string;
    fuel: string;
    transmission: string;
  };
}

export default async function Listings({
  searchParams: {
    page = "1",
    make: makeParam,
    model: modelParam,
    year: yearParam,
    price: priceParam,
    fuel: fuelParam,
    transmission: transParam,
  },
}: ListingsProps) {
  const pageSize = 6;

  const currentPage = parseInt(page);

  const listings = await getListings();

  const filterData = async () => {
    const priceNum = parseInt(priceParam);

    const totalCount = await prisma?.listing.findMany({
      orderBy: { id: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      where: {
        ...(makeParam && { make: { equals: makeParam } }),
        ...(modelParam && { model: { equals: modelParam } }),
        ...(yearParam && { year: { gte: yearParam } }),
        ...(priceParam && { price: { lte: parseInt(priceParam) } }),
        ...(fuelParam && { fuel: { equals: fuelParam } }),
        ...(transParam && { transmission: { equals: transParam } }),
      },
    });

    return totalCount;
  };

  const listingCount = await prisma?.listing.count({
    where: {
      ...(makeParam && { make: { equals: makeParam } }),
      ...(modelParam && { model: { equals: modelParam } }),
      ...(yearParam && { year: { gte: yearParam } }),
      ...(priceParam && { price: { lte: parseInt(priceParam) } }),
      ...(fuelParam && { fuel: { equals: fuelParam } }),
      ...(transParam && { transmission: { equals: transParam } }),
    },
  });

  const filteredListings: Listing[] = await filterData();

  const totalPages = Math.ceil(listingCount / pageSize);

  const allParams = [
    makeParam,
    modelParam,
    yearParam,
    priceParam,
    fuelParam,
    transParam,
  ];

  const checkFilters = () => {
    if (allParams.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const filters = checkFilters();

  const checkListingsLength = () => {
    if (filteredListings.length < 1) {
      return true;
    } else {
      return false;
    }
  };

  // check if there are any listings based on the user's filters
  const anyListings = checkListingsLength();

  return (
    <div className="pt-[64px] md:pt-0">
      <div className="flex flex-col">
        <Suspense fallback={<LoadingComponent />}>
          <ListingCard
            listing={await filteredListings}
            anyFilters={filters}
            anyListings={anyListings}
          />
          <div className="flex-2">
            {!anyListings && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
