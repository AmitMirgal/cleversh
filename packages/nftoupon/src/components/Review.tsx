import React, { useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/20/solid";
import { toPng } from "html-to-image";

type ReviewProps = {
  uploadFile: (event: any) => void;
  imageURL: string | null;
  reset: () => void;
};

const Review = (props: ReviewProps) => {
  const { uploadFile, imageURL, reset } = props;
  const [textAreaValue, setTextAreaValue] = useState("");

  const testButton = () => {
    const node: any = document.getElementById("preview-node");
    toPng(node).then(function (dataUrl) {
      console.log("inside the test file ", dataUrl);
    });
  };

  return (
    <>
      <div
        id="preview-node"
        className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-[100px] flex w-full justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
      >
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-black font-bold">
            {textAreaValue}
          </div>
        </div>
      </div>

      <div className="-m-0.5 mt-3 rounded-lg p-0.5">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <div>
          <textarea
            rows={5}
            name="description"
            id="description"
            className="resize-none block w-full rounded-md border-gray-300  dark:text-white dark:bg-slate-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Add your description..."
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
          className="animate-bounce ml-3 -mr-1 h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </>
  );
};

export default Review;
