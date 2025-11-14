import { Suspense } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import getUserListings from "../../actions/getUserListings";
import ListingsList from "../../listings/components/ListingsList";
import LoadingComponent from "@/app/loading";

export default async function Listings() {
  // export const Listings = async () => {

  const currentUserListings = await getUserListings();

  return (
    <div className="pt-[64px] md:pt-0">
      <Suspense fallback={<LoadingComponent />}>
        <ListingsList initialItems={currentUserListings} profile={true} />
      </Suspense>
    </div>
  );
}
