"use client";

import { Listing } from "@prisma/client";
import { useState, useEffect, Fragment } from "react";
import ImageGallery from "./imageGallery";
import { Menu, Transition } from "@headlessui/react";

function classNames(...className: any) {
  return className.filter(Boolean).join(" ");
}

interface ListingPageProps {
  initialItems: Listing[];
  listingEmail: {
    email: string;
  } | null;
}

const ListingPage: React.FC<ListingPageProps> = ({
  initialItems,
  listingEmail,
}) => {
  const [items, setItems] = useState(initialItems);

  // const userEmail = listingEmail?.email

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (listingEmail !== null) {
      setUserEmail(listingEmail?.email);
    }
  }, [listingEmail]);

  const formattedDate =
    items !== null
      ? new Intl.DateTimeFormat("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(items[0].createdAt))
      : "";

  // fixes hydration error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 border border-black border-opacity-10 rounded-xl bg-gray-50 appearance-none font-rubik">
        <div className="">
          {items?.map((item) => (
            <div
              key={item.id}
              className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start "
            >
              <div className="col-span-2">
                <p className="my-2 font-rubik text-sm font-medium text-gray-600">
                  {item.make}/{item.model}/{item.coupe_type}/Added:{" "}
                  {formattedDate}
                </p>
                <h2 className="mb-4 font-rubik text-3xl font-bold text-gray-900">
                  {item.title}
                </h2>
              </div>
              <ImageGallery listing={items} />
              <div className="col-span-1 flex flex-col lg:py-20 text-ellipsis">
                <p className="my-6 font-rubik font-bold text-3xl text-gray-800">
                  Summary
                </p>
                <div className="grid grid-cols-3 text-sm xs:text-md gap-4 font-rubik font-light">
                  <p className="">
                    Car type:
                    <span className="text-british-green-4 pl-1 font-bold">
                      {item.coupe_type}
                    </span>
                  </p>
                  <p className="">
                    Year:
                    <span className="text-british-green-4 pl-1 font-bold">
                      {item.year}
                    </span>
                  </p>
                  <p className="break-normal">
                    Condition: <br className="lg:hidden" />
                    <span className="text-british-green-4 md:pl-1 font-bold text-ellipsis">
                      {item.condition}
                    </span>
                  </p>
                  <p className="">
                    Fuel:
                    <span className="text-british-green-4 pl-1 font-bold">
                      {item.fuel}
                    </span>
                  </p>
                  <p className="">
                    Mileage:
                    <span className="text-british-green-4 pl-1 font-bold">
                      {item.mileage}
                    </span>
                  </p>
                  <p className="">
                    Color:
                    <span className="text-british-green-4 pl-1 font-bold">
                      {item.color}
                    </span>
                  </p>
                  <p className="break-words">
                    Transmission: <br className="lg:hidden" />
                    <span className="text-british-green-4 md:pl-1 font-bold text-ellipsis">
                      {item.transmission}
                    </span>
                  </p>
                  <p className="">
                    Number of doors:
                    <span className="text-british-green-4 pl-1 font-bold">
                      {item.number_doors}
                    </span>
                  </p>
                  {item.variant ? (
                    <p className="">
                      Variant:
                      <span className="text-british-green-4 pl-1 font-bold">
                        {item.variant}
                      </span>
                    </p>
                  ) : (
                    <p className="">
                      {""}
                      <span className="text-british-green-4 pl-1">{""}</span>
                    </p>
                  )}
                </div>
                <div className="">
                  <p className="mt-8 mb-4 text-lg font-bold">
                    Description from the seller:
                  </p>
                  <p className="text-md font-md">{item.body}</p>
                  <div className="pt-8">
                    <p className="mr-2 mt-8 text-xl font-semibold text-orange-4">
                      €{item.price}
                    </p>
                    {/* <button className="text-white mt-4 focus:ring-2 focus:outline-none focus:british-green-0 font-medium rounded-lg text-md px-4 py-2 text-center mr-4 md:mr-4 border border-white bg-british-green-1 hover:bg-british-green-2 dark:focus:ring-british-green-0">Contact the seller</button> */}
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button>
                          <button className="text-white mt-4 focus:ring-2 focus:outline-none focus:british-green-0 font-medium rounded-lg text-md px-4 py-2 text-center mr-4 md:mr-4 border border-white bg-british-green-1 hover:bg-british-green-2 dark:focus:ring-british-green-0">
                            Contact the seller
                          </button>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute origin-top-left left-0 sm:origin-top-right sm:right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  Email: {`${userEmail}`}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListingPage;
