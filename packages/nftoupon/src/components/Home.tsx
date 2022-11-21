import Textarea from "./Textareas";
import { BackwardIcon, RocketLaunchIcon } from "@heroicons/react/20/solid";

type HomeProps = {
  uploadFile: (event: any) => void;
  imageURL: string | null;
  reset: () => void;
};

const Home = (props: HomeProps) => {
  const { uploadFile, imageURL, reset } = props;

  return (
    <>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="flex max-w-screen-md justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          {imageURL ? (
            <div className="flex flex-col">
              <img
                className="max-h-36 w-auto"
                src={`data:image/jpeg;base64,${imageURL}`}
              ></img>
              <button
                type="button"
                onClick={reset}
                className="mt-3 inline-flex w-24 items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset
                <BackwardIcon
                  className="ml-2 -mr-0.5 h-4 w-4"
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white dark:bg-slate-800 font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={(event) => uploadFile(event)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </div>
      <div className="py-5">
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
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="creative nft name"
          />
        </div>
      </div>

      <Textarea />

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

export default Home;
