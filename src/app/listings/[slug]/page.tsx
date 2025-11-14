import getListingBySlug from "@/app/actions/getListingBySlug";
import ListingsList from "../components/ListingsList";
import ListingPage from "./components/ListingPage";
import getEmailBySlug from "@/app/actions/getEmailBySlug";
import { Suspense } from "react";
import LoadingComponent from "@/app//listings/[slug]/loading";

interface Params {
  slug: string;
}

export default async function Page({
  params,
}: {
  params: Params;
}): Promise<JSX.Element | null> {
  const slugParam = params.slug;

  const listing = await getListingBySlug(slugParam);
  const userEmail = await getEmailBySlug(slugParam);

  // if (!listing) {
  //     console.log('no listing');
  // }

  // if (!userEmail) {
  //     console.log('no user Email');
  // }

  return (
    <div className="pt-[64px] md:pt-0">
      <Suspense fallback={<LoadingComponent />}>
        <ListingPage initialItems={listing as any} listingEmail={userEmail} />
      </Suspense>
    </div>
  );
}
