import ListingsList from "./listings/components/ListingsList";
import { Listing } from "@prisma/client";
import ListingsFilter from "./listings/components/ListingsFilter";
import getListings from "./actions/getListings";
import Landing from "../../components/landing";
import getCurrentUser from "./actions/getCurrentUser";
import { Suspense } from "react";
import LoadingComponent from "./loading";

interface ListingsListProps {
  initialItems: Listing[];
}

// const Home: React.FC<ListingsListProps> = async () => {

export default async function Page({ initialItems }: ListingsListProps) {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  return (
    <main className="bg-beige pt-[64px] md:pt-0 h-full">
      <Suspense fallback={<LoadingComponent />}>
        <Landing currentUser={currentUser!} />
        <div className="py-40 md:py-10 lg:py-0 lg:pb-20">
          <div className="h-72" />
          <ListingsFilter initialItems={listings} />
          {/* <p className="pt-8 font-bold text-3xl font-rubik text-british-green-1">Featured listings</p> */}
          <ListingsList initialItems={listings} featured={true} />
        </div>
      </Suspense>
    </main>
  );
}
