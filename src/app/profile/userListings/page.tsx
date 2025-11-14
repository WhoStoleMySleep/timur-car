import getListings from "@/app/actions/getListings";
import getCurrentUser from "../../actions/getCurrentUser";
import getUserListings from "../../actions/getUserListings";
import ListingsList from "../../listings/components/ListingsList";
import { redirect, useSearchParams } from "next/navigation";
import getUserListingsAdmin from "@/app/actions/getUserEmail";
import { Suspense } from "react";
import LoadingComponent from "@/app/loading";
import Error from "@/app/error";

export default async function UserListings() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  const userRole = currentUser?.role;

  const searchUserListings = async (formData: FormData) => {
    "use server";

    const searchQuery = formData.get("searchQuery"?.toString());

    if (searchQuery) {
      redirect("/profile/userListings/search?query=" + searchQuery);
    }
  };

  if (userRole !== "ADMIN") {
    return <Error />;
  }

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <div className="pt-[64px] md:pt-0 px-8 md:px-0">
          <form
            className="flex flex-wrap items-center justify-center sm:justify-start h-full max-w-md mx-auto mt-8 gap-y-8"
            action={searchUserListings}
          >
            <input
              className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-0 focus:border-british-green-0 sm:text-sm"
              placeholder="User email.."
              name="searchQuery"
            />
            <button
              type="submit"
              className="ml-2 sm:ml-4 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
            >
              Submit
            </button>
          </form>
          <ListingsList initialItems={listings} profile={true} />
        </div>
      </Suspense>
    </>
  );
}
