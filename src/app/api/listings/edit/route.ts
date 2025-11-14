import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
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
      variant,
      photos,
      slug,
    } = body;

    const currentUser = await getCurrentUser();

    let inputFieldsError = "";
    let selectMenusError = "";
    let titleDescriptionError = "";

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Please sign in to create a new listing.", {
        status: 400,
      });
    }

    if (!title) {
      titleDescriptionError += "Please provide a title for your listing.";
    }

    if (!body) {
      titleDescriptionError += "Please provide a description for your listing.";
    }

    if (
      !make ||
      !model ||
      !transmission ||
      !fuel ||
      !year ||
      !coupe_type ||
      !number_doors ||
      !condition ||
      !color
    ) {
      selectMenusError += "Please fill out all required fields.";
    }

    if (!mileage) {
      inputFieldsError += "Please enter the mileage of the vehicle.";
    }

    if (!power) {
      inputFieldsError += "Please enter the power of the vehicle.";
    }

    if (!price) {
      inputFieldsError += "Please enter the price of the vehicle.";
      // return new NextResponse('Please enter the price of the vehicle.', {status: 400})
      // throw new Error('Please enter the price of the vehicle.')
    }

    // check if two or more of the errors are true
    const dotCount = (value: any) => {
      return value.split(".").length - 1;
    };

    if (dotCount(titleDescriptionError) >= 2) {
      titleDescriptionError = "";
      titleDescriptionError =
        "Please provide a title and description for your listing.";
    }

    if (dotCount(inputFieldsError) >= 2) {
      inputFieldsError = "";
      inputFieldsError =
        "Please enter the mileage, power, and price of the vehicle.";
    }

    if (
      inputFieldsError.trim().length > 0 ||
      selectMenusError.trim().length > 0 ||
      titleDescriptionError.trim().length > 0
    ) {
      return await NextResponse.json(
        {
          data: {
            inputField: inputFieldsError,
            selectMenu: selectMenusError,
            titleDescription: titleDescriptionError,
          },
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: currentUser.email,
      },
    });

    const listing = await prisma.listing.update({
      where: {
        slug: slug,
      },
      data: {
        title: title,
        description: "",
        make: make,
        model: model,
        year: year,
        coupe_type: coupe_type,
        number_doors: number_doors,
        condition: condition,
        price: price,
        fuel: fuel,
        transmission: transmission,
        mileage: mileage,
        power: power,
        color: color,
        slug: slug,
        variant: variant,
        body: description,
        photos: photos,
      },
    });

    console.log("listing updated:", listing);
    // console.log('nextresp:',NextResponse.json(listing))
    return NextResponse.json(listing);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}
