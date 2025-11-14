import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listing } from "@prisma/client";

function classNames(...className: any) {
  return className.filter(Boolean).join(" ");
}

const Placeholders = [
  {
    make: "Бренд...",
    model: "Модель...",
    year: "Год...",
    fuel: "Топливо...",
    transmission: "Трансмиссия...",
    price: "Цена...",
  },
];

interface SelectMenuProps {
  data?: Listing[];
  items?: (Listing | string)[];
  field: keyof Listing;
  value: string;
  onChange: (value: string) => void;
  onClick: (value: string) => void;
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  data,
  items,
  field,
  value,
  onChange,
  onClick,
}) => {
  const [selected, setSelected] = useState(
    (value as any) || Placeholders?.[0] || data?.[0].id,
  );
  // const [itemsData, setItemsData] = useState(data?.[0] || undefined)

  const getFieldContent = (item: Listing, field: keyof Listing) => {
    const fieldValue = item?.[field];

    if (fieldValue instanceof Date) {
      return fieldValue.toLocaleDateString();
    }

    return fieldValue;
  };

  const handleItemClick = (item: Listing | string) => {
    const selectedValue =
      typeof item === "string" ? item : getFieldContent(item as Listing, field);
    setSelected(selectedValue);
    onChange(selectedValue as string);
    onClick(selectedValue as string);
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-british-green-4 focus:border-british-green-4 sm:text-sm">
              <span className="block truncate">
                {getFieldContent(selected, field)}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data?.map((item) => (
                  <Listbox.Option
                    key={item?.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-british-green-0"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9",
                      )
                    }
                    value={item}
                    onClick={() => handleItemClick(item)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {getFieldContent(item, field as keyof Listing)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-british-green-0",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenu;
