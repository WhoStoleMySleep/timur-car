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

interface PriceRangeOption {
  price: string;
  id: string;
}

const priceRange: PriceRangeOption[] = [
  {
    price: `0-5000`,
    id: "1",
  },
  {
    price: "5001-10000",
    id: "2",
  },
  {
    price: "10001-20000",
    id: "3",
  },
  {
    price: "20001-50000",
    id: "4",
  },
  {
    price: "50001+",
    id: "5",
  },
];

interface SelectMenuProps {
  data?: PriceRangeOption[];
  field: keyof PriceRangeOption;
  value: string;
  onChange: (value: string) => void;
  onClick: (value: string) => void;
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  data,
  field,
  value,
  onChange,
  onClick,
}) => {
  const [selected, setSelected] = useState((value as any) || Placeholders?.[0]);
  const [itemsData, setItemsData] = useState(data?.[0] || undefined);

  // const getFieldContent = (item: PriceRangeOption, field: keyof Listing) => {
  //   const fieldValue = item?.[field];

  //   if (fieldValue instanceof Date) {
  //     return fieldValue.toLocaleDateString();
  //   }

  //   return fieldValue;
  // };

  const handleItemClick = (item: Listing | string) => {
    const selectedValue = typeof item === "string";
    setSelected(selectedValue);
    // onChange(selectedValue);
    // onClick(selectedValue);
    console.log("selectedValue", selectedValue);
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Assigned to
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected?.[field]}</span>
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
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9",
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {typeof item[field] === "string" ? item[field] : null}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
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
