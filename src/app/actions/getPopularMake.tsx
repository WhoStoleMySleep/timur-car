import { prisma } from "../libs/prismadb";

export const GetPopularMake = async (date?: Date) => {
  const currentDate = new Date();

  const result = await prisma.listing.groupBy({
    by: ["make"],
    where: {
      createdAt: {
        gte: date ? date : currentDate,
      },
    },
    _count: {
      make: true,
    },
    orderBy: {
      _count: {
        make: "desc",
      },
    },
    take: 1,
  });

  const mostPopularMake = (await result[0]?.make) || "Unknown";
  return mostPopularMake;
};

export default GetPopularMake;
