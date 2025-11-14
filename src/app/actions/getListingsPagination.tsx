import { prisma } from "../libs/prismadb";

export const getListingsPagination = async (
  currentPage: number,
  pageSize: number,
) => {
  const totalCount = await prisma?.listing.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : 0),
    take: pageSize,
  });

  return totalCount;
};

export default getListingsPagination;
