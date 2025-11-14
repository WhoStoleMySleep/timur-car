// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client'

// import getListingBySlug from "@/app/actions/getListingBySlug";
// import getListings from "@/app/actions/getListings";
// import {
//     // usePathname, useRouter,
//     useSearchParams } from 'next/navigation';
// import { useEffect, useState } from "react";
// import ListingsList from "../../components/ListingsList";

// export const SlugListingComp = async () => {

//     const searchParams = useSearchParams()
//     const slug = await searchParams.get(`slug`)

//     const listings = await getListings();

//     const [items, setItems] = useState(listings)

//     if(!slug){
//         console.log('slug doesnt exist')
//         return <div>No slug found</div>;
//     }

//     const [filteredItems, setFilteredItems] = useState(items || []);

//     useEffect(() => {
//         const filteredSlug = items?.filter(item => item.slug == slug);
//         slug ? setFilteredItems(filteredSlug) : ''
//     }, [items]);

//     const listingBySlug = await getListingBySlug(slug)

//     return (
//         <div>
//             <button className="border bg-british-green-4">
//                 My listings
//             </button>
//             <ListingsList initialItems={listings} />
//         </div>
//     )
// };

// export default SlugListingComp
