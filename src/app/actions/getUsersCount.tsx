import { prisma } from "../libs/prismadb";

export const getUsersCount = async () => {
  const totalCount = await prisma.user.count();

  return totalCount;
};

export default getUsersCount;
