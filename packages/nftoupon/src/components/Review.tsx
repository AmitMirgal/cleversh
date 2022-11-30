import Textarea from "./Textareas";
import { RocketLaunchIcon } from "@heroicons/react/20/solid";
import { drawCanvas } from "../common/helper";

type ReviewProps = {
  uploadFile: (event: any) => void;
  imageURL: string | null;
  reset: () => void;
};

const Review = (props: ReviewProps) => {
  const { uploadFile, imageURL, reset } = props;

  return (
    <>
      <div className="mt-1 pb-5 sm:col-span-2 sm:mt-0">
        <canvas
          className="flex h-72 w-full justify-center rounded-md border-2 border-line border-gray-300 px-6 pt-5 pb-6"
          id="canvas"
        ></canvas>
      </div>

      <div className="pb-5 ">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full rounded-md dark:bg-slate-800 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="creative nft name"
          />
        </div>
      </div>

      <Textarea />

      <button
        type="button"
        onClick={drawCanvas}
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
