"use client";

import {
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import GetOptions from "@/app/actions/getOptions";
import { XCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Listing } from "@prisma/client";
import SelectMenuCustom from "../../../../../../components/selectMenuCustom";
import InputField from "../../../../../../components/inputField";
import getListingBySlug from "@/app/actions/getListingBySlug";
import { useRouter } from "next/navigation";


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
  const [photos] = useState<string[]>([]);

  const [modelIdState, setModelIdState] = useState<number>();

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

  const resetState = () => {
    setInputFieldsError("");
    setSelectMenusError("");
    setTitleDescriptionError("");
  };

  const slug = item.slug;

  const handleSubmit = useCallback(async () => {
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
    slug,
    variant,
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="pt-[64px] md:pt-0 px-8 md:px-0">
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
                  При отправке формы возникли ошибки
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
      <div className="flex flex-col justify-center mx-auto max-w-4xl mt-20 mb-16">
        <p className="mb-10 font-rubik place-self-center text-4xl font-medium">
          Редактировать объявление
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <SelectMenuCustom
            options={carMakesData}
            dynamicId="make"
            value={make}
            label="Марка"
            onChange={handleMakeChange}
            error={make === "0" || make === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={filteredCarModels}
            dynamicId="model"
            value={model}
            label="Модель"
            onChange={handleModelChange}
            error={model === "0" || model === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={transmissionData}
            dynamicId="transmission"
            value={transmission}
            label="Коробка передач"
            onChange={handleTransmissionChange}
            error={transmission === "0" || transmission === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={fuelData}
            dynamicId="fuel"
            value={fuel}
            label="Топливо"
            onChange={handleFuelChange}
            error={fuel === "0" || fuel === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={yearsData}
            dynamicId="year"
            value={year}
            label="Год выпуска"
            onChange={handleYearChange}
            error={year === "0" || year === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={categoryData}
            dynamicId="category"
            value={coupe_type}
            label="Категория"
            onChange={handleCategoryChange}
            error={coupe_type === "0" || coupe_type === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={numDoorsData}
            dynamicId="doors"
            value={number_doors}
            label="Количество дверей"
            onChange={handleDoorsChange}
            error={number_doors === "0" || number_doors === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={conditionData}
            dynamicId="condition"
            value={condition}
            label="Состояние"
            onChange={handleConditionChange}
            error={condition === "0" || condition === "" ? !!selectMenusError : false}
          />
          <SelectMenuCustom
            options={colorsData}
            dynamicId="color"
            value={color}
            label="Цвет"
            onChange={handleColorChange}
            error={color === "0" || color === "" ? !!selectMenusError : false}
          />
          <InputField
            label="Пробег"
            type="number"
            value={mileage}
            placeholder="Пробег.."
            onChange={handleMileageChange}
            error={mileage === "" ? !!inputFieldsError : false}
          />
          <InputField
            label="Мощность (л.с.)"
            type="number"
            value={power}
            placeholder="Мощность.."
            onChange={handlePowerChange}
            error={power === "" ? !!inputFieldsError : false}
          />
          <InputField
            label="Цена"
            type="number"
            value={price}
            placeholder="Цена.."
            onChange={handlePriceChange}
            error={price === "" ? !!inputFieldsError : false}
          />
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-8">
            <InputField
              label="Заголовок"
              type="text"
              value={title}
              placeholder="Название объявления.."
              onChange={handleTitleChange}
              error={title === "" ? !!inputFieldsError : false}
            />
            <InputField
              label="Описание"
              type="text"
              value={description}
              placeholder="Описание.."
              onChange={handleDescriptionChange}
              makeBigger
              error={description === "" ? !!inputFieldsError : false}
            />
            <button
              onClick={handleSubmit}
              type="button"
              className={`w-full text-white flex items-center justify-center bg-british-green-0 hover:bg-british-green-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 md:mr-2 dark:focus:ring-blue-800 ${
                isLoading ? "cursor-not-allowed opacity-80" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Обновление..." : "Обновить"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingEditForm;
