'use client';

import { Listing } from "@prisma/client";
import { useContext, useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { ListingsFilter, FilterContext } from "./ListingsFilter";
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import Pagination from "../../../../components/pagination";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import AlertSuccess from "../../../../components/alertSuccess";

interface ListingsListProps {
  initialItems: Listing[]
  updatedItems?: Listing[];
  profile?: boolean;
  featured?: boolean;
  total?: Listing[];
  filteredListings?: Listing[];
}

export default function ListingsList({ initialItems, profile, updatedItems, featured, total, filteredListings}: ListingsListProps) {

// const ListingsList: React.FC<ListingsListProps> = ({initialItems, profile, updatedItems, featured, total, filteredListings}) => {

  const itemsTest = useContext(FilterContext)

  const [items, setItems] = useState(initialItems)
  const [totalItems, setTotalItems] = useState(total || [])
  const [updatedItemsState, setUpdatedItemsState] = useState(updatedItems)
  
  const [selectedSlug, setSelectedSlug] = useState("")
  const [selectedSlugEdit, setSelectedSlugEdit] = useState("")

  const [slug, setSlug] = useState('')

  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  const initialFilters = useContext(FilterContext)

  const [filteredState, setFilteredState] = useState(initialFilters || [])

  const [filteredItems, setFilteredItems] = useState(filteredState || []);

  const [filteredPagination, setFilteredPagination] = useState(filteredListings || []);

  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  useEffect(() => {
      router.prefetch("/listings");
  }, [router]);

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const make = searchParams.get(`make`)
  const model = searchParams.get(`model`)
  const year = searchParams.get(`year`)
  const price = searchParams.get(`price`)
  const fuel = searchParams.get(`fuel`)
  const transmission = searchParams.get(`transmission`)

  useEffect(() => {
    const filterData = items?.filter((item) => {
      const isMakeMatch = !make || item.make === make;
      const isModelMatch = !model || item.model === model;
      const isFuelMatch = !fuel || item.fuel === fuel;
      const isTransmissionMatch = !transmission || item.transmission === transmission;
      const isYearMatch = !year || Number(item.year) >= Number(year);
      const isPriceMatch = !price || Number(item.price) <= Number(price);
  
      return isMakeMatch && isModelMatch && isFuelMatch && isTransmissionMatch && isYearMatch && isPriceMatch;
    });
    if(totalItems) {
    if(totalItems?.length > 0) {
      setTotalItems(filterData)
    }} else {
    setFilteredItems(filterData);
    }
  }, [items, make, model, fuel, transmission, year, price, filteredPagination, totalItems]);  

  if(filteredItems.length < 0) {
    return (
      <div>
        <p>No items found</p>
      </div>
    )
  }

    // open the specific listing's page
  const handleOnClick = (slug: string) => {
    setSelectedSlug(slug)
    const queryParams = new URLSearchParams('=');
    queryParams.append('slug', selectedSlug);

    router.push(`/listings/${selectedSlug}`);
  };  

    // redirect to edit form
  const handleOnClickEdit = (slug: string) => {
    setSelectedSlugEdit(slug);
  };
  
  useEffect(() => {
    if (deleteConfirm === true) {
      const deleteListing = async () => {
        try {
          const response = await axios.delete('/api/listings/delete', {
            data: { slug }
          });
          setItems(items.filter(item => item.slug !== slug))
          if (response.data.error) {
            console.log('Error while trying to delete listing:', response);
          } else {
            console.log('Listing deleted successfully:', response);
          }
        } catch (error) {
          console.error('An error occurred during listing deletion:', error);
        } finally {
          console.log('Listing deletion process finished.');
          setDeleteConfirm(false)
          setShowSuccess(true)
          setOpen(false);
        }
      };
  
      deleteListing();
    }
  }, [deleteConfirm, items, setItems]);
  
  const handleDelete = async (slug: string) => {
    setOpen(true)
    setShowSuccess(false)
    setSlug(slug)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (selectedSlug !== '') {
      router.push(`/listings/${selectedSlug}`);
    }
    if (selectedSlugEdit !== '') {
      router.push(`/listings/${selectedSlugEdit}/edit`);
    }
  }, [selectedSlug, selectedSlugEdit, filteredItems, router]);  


    if(profile == true) {
      return (
      <>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" 
        // initialFocus={cancelButtonRef} 
        onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Delete listing
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this listing? All of the data related to it will be permanently removed.
                          This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-british-green-5 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex justify-center mx-auto sm:justify-end sticky top-0 z-10">
        {showSuccess && (
          <div className="absolute top-0 right-0 p-10 pt-20 sm:pt-10 z-10">
            <AlertSuccess field={"Listing successfully deleted!"}/>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap	max-w-6xl mx-auto mb-20 appearance-none font-rubik">
      {items?.map((item) => (
        <div 
        key={item.id}
        className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          {item.photos.length > 0 ? <img className="h-48 w-full object-cover object-center" src={item.photos[0]} alt="Product Image" />
          : 
          <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
           }
          <div className="p-4">
            <h2 
            onClick={() => handleOnClick(item.slug)} 
            className="mb-2 text-lg font-medium text-white">{item.title}</h2>
            <h3 className="mb-2 text-md font-medium text-gray-300 ">{item.year}, {item.fuel}, {item.mileage}</h3>
            <p className="mb-2 text-base text-white">{item.body}</p>
            <div className="flex items-center justify-between">
              <p className="mr-2 text-lg font-semibold text-white justify-items-end ">€{item.price}</p>
              <div className="flex">
              <button onClick={() => handleOnClickEdit(item.slug)}  className="text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-4 py-2 text-center mr-2 md:mr-2 bg-light-green hover:bg-british-green-4 focus:ring-british-green-2">Edit</button>
              <button onClick={() => handleDelete(item.slug)}  className="text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-3 py-2 text-center mr-2 md:mr-2 bg-light-green hover:bg-british-green-4 focus:ring-british-green-2">X</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      </>
      )
    
  }

  if(featured === true) {
  return (
  <>
  {/* <div className="relative flex flex-col lg:flex-row max-[1074px]:gap-x-10 gap-x-2 xl:gap-x-20 mx-auto"> */}
  <div className="relative flex flex-col items-center justify-center pt-4 appearance-none font-rubik">
  <p className="pt-0 sm:pt-6 md:pt-16 font-bold text-3xl text-gray-800">Featured listings</p>
  <div className="relative flex flex-col lg:flex-row gap-x-2 xl:gap-x-20 mx-auto">
  {items.slice(-3)?.map((item) => (
    <div 
    onClick={() => handleOnClick(item.slug)} 
    key={item.id} className="cursor-pointer mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-british-green-1 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          {item.photos.length > 0 ? <img className="h-48 w-full object-cover object-center" src={item.photos[0]} alt="Product Image" />
          : 
          <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1599076311391-28adf17fade5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Product Image" />
           }
        <div className="p-4">
        <h2 className="mb-2 text-lg font-medium text-white ">{item.title}</h2>
        <h3 className="mb-2 text-md font-medium text-gray-300 ">{item.year}, {item.fuel}, {item.mileage}</h3>
        <p className="mb-2 text-base font-light text-white ">{item.body}</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-medium text-gray-200">€{item.price}</p>
        </div>
      </div>
    </div>
  ))}
  </div>
  </div>
  </>
  )
  }
}

// export default ListingsList