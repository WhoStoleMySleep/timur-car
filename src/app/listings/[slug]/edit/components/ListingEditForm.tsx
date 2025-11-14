"use client";

import {
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import GetOptions from "@/app/actions/getOptions";
import { XCircleIcon, ArrowUpOnSquareIcon } from "@heroicons/react/20/solid";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { Listing } from "@prisma/client";
import SelectMenuCustom from "../../../../../../components/selectMenuCustom";
import InputField from "../../../../../../components/inputField";
import getListingBySlug from "@/app/actions/getListingBySlug";
import { useRouter } from "next/navigation";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";

import {
  arrayMove,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import AlertSuccess from "../../../../../../components/alertSuccess";

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

interface EditFormProps {
  initialItems: Listing[];
}

export const ListingEditForm: React.FC<EditFormProps> = ({ initialItems }) => {
  const [isMounted, setIsMounted] = useState(false);

  const [items, setItems] = useState(initialItems);
  const item = initialItems[0];

  const options = GetOptions();

  const router = useRouter();

  // const [itemColor, setItemColors] = useState('')

  // const itemColors = () => {
  //     items.map((item) => setItemColors(item.color))
  // }

  const carMakesData = options.carMakes;
  const carModelsData = options.carModels;
  const transmissionData = options.transmissionType;
  const fuelData = options.fuelType;
  const yearsData = options.yearsMap;
  const categoryData = options.categoryType;
  const numDoorsData = options.numDoors;
  const conditionData = options.condition;
  const colorsData = options.colors;

  // function getColorIdByLabel(itemColor: string) {
  //   const colorMatch = colorsData.find((color) => color.label === itemColor);
  //   return colorMatch ? colorMatch.id : ''
  // }

  // const [make, setMake] = useState(carMakesData[0].id || '');

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  const [coupe_type, setCoupe_type] = useState("");
  const [number_doors, setNumber_doors] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [power, setPower] = useState("");
  const [price, setPrice] = useState("");
  const [variant, setVariant] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<any[]>([]);

  const [modelIdState, setModelIdState] = useState<number>();

  // const [filteredCarModels, setFilteredCarModels] = useState<Option[]>([]);
  const [filteredCarModels, setFilteredCarModels] =
    useState<Option[]>(carModelsData);
  const [filteredYears, setFilteredYears] = useState<OptionsProps[]>(yearsData);

  const [inputFieldsError, setInputFieldsError] = useState("");
  const [selectMenusError, setSelectMenusError] = useState("");
  const [titleDescriptionError, setTitleDescriptionError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const getIdByLabel = (optionsData: any, prop: string) => {
    const labelMatch = optionsData.find(
      (field: any) => field.label === prop.toString(),
    );
    return labelMatch ? +labelMatch.id : 0;
  };

  useEffect(() => {
    if (isMounted) {
      if (initialItems && initialItems.length > 0) {
        const item = initialItems[0];
        setModel(item.model);
        setMake(item.make);
        setTransmission(item.transmission);
        setFuel(item.fuel);
        setYear(item.year);
        setCoupe_type(item.coupe_type);
        setNumber_doors(item.number_doors);
        setCondition(item.condition);
        setColor(item.color);
        setMileage(item.mileage);
        setPower(item.power);
        setPrice(`${item.price}`);
        setVariant(item.variant);
        setTitle(item.title);
        setDescription(item.body);
        setPhotos([...item.photos]);
      }
    }
  }, [initialItems, isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (make) {
        const filteredModels = carModelsData.filter(
          (item) => item.make === make,
        );
        setFilteredCarModels(filteredModels);
      }
    }
  }, [make, carModelsData, isMounted]);

  const makeId = getIdByLabel(carMakesData, item.make);
  const modelId = getIdByLabel(filteredCarModels, item.model);
  const transmissionId = getIdByLabel(transmissionData, item.transmission);
  const fuelId = getIdByLabel(fuelData, item.fuel);
  const yearId = getIdByLabel(yearsData, item.year);
  const coupeId = getIdByLabel(categoryData, item.coupe_type);
  const numDoorsId = getIdByLabel(numDoorsData, item.number_doors);
  const conditionId = getIdByLabel(conditionData, item.condition);
  const colorId = getIdByLabel(colorsData, item.color);

  const handleMakeChange = (value: string) => {
    if (value === "Make..") {
      setMake(carMakesData[0].id);
      const filteredModels = carModelsData.filter(
        (item) => item.make === value,
      );
      setFilteredCarModels(filteredModels);
    } else {
      setMake(value);
    }
  };

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

  const slug = item.slug;

  const handleSubmit = useCallback(async () => {
    console.log("photos", photos);
    setIsLoading(true);
    setShowSuccess(false)
    resetState();
    await axios
      .post("/api/listings/edit", {
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
        slug: slug,
        variant: `${variant}`,
        color: `${color}`,
        description: `${description}`,
        photos: photos,
      })
      .then((callback) => {
        console.log(callback);
        if (callback.data.ok) {
          console.log("created", callback?.data.ok);
        } else if (callback.data.message) {
          console.log("callback.data.message:", callback.data.message);
        }
      })
      .catch((callback) => {
        const { data } = callback.response.data;
        console.log(callback);
        setInputFieldsError(data.inputField);
        setSelectMenusError(data.selectMenu);
        setTitleDescriptionError(data.titleDescription);
      })
      .finally(() => {
        // router.push(`/listings/${slug}`)
        setShowSuccess(true);
        setIsLoading(false);
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
    slug,
    variant,
  ]);

  const [photosData, setPhotosData] = useState(photos);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPhotos((photos) => {
        const oldIndex = photos.indexOf(active.id);
        const newIndex = photos.indexOf(over.id);

        return arrayMove(photos, oldIndex, newIndex);
      });
    }
  }

  const [showSuccess, setShowSuccess] = useState(false);

  //fixes hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="pt-[64px] md:pt-0 px-8 md:px-0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute sm:mx-auto sm:w-full sm:max-w-sm mt-16">
            {(selectMenusError ||
              inputFieldsError ||
              titleDescriptionError) && (
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
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mx-auto sm:justify-end sticky top-0 z-10">
            {showSuccess && (
              <div className="absolute top-0 right-0 p-10 pt-20 sm:pt-10 z-10">
                <AlertSuccess field={"Listing successfully edited!"}/>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center mx-auto max-w-4xl mt-20 mb-16">
            <p className="mb-10 font-rubik place-self-center text-4xl font-medium">
              Edit your listing
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 px-8 md:grid-cols-2 lg:grid-cols-3 gap-16">
              <SelectMenuCustom
                options={carMakesData}
                dynamicId={makeId}
                value={make}
                label="Make"
                onChange={handleMakeChange}
                error={make === "0" || make === "" ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={filteredCarModels}
                dynamicId={modelId - 1} // -1 due to placeholder
                value={model}
                label="Model"
                onChange={handleModelChange}
                error={
                  model === "0" || model === "" ? !!selectMenusError : false
                }
              />
              <InputField
                label="Variant"
                value={variant}
                placeholder="Variant..(M3, GTI)"
                onChange={handleVariantChange}
              />
              <SelectMenuCustom
                options={transmissionData}
                dynamicId={transmissionId}
                value={transmission}
                label="Transmission"
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
                dynamicId={fuelId}
                value={fuel}
                label="Fuel"
                onChange={handleFuelChange}
                error={fuel === "0" || fuel === "" ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={filteredYears}
                dynamicId={yearId}
                value={year}
                label="Year"
                onChange={handleYearChange}
                error={year === "0" || year === "" ? !!selectMenusError : false}
              />
              <SelectMenuCustom
                options={categoryData}
                dynamicId={coupeId}
                value={coupe_type}
                label="Category"
                onChange={handleCategoryChange}
                error={
                  coupe_type === "0" || coupe_type === ""
                    ? !!selectMenusError
                    : false
                }
              />
              <SelectMenuCustom
                options={numDoorsData}
                dynamicId={numDoorsId}
                value={number_doors}
                label="Number of doors"
                onChange={handleDoorsChange}
                error={
                  number_doors === "0" || number_doors === ""
                    ? !!selectMenusError
                    : false
                }
              />
              <SelectMenuCustom
                options={conditionData}
                dynamicId={conditionId}
                value={condition}
                label="Condition"
                onChange={handleConditionChange}
                error={
                  condition === "0" || condition === ""
                    ? !!selectMenusError
                    : false
                }
              />
              <SelectMenuCustom
                options={colorsData}
                dynamicId={colorId}
                value={color}
                label="Color"
                onChange={handleColorChange}
                error={
                  color === "0" || color === "" ? !!selectMenusError : false
                }
              />
              <InputField
                label="Mileage"
                type="number"
                value={mileage}
                placeholder="Mileage.."
                onChange={handleMileageChange}
                error={mileage === "" ? !!inputFieldsError : false}
              />
              <InputField
                label="Power"
                type="number"
                value={power}
                placeholder="Power.."
                onChange={handlePowerChange}
                error={power === "" ? !!inputFieldsError : false}
              />
              <InputField
                label="Price"
                type="number"
                value={price}
                placeholder="Price.."
                onChange={handlePriceChange}
                error={price === "" ? !!inputFieldsError : false}
              />
              <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-8">
                <InputField
                  label="Title"
                  type="text"
                  value={title}
                  placeholder="Listing title.."
                  onChange={handleTitleChange}
                  error={title === "" ? !!inputFieldsError : false}
                />
                <InputField
                  label="Description"
                  type="text"
                  value={description}
                  placeholder="Description.."
                  onChange={handleDescriptionChange}
                  makeBigger
                  error={description === "" ? !!inputFieldsError : false}
                />
                <div className="">
                  <SortableContext
                    items={photos}
                    strategy={horizontalListSortingStrategy}
                  >
                    <div className="flex flex-wrap gap-8 bg-slate-100 px-4 py-6 rounded-md">
                      {photos.map((photo) => (
                        <SortableItem key={photo.id} id={photo} />
                      ))}
                    </div>
                  </SortableContext>
                </div>
                <div className="bg-sky-200 mt-[21rem] pl-2 pb-4 md:pb-0 rounded-xl mx-10 sm:mx-24 md:mx-64">
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
        </DndContext>
      </div>
    </>
  );
};

export default ListingEditForm;
