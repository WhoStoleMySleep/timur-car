"use client";

import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
} from "@heroicons/react/24/solid";
import { Listing } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function classNames(...className: any) {
  return className.filter(Boolean).join(" ");
}

interface ReportCardsProps {
  initialItems: Listing[];
  totalListings: number;
  totalUsers: number;
  popularMake: any;
  popularMakeStart?: any;
  queryData?: any;
}

export const ReportCards: React.FC<ReportCardsProps> = ({
  initialItems,
  totalListings,
  totalUsers,
  popularMake,
  queryData,
  popularMakeStart,
}) => {
  const [items, setItems] = useState(initialItems);
  const [listingsCount, setListingsCount] = useState(totalListings);
  const [usersCount, setUsersCount] = useState(totalUsers);
  const [topMake, setTopMake] = useState(popularMake);
  const [topMakeStart, setTopMakeStart] = useState(popularMakeStart);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setListingsCount(totalListings);
  }, [totalListings]);

  useEffect(() => {
    setUsersCount(totalUsers);
  }, [totalUsers]);

  useEffect(() => {
    setTopMake(popularMake);
  }, [popularMake]);

  useEffect(() => {
    setTopMakeStart(popularMakeStart);
  }, [popularMakeStart]);

  // console.log(dateItems)

  const item = initialItems[0];

  const stats = [
    { name: "Total listings", stat: `${listingsCount}` },
    { name: "Total users", stat: `${usersCount}` },
    !queryData
      ? { name: "Top Make", stat: `${topMakeStart}` }
      : { name: "Top Make", stat: `${topMake}` },
  ];

  return (
    <div className="w-3xl h-screen">
      {queryData ? (
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Last {+queryData} days
        </h3>
      ) : (
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Since start
        </h3>
      )}
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-orange-1">
                {item.stat}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ReportCards;
