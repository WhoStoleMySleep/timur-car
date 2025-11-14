import getListings from "../actions/getListings";
import ListingsList from "./components/ListingsList";

export default async function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listings = await getListings();

  return (
    <div className="h-full">
      {/* <ListingsList 
          initialItems={listings}
        /> */}
      {children}
    </div>
  );
}
