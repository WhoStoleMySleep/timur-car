import ListingsList from "@/app/listings/components/ListingsList";
import { prisma } from "../../../libs/prismadb";
import { redirect } from "next/navigation";
import InputField from "../../../../../components/inputField";
import { Suspense } from "react";
import LoadingComponent from "@/app/loading";

interface SearchPageProps {
  searchParams: { query: string };
}

// export default async function SearchPage({searchParams: {query}}: SearchPageProps) {

export default async function Search({
  searchParams: { query },
}: SearchPageProps) {
  const user = await prisma.user.findUnique({
    where: {
      email: query as string,
    },
    select: {
      id: true,
    },
  });

  const userId = user?.id;

  const listings = await prisma.listing.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });

  const searchUserListings = async (formData: FormData) => {
    "use server";

    const searchQuery = formData.get("searchQuery"?.toString());

    if (searchQuery) {
      redirect("/profile/userListings/search?query=" + searchQuery);
    }
  };

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <div className="pt-[64px] md:pt-0">
          <form
            className="flex flex-wrap items-center h-full max-w-md mx-auto mt-8"
            action={searchUserListings}
          >
            {/* <InputField placeholder="User email.." name="searchQuery"/> */}
            <input
              className="flex-1 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-0 focus:border-british-green-0 sm:text-sm"
              placeholder="User email.."
              name="searchQuery"
            />
            <button
              type="submit"
              className="ml-2 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-british-green-2 hover:bg-british-green-4 dark:focus:ring-british-green-0"
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
