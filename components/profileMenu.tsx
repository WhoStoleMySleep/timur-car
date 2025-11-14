import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function classNames(...className: any) {
  return className.filter(Boolean).join(" ");
}

interface ProfileMenuProps {
  currentUser: User;
  username?: string;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const username = currentUser?.username;

  const [isAdmin, setIsAdmin] = useState(false);

  const userRole = currentUser?.role;

  useEffect(() => {
    if (userRole === "ADMIN") {
      setIsAdmin(true);
      router.prefetch("/profile/userListings");
      router.prefetch("/profile/reports");
    } else {
      setIsAdmin(false);
      router.prefetch("/profile/listings");
    }
  }, [router, userRole]);

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const handleMyListingsClick = () => {
    router.push("/profile/listings");
  };

  const handleListingsClick = () => {
    router.push("/profile/userListings");
  };

  const handleReportsClick = () => {
    router.push("/profile/reports");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <UserCircleIcon
            className="h-9 w-9 text-gray-300 cursor-pointer"
            aria-hidden="true"
          />
        </Menu.Button>
        {/* <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button> */}
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={handleMyListingsClick}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer",
                  )}
                >
                  Logged in as {username}
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={handleMyListingsClick}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer",
                  )}
                >
                  My listings
                </a>
              )}
            </Menu.Item>
          </div>
          {isAdmin && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={handleListingsClick}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm cursor-pointer",
                    )}
                  >
                    User listings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={handleReportsClick}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm cursor-pointer",
                    )}
                  >
                    Reports
                  </a>
                )}
              </Menu.Item>
            </div>
          )}
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer",
                  )}
                >
                  Log out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
