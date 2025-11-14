"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 5, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5), maxPage - 9);

  const numberedPageItems: JSX.Element[] = [];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchParamsState, setSearchParamsState] = useState(
    new URLSearchParams(Array.from(searchParams.entries())),
  );

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  // useEffect (() => {
  //   const currentHasPage = searchParamsState.get('&page=')

  //   if(currentHasPage) {
  //     if(currentHasPage?.length > 1) {
  //       current.delete('page=1')
  //       setSearchParamsState(searchParamsState)
  //     }
  //   }
  // }, [searchParamsState, current])

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", currentPage.toString());
    setSearchParamsState(updatedSearchParams);
  }, [currentPage, searchParams]);

  const handlePageClick = (page: any) => {
    searchParamsState.set("page", page);
    setSearchParamsState(searchParamsState);
    router.push(`listings?&${searchParamsState}`);
  };

  const handlePrevClick = () => {
    searchParamsState.set("page", `${currentPage - 1}`);
    setSearchParamsState(searchParamsState);
    router.push(`listings?&${searchParamsState}`);
  };

  const handleNextClick = () => {
    searchParamsState.set("page", `${currentPage + 1}`);
    setSearchParamsState(searchParamsState);
    router.push(`listings?&${searchParamsState}`);
  };

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <p
        key={page}
        onClick={() => handlePageClick(page)}
        className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
      >
        {page}
      </p>,
    );
  }

  return (
    <nav className="border-t max-w-lg mx-auto my-2 border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        {currentPage > 1 && (
          <p
            onClick={handlePrevClick}
            className="cursor-pointer border-t-2 border-transparent py-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            <ArrowSmallLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </p>
        )}
      </div>
      <div className="cursor-pointer pb-4 hidden md:-mt-px md:flex">
        {numberedPageItems}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        {currentPage !== maxPage && (
          <p
            onClick={handleNextClick}
            className="cursor-pointer border-t-2 border-transparent py-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            <ArrowSmallRightIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Next
          </p>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
