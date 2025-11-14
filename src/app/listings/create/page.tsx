"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import SelectMenuCustom from "../../../../components/selectMenuCustom";
import SelectMenu from "../../../../components/selectMenu";
import InputField from "../../../../components/inputField";
import GetOptions from "@/app/actions/getOptions";
import { XCircleIcon, ArrowUpOnSquareIcon } from "@heroicons/react/20/solid";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { LoadingComponent } from "@/app/loading";

interface ListingCreateProps {
  options: Listing[];
}

interface OptionsProps {
  label: string;
  id: string;
}

interface Option {
  id?: string;
  label: string;
  models?: string[];
  make?: string;
}

export default function Create() {
  const [isMounted, setIsMounted] = useState(false);

  const options = GetOptions();

  const router = useRouter();

  const carMakesData = options.carMakes;
  const carModelsData = options.carModels;
  const transmissionData = options.transmissionType;
  const fuelData = options.fuelType;
  const yearsData = options.yearsMap;
  const categoryData = options.categoryType;
  const numDoorsData = options.numDoors;
  const conditionData = options.condition;
  const colorsData = options.colors;

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  const [coupe_type, setCoupe_type] = useState("");
  const [number_doors, setNumber_doors] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");

  // const [make, setMake] = useState(carMakesData[0].id || '');

  const [mileage, setMileage] = useState("");
  const [power, setPower] = useState("");
  const [price, setPrice] = useState("");
  const [variant, setVariant] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<any[]>([]);

  const [filteredCarModels, setFilteredCarModels] = useState<Option[]>([
    carModelsData[0],
  ]);

  const [inputFieldsError, setInputFieldsError] = useState("");
  const [selectMenusError, setSelectMenusError] = useState("");
  const [titleDescriptionError, setTitleDescriptionError] = useState("");
  const [photosError, setPhotosError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleMakeChange = (value: string) => {
    if (value == "Make..") {
      setMake(carMakesData[0].id);
      setFilteredCarModels([carModelsData[0]]);
    } else {
      setMake(value);
    }
  };

  useEffect(() => {
    const filteredModels = carModelsData.filter((model) => model.make === make);
    setFilteredCarModels(filteredModels as any);
  }, [carModelsData, make]);

  const handleModelChange = (value: string) => {
    setModel(value);
    console.log("model", value);
  };

  const handleTransmissionChange = (value: string) => {
    if (value == "Transmission..") {
      setTransmission(transmissionData[0].id);
    } else {
      setTransmission(value);
      console.log("trans", value);
    }
  };

  const handleFuelChange = (value: string) => {
    if (value == "Fuel..") {
      setFuel(fuelData[0].id);
    } else {
      setFuel(value);
      console.log("fuel", value);
    }
  };

  const handleYearChange = (value: string) => {
    if (value == "Year..") {
      setYear(yearsData[0].id);
    } else {
      setYear(value);
      console.log("year", value);
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value == "Category..") {
      setCoupe_type(categoryData[0].id);
    } else {
      setCoupe_type(value);
      console.log("category", value);
    }
  };

  const handleDoorsChange = (value: string) => {
    if (value == "Number of doors..") {
      setNumber_doors(numDoorsData[0].id);
    } else {
      setNumber_doors(value);
      console.log("doors", value);
    }
  };

  const handleConditionChange = (value: string) => {
    if (value == "Condition..") {
      setCondition(conditionData[0].id);
    } else {
      setCondition(value);
      console.log("condition", value);
    }
  };

  const handleColorChange = (value: string) => {
    if (value == "Color..") {
      setColor(colorsData[0].id);
    } else {
      setColor(value);
      console.log("color", value);
    }
  };

  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(event.target.value);
    console.log("miles", mileage);
  };

  const handlePowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPower(event.target.value);
    console.log("power", power);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
    console.log("price", price);
  };

  const handleVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariant(event.target.value);
    console.log("variant", variant);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log("title", title);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
    console.log("desc", event.target.value);
  };

  const handleUpload = (result: any) => {
    const check = photos.includes(result);
    if (check) {
      const id = photos.indexOf(result);
      const newArr = photos;
      newArr.splice(id, 1);
      setPhotos([...newArr]);
    } else {
      photos.push(result.info.secure_url);
      setPhotos([...photos]);
    }
  };

  const resetState = () => {
    setInputFieldsError("");
    setSelectMenusError("");
    setTitleDescriptionError("");
  };

  const [slugData, setSlugData] = useState("");

  const handleRedirect = () => {
    if (slugData.length > 0) {
      router.push(`/listings/${slugData}`);
    }
  };

  const handleSubmit = useCallback(async () => {
    console.log("photos", photos);
    setIsLoading(true);
    resetState();

    await axios
      .post("/api/listings", {
        title: `${title}`,
        body: ``,
        make: `${make}`,
        model: `${model}`,
        year: `${year}`,
        coupe_type: `${coupe_type}`,
        number_doors: `${number_doors}`,
        condition: `${condition}`,
        price: +price,
        fuel: `${fuel}`,
        transmission: `${transmission}`,
        mileage: `${mileage}`,
        power: `${power}`,
        slug: "",
        variant: `${variant}`,
        color: `${color}`,
        description: `${description}`,
        // photos: photosUrls as string[],
        photos: photos,
      })
      .then((callback) => {
        const { data } = callback.data;
        console.log("callback:", callback);
        console.log("callback.data:", callback.data);
        console.log("callback.data.slug:", callback.data.slug);
        router.push(`/listings/${callback.data.slug}`);
        const slugTest = callback.data.slug;
        setSlugData(slugTest);
        router.push(`/listings/${slugTest}`);
        router.push(`/listings/${callback.data.slug}`);
        handleRedirect();
      })
      .catch((callback) => {
        if (callback.response) {
          const { data } = callback.response?.data || {};
          // resetState();
          console.log(callback);
          setInputFieldsError(data?.inputField);
          setSelectMenusError(data?.selectMenu);
          setTitleDescriptionError(data?.titleDescription);
          setPhotosError(data?.photos);
          window.scrollTo(0, 80);
        } else {
          console.log(callback);
        }
      })
      .finally(() => {
        if (slugData.length > 1) {
          router.push(`/listings/${slugData}`);
        }
        setIsLoading(false);
        // router.push(`/listings/${slugData}`)
      });
  }, [
    title,
    description,
    make,
    model,
    year,
    coupe_type,
    number_doors,
    condition,
    price,
    fuel,
    transmission,
    mileage,
    power,
    color,
    photos,
    handleRedirect,
    router,
    slugData,
    variant,
  ]);

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="pt-[64px] md:pt-0 px-8 md:px-0">
        <Suspense fallback={<LoadingComponent />}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-16">
            {(selectMenusError ||
              inputFieldsError ||
              titleDescriptionError ||
              photosError) && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      There were errors with your submission
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul role="list" className="list-disc pl-5 space-y-1">
                        {selectMenusError && <li>{selectMenusError}</li>}
                        {titleDescriptionError && (
                          <li>{titleDescriptionError}</li>
                        )}
                        {inputFieldsError && <li>{inputFieldsError}</li>}
                        {photosError && <li>{photosError}</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center mx-auto max-w-4xl mt-20 mb-16">
            <p className="mb-10 font-rubik place-self-center text-4xl font-medium">
              Create a new listing
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16">
              <SelectMenuCustom
                options={carMakesData}
                value={make}
                onChange={handleMakeChange}
                error={make === "0" || make === "" ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={filteredCarModels}
                value={model}
                onChange={handleModelChange}
                error={
                  model === "0" || model === "" ? !!selectMenusError : false
                }
              />
              <InputField
                value={variant}
                placeholder="Variant..(M3, GTI)"
                onChange={handleVariantChange}
              />
              <SelectMenuCustom
                options={transmissionData}
                value={transmission}
                onChange={handleTransmissionChange}
                error={
                  transmission === "0" || transmission === ""
                    ? !!selectMenusError
                    : false
                }
                // error={isValidOption(transmission, transmissionData, '0') ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={fuelData}
                value={fuel}
                onChange={handleFuelChange}
                error={fuel === "0" || fuel === "" ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={yearsData}
                value={year}
                onChange={handleYearChange}
                error={year === "0" || year === "" ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={categoryData}
                value={coupe_type}
                onChange={handleCategoryChange}
                error={
                  coupe_type === "0" || coupe_type === ""
                    ? !!selectMenusError
                    : false
                }
              />
              <SelectMenuCustom
                options={numDoorsData}
                value={number_doors}
                onChange={handleDoorsChange}
                error={
                  number_doors === "0" || number_doors === ""
                    ? !!selectMenusError
                    : false
                }
              />
              <SelectMenuCustom
                options={conditionData}
                value={condition}
                onChange={handleConditionChange}
                error={
                  condition === "0" || condition === ""
                    ? !!selectMenusError
                    : false
                }
              />
              <SelectMenuCustom
                options={colorsData}
                value={color}
                onChange={handleColorChange}
                error={
                  color === "0" || color === "" ? !!selectMenusError : false
                }
              />
              <InputField
                type="number"
                value={mileage}
                placeholder="Mileage.."
                onChange={handleMileageChange}
                error={mileage === "" ? !!inputFieldsError : false}
              />
              <InputField
                type="number"
                value={power}
                placeholder="Power.."
                onChange={handlePowerChange}
                error={power === "" ? !!inputFieldsError : false}
              />
              <InputField
                type="number"
                value={price}
                placeholder="Price.."
                onChange={handlePriceChange}
                error={price === "" ? !!inputFieldsError : false}
              />
              <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-8">
                <InputField
                  type="text"
                  value={title}
                  placeholder="Listing title.."
                  onChange={handleTitleChange}
                  error={title === "" ? !!inputFieldsError : false}
                />
                <InputField
                  type="text"
                  value={description}
                  placeholder="Description.."
                  onChange={handleDescriptionChange}
                  makeBigger
                  error={description === "" ? !!inputFieldsError : false}
                />
                <div className="bg-sky-200 mt-[21rem] pl-2 pb-4 md:pb-0 rounded-xl mx-24 md:mx-64">
                  <div className="flex w-full h-full flex-col items-center justify-center gap-y-6">
                    <p className="pt-2 font-rubik font-normal text-xl text-blue-800">
                      Upload Photos
                    </p>
                    <CldUploadButton
                      options={{ maxFiles: 6 }}
                      onUpload={handleUpload}
                      uploadPreset="yghyzh2p"
                    >
                      <button
                        type="button"
                        className=" text-white flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 mb-4 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <ArrowUpOnSquareIcon
                          className="h-8 w-8 mr-2 mb-1"
                          aria-hidden="true"
                        />
                        Upload
                      </button>
                    </CldUploadButton>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className={`w-full text-white flex items-center justify-center bg-british-green-0 hover:bg-british-green-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 md:mr-2 dark:focus:ring-blue-800 ${
                    isLoading ? "cursor-not-allowed opacity-80" : ""
                  }`}
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}
