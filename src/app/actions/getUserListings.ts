// import prismadb from '@/app/libs/prismadb'
import { prisma } from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUserListings = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        userId: {
          equals: currentUser.id,
        },
      },
    });

    return listings;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getUserListings;
