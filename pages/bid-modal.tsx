import React, { useContext, useState } from "react";
import { bidItem } from "./api/api";
import { UserContext } from "../context/userContext";

export interface BidInterface {
  itemId: string;
  price: number;
  bidderName: string;
  bidderId: string;
  createdAt?: string;
}

export default function BidModal({ showModal, setShowModal, selectedItem }) {
  const [offeredBidPrice, setOfferedBidPrice] = useState<number>();
  const { user, setUser } = useContext(UserContext);
  const submitForm = async (e: any, data: BidInterface) => {
    e.preventDefault();
    await bidItem(data.price, data.itemId, data.bidderName, data.bidderId);
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {selectedItem.itemName}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    id="bid-price"
                    name="price"
                    type="text"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your bid price"
                    value={offeredBidPrice}
                    onChange={(e) => setOfferedBidPrice(e.target.value as any)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="rounded-md mr-4 bg-indigo-600 uppercase cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="button"
                    onClick={(e) => {
                      submitForm(e, {
                        price: offeredBidPrice,
                        itemId: selectedItem._id,
                        bidderName: user.name,
                        bidderId: user._id,
                      });
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
