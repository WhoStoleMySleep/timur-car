import getListingBySlug from "@/app/actions/getListingBySlug";
import ListingEditForm from "./components/ListingEditForm";
import { Suspense } from "react";
import LoadingComponent from "@/app//listings/[slug]/edit/loading";

interface EditListingsProps {
  searchParams: { slug: string };
  params: any;
}

export default async function Edit({ params }: { params: { slug: string } }) {
  const listingOptions = await getListingBySlug(params.slug);

  return (
    <div className="pt-[64px] md:pt-0">
      <Suspense fallback={<LoadingComponent />}>
        <ListingEditForm initialItems={listingOptions as any} />
      </Suspense>
    </div>
  );
}
