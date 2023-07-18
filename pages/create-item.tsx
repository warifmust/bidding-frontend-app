import router from "next/router";
import Layout from "../components/layout";
import { createItem } from "./api/api";
import { useState } from "react";

interface CreateItemInterface {
  itemName: string;
  price: number;
  durationInMinutes: number;
}

export default function CreateItem() {
  const [itemName, setItemName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [timeWindow, setTimeWindow] = useState<number>();

  const submitForm = async (e: any, data: CreateItemInterface) => {
    e.preventDefault();
    await createItem(data.itemName, data.price, data.durationInMinutes);
    router.push("/");
  };

  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new item
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  placeholder="Please insert the item name"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  required
                  placeholder="Price in RM"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value as any)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="durationInMinutes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time window
              </label>
              <div className="mt-2">
                <input
                  id="durationInMinutes"
                  name="durationInMinutes"
                  type="number"
                  autoComplete="durationInMinutes"
                  required
                  placeholder="Time in minutes"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value as any)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) =>
                  submitForm(e, {
                    itemName,
                    price,
                    durationInMinutes: timeWindow,
                  })
                }
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
