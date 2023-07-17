import Layout from "../components/layout";
import { useState } from "react";
import BidModal from "./bid-modal";
import Countdown from "react-countdown";

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro 17",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: "$2999",
  },
  {
    id: 2,
    name: "T Shirt",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: "$35",
  },
  {
    id: 3,
    name: "Jacket",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: "$35",
  },
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");
  const Expired = () => <span>Item expired</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // Call endpoint to invalidate item for bidding
      return <Expired />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="my-4 gap-x-6">
            <a className="rounded-md mr-4 bg-indigo-600 cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Ongoing
            </a>
            <a className="rounded-md mr-4 bg-indigo-600 cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Completed
            </a>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Available items to bid
          </h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={product.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">
                      <Countdown date={Date.now() + 5000} renderer={renderer} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="rounded-md mr-4 bg-indigo-600 uppercase cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedItemName(product.name);
                        }}
                      >
                        Bid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BidModal
        showModal={showModal}
        setShowModal={setShowModal}
        itemName={selectedItemName}
      />
    </Layout>
  );
}
