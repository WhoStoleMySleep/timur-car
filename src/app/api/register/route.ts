import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, username, password, confirmPassword } = body;

    const schema = z.object({
      email: z.string().email({ message: "Неверный адрес электронной почты" }),
    });

    let errorMessage = "";
    let errorPassword = "";
    let errorEmail = "";
    let errorUsername = "";

    const isValid = schema.safeParse({ email });
    if (isValid.success == false) {
      errorEmail = "Неверный адрес электронной почты.";
    }

    if (!email || !username || !password || !confirmPassword) {
      errorMessage += "Отсутствуют требуемые учетные данные.";
      // return new NextResponse('Missing credentials', { status: 400})
    }

    if (password !== confirmPassword) {
      errorPassword += "Подтверждение пароля не совпадает.";
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      errorPassword += "Пароль должен быть не менее 8 символов.";
    }

    if (
      errorPassword ===
        "Подтверждение пароля не совпадает. Пароль должен быть не менее 8 символов.." ||
      errorPassword ===
        "The password has to be at least 8 characters.The password confirmation does not match. "
    ) {
      errorPassword = "";
      errorPassword =
        "Пароль должен быть не менее 8 символов. Подтверждение пароля не совпадает.";
    }

    const uniqueEmail = await prisma?.user.findUnique({
      where: {
        email: email
      }
    })

    if (uniqueEmail) {
      errorEmail = "Учётная запись с таким именем уже существует. Пожалуйста, войдите в систему.."
    }

    const uniqueUsername = await prisma?.user.findUnique({
      where: {
        username: username
      }
    })

    if (uniqueUsername) {
      errorUsername = "Имя пользователя уже занято. Выберите другое имя пользователя."
    }

    if (!username) {
      errorUsername += "Пожалуйста, введите имя пользователя.";
    }

    if (
      errorPassword.length > 0 ||
      errorMessage.length > 0 ||
      errorEmail.length > 0 ||
      errorUsername.length > 0
    ) {
      return await NextResponse.json(
        {
          error: errorMessage,
          data: {
            password: errorPassword,
            email: errorEmail,
            name: errorUsername,
          },
        },
        { status: 400 },
      );
    }

    if (body.password === body.confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma?.user.create({
        data: {
          email,
          username,
          hashedPassword,
          role: "USER",
        },
      });

      return NextResponse.json(user);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error;
  }
}
