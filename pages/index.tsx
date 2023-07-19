import Layout from "../components/layout";
import { useState, useEffect, useContext } from "react";
import BidModal, { BidInterface } from "./bid-modal";
import Countdown from "react-countdown";
import {
  expireItem,
  getItems,
  getListOfBidsItemId,
  getUserById,
  nominateBidWinner,
} from "./api/api";
import { UserContext } from "../context/userContext";
import router from "next/router";
import ListOfBidsModal from "./bids-list.modal";
import moment from "moment";
import { BidStatus, IBidStatus } from "../util/enums";

export interface IItem {
  createdAt: string;
  durationInMinutes: number;
  expired: boolean;
  itemName: string;
  price: number;
  updatedAt: string;
  belongsTo: string;
  _id: string;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showBidsListModal, setShowBidsListModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItem>();
  const [items, setItems] = useState<Array<IItem>>();
  const [bids, setBids] = useState<Array<BidInterface>>();
  const [bidStatus, setBidStatus] = useState<IBidStatus>(BidStatus.ONGOING);

  const { user, setUser } = useContext(UserContext);

  const renderer = ({ hours, minutes, seconds, completed }, item: IItem) => {
    if (completed) {
      expireThisItem(item);
      return <span>Item expired</span>;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const expireThisItem = async (item: IItem) => {
    Promise.all([
      await nominateBidWinner(item._id),
      await expireItem(item._id),
    ]);
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

  const getListOfBids = async (itemId: string) => {
    const bids = await getListOfBidsItemId(itemId);
    setBids(bids);
  };

  useEffect(() => {
    getAllItems();
    getCurrentUser();
  }, []);

  const handleShowBidsForItem = async (item: IItem) => {
    setSelectedItem(item);
    await getListOfBids(item._id);
    setShowBidsListModal(true);
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="my-4 gap-x-6">
            <button
              type="button"
              className={`rounded-md mr-4 cursor-pointer px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
              ${
                bidStatus === BidStatus.ONGOING
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-white text-indigo-600"
              }`}
              onClick={() => setBidStatus(BidStatus.ONGOING)}
            >
              Ongoing
            </button>
            <button
              type="button"
              className={`rounded-md mr-4 cursor-pointer px-3.5 py-2.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
              ${
                bidStatus === BidStatus.COMPLETED
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-white text-indigo-600"
              }`}
              onClick={() => setBidStatus(BidStatus.COMPLETED)}
            >
              Completed
            </button>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {bidStatus === BidStatus.ONGOING
              ? "Available items to bid"
              : "Completed bid"}
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
                  {bidStatus === BidStatus.ONGOING ? (
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  ) : (
                    <th scope="col" className="px-6 py-3">
                      Bid Winner
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items &&
                  items
                    .filter((item) => {
                      if (bidStatus === BidStatus.ONGOING) {
                        return item.expired === false;
                      } else {
                        return item.expired === true;
                      }
                    })
                    .map((item) => {
                      const expire = moment(item.createdAt)
                        .add(item.durationInMinutes, "minutes")
                        .toISOString();

                      return (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={item._id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium cursor-pointer text-gray-900 whitespace-nowrap dark:text-white"
                            onClick={() => handleShowBidsForItem(item)}
                          >
                            {item.itemName}
                          </th>
                          <td className="px-6 py-4">{`RM ${item.price}`}</td>
                          <td className="px-6 py-4">
                            <Countdown
                              date={expire}
                              renderer={(props) => renderer(props, item)}
                            />
                          </td>
                          {bidStatus === BidStatus.ONGOING ? (
                            <td className="px-6 py-4">
                              <button
                                className="rounded-md mr-4 bg-indigo-600 uppercase cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="button"
                                onClick={() => {
                                  if (!user) {
                                    router.push("/login-signup");
                                  } else {
                                    setShowModal(true);
                                    setSelectedItem(item);
                                  }
                                }}
                              >
                                Bid
                              </button>
                            </td>
                          ) : (
                            <td className="px-6 py-4">{item.belongsTo}</td>
                          )}
                        </tr>
                      );
                    })}
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
      <ListOfBidsModal
        showModal={showBidsListModal}
        setShowModal={setShowBidsListModal}
        selectedItem={selectedItem}
        bids={bids}
      />
    </Layout>
  );
}
