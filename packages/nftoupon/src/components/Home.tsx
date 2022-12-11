import React, { useEffect, useState } from "react";
import { RocketLaunchIcon, WalletIcon } from "@heroicons/react/20/solid";
import { toPng } from "html-to-image";
import { useQuery } from "urql";
import QRCode from "./QRCode";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import { Connect, Subscription } from "../common/sdls";

const Home = () => {
  const [payloadUuid, setPayloadUuid] = useState<string>("");
  const [result, fetch] = useQuery({
    query: Connect,
    pause: true,
  });

  const [subscriptionResult, subscribe] = useQuery({
    query: Subscription,
    variables: {
      id: payloadUuid,
    },
    pause: true,
  });

  const { data, error, fetching } = result;
  const { data: subscribedData, fetching: subscribedLoader } =
    subscriptionResult;

  const [textAreaValue, setTextAreaValue] = useState("");

  const textToImage = () => {
    const node: any = document.getElementById("description");
    toPng(node).then(function (dataUrl) {
      console.log("inside the test file ", dataUrl);
    });
  };

  useEffect(() => {
    const uuid = get(data, "connect.uuid");
    !isEmpty(uuid) && setPayloadUuid(uuid);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(payloadUuid)) {
      subscribe();
    }
  }, [payloadUuid]);

  return (
    <div className="h-56">
      {!isEmpty(get(data, "connect.refs.qr_png")) &&
      !isEqual(get(subscribedData, "subscription.status"), "is signed") ? (
        <QRCode imageUrl={get(data, "connect.refs.qr_png")} />
      ) : (
        <>
          <div className="flex items-start justify-end pb-1">
            {!isEmpty(get(subscribedData, "subscription.address")) ? (
              <div className="inline-flex items-center rounded-full bg-black px-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base">
                <span className="truncate w-20">
                  {get(subscribedData, "subscription.address")}
                </span>
              </div>
            ) : (
              <WalletIcon
                onClick={fetch}
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
            onClick={fetch}
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
