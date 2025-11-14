import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Option {
  id?: string;
  label: string;
  models?: string[];
  make?: string;
}

interface SelectMenuProps {
  options: Option[];
  dynamicId?: number;
  field?: string;
  error?: boolean;
  value: string;
  label?: string;
  onChange: (value: string) => void;
}

export const SelectMenuCustom: React.FC<SelectMenuProps> = ({
  options,
  dynamicId,
  field,
  label,
  value,
  onChange,
  error,
}) => {
  const [selected, setSelected] = useState(
    value || options[dynamicId! || 0]?.id,
  );

  const handleItemClick = (option: Option) => {
    setSelected(option.label);
    onChange(option.label);
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <label
              htmlFor={label}
              className="block text-sm font-medium text-gray-500 pb-2"
            >
              {label}
            </label>
            <Listbox.Button
              className={`bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-6 py-2 text-left cursor-default focus:outline-none focus:ring-british-green-4 focus:border-british-green-4 sm:text-sm 
                                        ${
                                          error
                                            ? "rounded-md ring-inset-2 ring-2 ring-red-400"
                                            : ""
                                        }`}
            >
              <span className="block truncate">
                {options.find((option) => option.id === selected)?.label ||
                  options.find((option) => option.id === selected)?.id}
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
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-3 pr-9 ${
                        active
                          ? "text-white bg-british-green-0"
                          : "text-gray-900"
                      }`
                    }
                    value={option.id}
                    onClick={() => handleItemClick(option)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? "text-white" : "text-british-green-0"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
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

export default SelectMenuCustom;
