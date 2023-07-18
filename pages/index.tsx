import Layout from "../components/layout";
import { useState, useEffect, useContext } from "react";
import BidModal from "./bid-modal";
import Countdown from "react-countdown";
import { getItems, getUserById } from "./api/api";
import { UserContext } from "../context/userContext";

export interface IItems {
  createdAt: string;
  durationInMinutes: number;
  expired: boolean;
  itemName: string;
  price: number;
  updatedAt: string;
  _id: string;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItems>();
  const [items, setItems] = useState<Array<IItems>>();

  const { user, setUser } = useContext(UserContext);

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

  const getAllItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const getCurrentUser = async () => {
    if (localStorage.getItem("accessToken")) {
      const id = localStorage.getItem("id");
      const data = await getUserById(id);
      setUser(data);
    }
  };

  useEffect(() => {
    getAllItems();
    getCurrentUser();
  }, []);

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
                {items &&
                  items.reverse().map((item) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={item._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.itemName}
                      </th>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">
                        <Countdown
                          date={Date.now() + 5000}
                          renderer={renderer}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="rounded-md mr-4 bg-indigo-600 uppercase cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          type="button"
                          onClick={() => {
                            setShowModal(true);
                            setSelectedItem(item);
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
        selectedItem={selectedItem}
      />
    </Layout>
  );
}
