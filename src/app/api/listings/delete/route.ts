import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return new NextResponse("No slug found.", { status: 400 });
    }

    const listing = await prisma.listing.delete({
      where: {
        slug: slug,
      },
    });

    console.log("listing deleted:", listing);
    // console.log('nextresp:',NextResponse.json(listing))
    return NextResponse.json({ message: "Listing deleted", success: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error, the listing was not deleted", {
      status: 500,
    });
  }
}
