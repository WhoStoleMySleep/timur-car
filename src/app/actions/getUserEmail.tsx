"use server";

// import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
// import { getUserEmailData } from "./_actions";
import { prisma } from "../libs/prismadb";

export const getUserListingsAdmin = async (emailData: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: emailData,
    },
    select: {
      id: true,
    },
  });

  const userId = user?.id;

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });

    console.log("test");

    console.log("listings", listings);

    return listings;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getUserListingsAdmin;

// // import prisma from "@/app/libs/prismadb";
// import getCurrentUser from './getCurrentUser';
// import { getUserEmailData } from "./_actions";
// import { PrismaClient, User } from "@prisma/client";

// const prisma = new PrismaClient()

// export const getUserListingsAdmin = async (emailData: any) => {

//     const emailDataTest = getUserEmailData(emailData)

//     const user = await prisma.user.findUnique({
//         where: {
//             email: emailData
//         },
//         select: {
//           id: true
//         }
//       })

//     const userId = user?.id

//     try {
//         const listings = await prisma.listing.findMany({
//             where: {
//                 userId: {
//                     equals: userId
//                 }
//             },
//         });

//         console.log('test')

//         console.log('listings', listings)

//         return listings;
//     } catch (error: any) {
//         console.log(error)
//         return [];
//     }
// }

// export default getUserListingsAdmin
