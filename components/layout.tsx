import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { UserContext } from "../context/userContext";
import router from "next/router";

const name = "Jitera Bidding Platform";
export const siteTitle = "Next.js Sample Website";

const navigation = [
  { name: "Create new item", href: "/create-item", scrollTo: "", public: true },
  { name: "Deposit", href: "/deposit", scrollTo: "", public: true },
];

export default function Layout({ children }) {
  const { user } = useContext(UserContext);
  const clearLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    router.reload();
    router.push("/");
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content={name} />
            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(
                siteTitle
              )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          <Popover>
            {({ open }) => (
              <>
                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                  <nav
                    className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                    aria-label="Global"
                  >
                    <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                      <div className="flex items-center justify-between w-full md:w-auto cursor-pointer">
                        <span className="sr-only">Workflow</span>
                        <Link href="/">
                          <img
                            className="h-8 w-auto sm:h-10"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                          />
                        </Link>
                        <div className="-mr-2 flex items-center md:hidden">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                        {navigation.map((item, index) => {
                          if (item.public) {
                            return (
                              <span
                                key={index}
                                className="font-medium text-gray-500 hover:text-gray-900"
                              >
                                <Link
                                  key={item.name}
                                  href={user ? item.href : "/login-signup"}
                                >
                                  {item.name}
                                </Link>
                              </span>
                            );
                          }
                        })}
                        <span className="font-medium text-indigo-600 hover:text-indigo-500">
                          {user?.name ? (
                            <Link href="/">{`Hello, ${user.name}`}</Link>
                          ) : (
                            <Link href="/login-signup">Log in</Link>
                          )}
                        </span>
                        {user && (
                          <>
                            <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                              Balance: {`RM ${user.balanceAmount}`}
                            </span>
                            <span
                              className="font-medium text-red-600 hover:text-indigo-500 cursor-pointer"
                              onClick={clearLocalStorage}
                            >
                              Log out
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </nav>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                  >
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt=""
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close main menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <span className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                        {user?.name ? (
                          <Link href="/account">{`Hello, ${user.name}`}</Link>
                        ) : (
                          <Link href="/login-signup">Log in</Link>
                        )}
                      </span>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <main>{children}</main>
          <footer>
            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                    JITERA BIDDING APP
                  </h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A better way shop groceries
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Lorem ipsum dolor sit amet consect adipisicing elit.
                    Possimus magnam voluptatum cupiditate veritatis in accusamus
                    quisquam.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
