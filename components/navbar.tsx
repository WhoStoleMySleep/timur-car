"use client";

import { useSession, signOut } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import getUsername from "@/app/actions/getUsername";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import LoadingComponent from "@/app/loading";
import Image from "next/image";
import flatsixLogo from "../public/flatsixLogo.png";

interface NavBarProps {
  currentUser: User;
}

function classNames(...className: unknown[]) {
  return className.filter(Boolean).join(" ");
}

export const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
  const {
    // data: session
    status: status,
  } = useSession();
  // const sessionEmail = session?.user?.email as string

  const router = useRouter();

  // const user = currentUser

  const [sessionStatus, setSessionStatus] = useState(false);

  // const username = getUsername()

  const [isAdmin, setIsAdmin] = useState(false);

  const userRole = currentUser?.role;

  useEffect(() => {
    if (status === "authenticated") {
      setSessionStatus(true);
    }
    if (userRole === "ADMIN") {
      setIsAdmin(true);
      router.prefetch("/profile/userListings");
      router.prefetch("/profile/reports");
    } else {
      setIsAdmin(false);
      router.prefetch("/profile/listings");
      router.prefetch("/register");
      router.prefetch("/signin");
      router.prefetch("/");
    }
  }, [status, router, sessionStatus, userRole, isAdmin, currentUser]);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const navigation = [
    ...(sessionStatus
      ? []
      : [
          { name: "Зарегистрироваться", href: "/register", current: false },
          { name: "Войти", href: "/signin", current: false },
        ]),
    // ...(!sessionStatus ? [] : [
    // { name: 'Add a listing', href: '/listings/create', current: false, className: 'inline md:hidden' },
    // ])
  ];

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <Disclosure
          as="nav"
          className="bg-british-green-1 fixed md:static z-20 w-full"
        >
          {({ open }) => (
            <>
              <div className="z-10 relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="relative inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    {!sessionStatus && (
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-british-green-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                    <div className="flex-shrink-0 flex items-center">
                      {/* <p className="cursor-pointer block text-2xl font-semibold whitespace-nowrap dark:text-white" onClick={() => router.push('/')}>FlatSix</p> */}
                      <Image
                        src={flatsixLogo}
                        // unoptimized={true} priority
                        alt="Logo"
                        onClick={() => router.push("/")}
                        className="hidden lg:block h-6 w-auto cursor-pointer"
                      />
                      <Image
                        src={flatsixLogo}
                        // unoptimized={true} priority
                        alt="Logo"
                        onClick={() => router.push("/")}
                        className={`block lg:hidden h-6 w-auto cursor-pointer ${
                          !sessionStatus ? "pr-8" : ""
                        }`}
                      />
                    </div>
                    <div className="hidden sm:flex sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-british-green-1 text-white"
                                : "text-gray-100 hover:bg-british-green-1 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium",
                              sessionStatus ? "hidden" : ""
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    {sessionStatus && (
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="bg-british-green-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Открыть меню пользователя</span>
                            <UserCircleIcon
                              className="h-9 w-9 text-gray-100 cursor-pointer"
                              aria-hidden="true"
                            />
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/profile/listings"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Мои объявления
                                </a>
                              )}
                            </Menu.Item>
                            {isAdmin && (
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/profile/userListings"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700",
                                      !isAdmin ? "hidden" : ""
                                    )}
                                  >
                                    Объявления пользователей
                                  </a>
                                )}
                              </Menu.Item>
                            )}
                            {isAdmin && (
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/profile/reports"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Отчеты
                                  </a>
                                )}
                              </Menu.Item>
                            )}
                            {sessionStatus && (
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    onClick={handleLogout}
                                    href=""
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Выйти
                                  </a>
                                )}
                              </Menu.Item>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-british-green-0 hover:text-gray-100",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </Suspense>
    </>
  );
};

export default Navbar;
