import React, { useState } from "react";
import { RocketLaunchIcon, WalletIcon } from "@heroicons/react/20/solid";
import { toPng } from "html-to-image";
import QRCode from "./QRCode";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

const Home = () => {
  const [xummPayload, setXummPayload] = useState<any>("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const connectWallet = () => {
    const evtSource = new EventSource(
      "http://localhost:54321/functions/v1/xumm-connect"
    );

    evtSource.onmessage = (event) => {
      setXummPayload(JSON.parse(event.data));
      const isSigned = get(JSON.parse(event.data), "meta.signed");
      isSigned && evtSource.close();
    };
  };

  const textToImage = () => {
    const node: any = document.getElementById("description");
    toPng(node).then(function (dataUrl) {
      console.log("textToImage:: dataUrl -> ", dataUrl);
    });
  };

  return (
    <div className="h-56">
      {!isEmpty(get(xummPayload, "qr_png")) ? (
        <QRCode imageUrl={get(xummPayload, "qr_png")} />
      ) : (
        <>
          <div className="flex items-start justify-end pb-2">
            {!isEmpty(get(xummPayload, "response.account")) ? (
              <div className="inline-flex items-center rounded-full bg-black px-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base">
                <span className="truncate w-20">
                  {get(xummPayload, "response.account")}
                </span>
              </div>
            ) : (
              <WalletIcon
                onClick={connectWallet}
                className="h-5 w-5 mb-3 cursor-pointer"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="rounded-lg">
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <div>
              <textarea
                rows={5}
                name="description"
                id="description"
                className="resize-none block w-full rounded-md border-gray-300  dark:text-white dark:bg-slate-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add your review..."
                value={textAreaValue}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTextAreaValue(event.target.value)
                }
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Mint
            <RocketLaunchIcon
              className="ml-3 -mr-1 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
