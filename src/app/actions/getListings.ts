// import prismadb from '@/app/libs/prismadb'
import { prisma } from "../libs/prismadb";

const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return listings;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getListings;
