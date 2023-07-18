import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { register, signIn } from "./api/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

type Phase = "signin" | "signup";

interface Data {
  email: string;
  password: string;
  name?: string;
}

export default function Login() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("signin");
  const [name, setName] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [phoneNumber, setPhoneNumber] = useState<string | "">("");
  const [error, setError] = useState<string | "">("");

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {}, []);

  const attemptLogin = async (email: string, password: string) => {
    const data = await signIn(email, password);
    setUser(data);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("accessToken", data.accessToken);
      window.localStorage.setItem("name", data.name);
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("id", data.id);
    }
    router.push("/");
  };

  const attemptSignUp = async (userData: Data) => {
    const data = await register(
      userData.name,
      userData.email,
      userData.password
    );
    setUser(data);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("accessToken", data.accessToken);
      window.localStorage.setItem("name", data.name);
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("id", data.id);
    }
    router.push("/");
  };

  const togglePhase = () => {
    setError("");
    clearData();
    setPhase(phase === "signin" ? "signup" : "signin");
  };

  const clearData = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  const submitForm = (e: any, data: Data) => {
    e.preventDefault();
    if (phase === "signin") {
      attemptLogin(data.email, data.password);
    } else {
      attemptSignUp(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900"></h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            JITERA bidding App, one stop center for bidding
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {phase === "signin" ? "Sign In" : "Create new account"}{" "}
            <span className="font-bold">or</span>{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={togglePhase}
            >
              {phase === "signin" ? "Create new account" : "Sign In"}
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className={`${phase === "signin" ? "hidden" : "block"}`}>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="test"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Jone Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  phase === "signin" ? "rounded-t-md" : ""
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <p className={`${error ? "block" : "hidden"} text-xs text-red-600`}>
            {error}
          </p>

          <div
            className={`${
              phase === "signin" ? "block" : "hidden"
            } flex items-center justify-between`}
          >
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => submitForm(e, { name, email, password })}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {phase === "signin" ? "Sign in" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
