"use client";

import {
  signIn,
  // useSession
} from "next-auth/react";
// import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useState, FC, Suspense } from "react";
import { XCircleIcon, EyeIcon } from "@heroicons/react/20/solid";
import LoadingComponent from "@/app/signin/loading";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // const session = useSession()
  const router = useRouter();

  const resetState = () => {
    setError(""), setEmailError(""), setPasswordError("");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    resetState();
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('SignIn Error:', result.error);
        
        // Handle specific error messages
        if (result.error.includes('credentials') || 
            result.error.includes('Invalid') || 
            result.error.includes('не найден')) {
          setError("Неверный email или пароль. Пожалуйста, проверьте введённые данные.");
        } else if (result.error.includes('Email') || result.error.includes('email')) {
          setEmailError("Пожалуйста, введите корректный email");
        } else if (result.error.includes('password') || result.error.includes('пароль')) {
          setPasswordError("Неверный пароль. Пожалуйста, попробуйте снова.");
        } else {
          setError("Произошла ошибка при входе. Пожалуйста, попробуйте позже.");
        }
      } else if (result?.url) {
        // Successful login
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      setError("Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = () => {
    setIsLoading(true);
    signIn("credentials", {
      email: 'test@test.com',
      password: 'testpassword',
      redirect: true,
      callbackUrl: "/"
    })
  }

  return (
    <div className="pt-[64px] md:pt-0">
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <Suspense fallback={<LoadingComponent />}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {(emailError || passwordError || error) && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      There were errors with your submission
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul role="list" className="list-disc pl-5 space-y-1">
                        {error && <li>{error}</li>}
                        {emailError && <li>{emailError}</li>}
                        {passwordError && <li>{passwordError}</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Войди в свой аккаунт
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Адрес электронной почты
                  </label>
                </div>
                <div className="mt-2">
                  <div>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 appearance-none ${
                        emailError || error
                          ? "rounded-md ring-inset-2 ring-2 ring-red-400"
                          : ""
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-british-green-2 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Пароль
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className={`block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 appearance-none ${
                      passwordError || error
                        ? "rounded-md ring-inset-2 ring-2 ring-red-400"
                        : ""
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-british-green-2 sm:text-sm sm:leading-6`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center p-1"
                  >
                    <EyeIcon className="h-5 w-auto fill-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-y-6 justify-center items-center">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`${
                    isLoading ? "cursor-not-allowed opacity-80" : ""
                  } flex w-full justify-center rounded-md bg-british-green-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-british-green-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  Войти
                </button>
                <button
                  onClick={handleTestLogin}
                  disabled={isLoading}
                  className={`${
                    isLoading ? "cursor-not-allowed opacity-80" : ""
                  } flex justify-center rounded-md bg-orange-2 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-orange-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  Войти с тестовой учетной записью
                </button>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                Нет аккаунта?
                <a
                  className="cursor-pointer font-semibold leading-6 px-1 text-british-green-2 hover:british-green-0"
                  onClick={() => router.push("/register")}
                >
                  Зарегистрироваться
                </a>
              </p>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
