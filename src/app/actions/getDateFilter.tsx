// import prisma from "@/app/libs/prismadb";
// import { subDays } from "date-fns";

// export const GetDateFilter = async (daysAgo: number) => {
//   const currentDate = new Date();
//   const twoWeeksAgo = await subDays(currentDate, 5 | daysAgo);

//   const twoWeeksAgo = currentDate.setDate(currentDate.getDate() - daysAgo)
//   const twoWeeksAgoString = new Date(twoWeeksAgo)

//   console.log('twotweeksstr', twoWeeksAgoString)

//   const date = await prisma.listing.findMany({
//     select: {
//       createdAt: true,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//     where: {
//       createdAt: {
//         lte: twoWeeksAgo
//       },
//     },
//   });

//   return date;
// };

// export default GetDateFilter;
