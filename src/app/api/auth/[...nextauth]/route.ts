import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid or missing credentials.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          console.error('User not found or has no password set');
          throw new Error(
            "Адрес электронной почты не найден. Проверьте свою электронную почту или зарегистрируйте новую учётную запись.",
          );
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isPasswordCorrect) {
          console.error('Incorrect password for user:', user.email);
          throw new Error(
            "Неверный пароль. Убедитесь, что вы ввели правильный пароль для своей учётной записи.",
          );
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
