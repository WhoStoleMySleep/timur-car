"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import LoadingComponent from "./loading";

// export const Error = ({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string }
//   reset: () => void
// }) => {
//   useEffect(() => {
//     console.error(error)
//   }, [error])

export const Error = () => {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <div className="min-h-screen min-w-full flex items-center justify-center">
          <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto">
              <main className="sm:flex">
                <p className="text-4xl font-bold text-british-green-0 sm:text-5xl font-rubik">
                  404
                </p>
                <div className="sm:ml-6">
                  <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl font-rubik">
                      Page not found
                    </h1>
                    <p className="mt-1 text-base text-gray-500 font-rubik">
                      Please check the URL in the address bar and try again.
                    </p>
                  </div>
                  <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                    <a
                      href="/"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-british-green-0 hover:bg-british-green-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-british-green-2"
                    >
                      Go back home
                    </a>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Error;
