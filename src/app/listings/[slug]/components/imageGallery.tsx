import { Tab } from "@headlessui/react";
import { Listing } from "@prisma/client";
import Image from "next/image";

function classNames(...className: any) {
  return className.filter(Boolean).join(" ");
}

interface ImageGalleryProps {
  listing: Listing[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ listing }) => {
  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        <div className="mt-6 w-full max-w-2xl mx-auto block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {listing.map((item) =>
              item.photos.map((image) => (
                <Tab
                  key={image}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 ring-british-green-4 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <Image
                          src={image}
                          alt="Listing secondary photos"
                          height={0}
                          width={0}
                          sizes="100vw"
                          objectFit="cover"
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected
                            ? "ring-british-green-5"
                            : "ring-transparent",
                          "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))
            )}
          </Tab.List>
        </div>

        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
          {listing.map((item) =>
            item.photos.map((image) => (
              <Tab.Panel key={image}>
                <Image
                  src={image}
                  height={0}
                  width={0}
                  sizes="100vw"
                  objectFit="cover"
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                  alt="Listing main photo"
                />
              </Tab.Panel>
            ))
          )}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default ImageGallery;
