import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Review from "./components/Review";
import { Footer } from "./components/Footer";

export function Widget() {
  const [tab, setTab] = useState(0);
  const [base64String, setBase64String] = useState<string | null>(null);

  const reset = () => {
    setBase64String(null);
  };

  const uploadFile = (event: any) => {
    const reader = new FileReader();
    reader.onload = async function () {
      /* Base64 is a binary-to-text encoding scheme used to 
			  transport data. The encoding is necessary when the transfer 
			  medium is not able to handle binary data. 
			  This binary data is then translated to a text representation (base64) and transferred as text. */

      // base64 is an algorithm for encoding and decoding an object to ASCII format.
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const base64String: any = reader?.result;

      setBase64String(base64String.split(",")[1]);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  let Component: JSX.Element | null = null;
  switch (tab) {
    case 2:
      Component = (
        <Review uploadFile={uploadFile} imageURL={base64String} reset={reset} />
      );
      break;
    default:
      Component = <Home />;
      break;
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md border-gray-600 bg-slate-800 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Nftoupon</span>
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-slate-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="divide-y divide-gray-200 dark:bg-slate-800 overflow-hidden rounded-lg bg-white shadow border-solid">
                <div className="px-4 py-5 sm:px-6 dark:text-white">
                  <Navigation setTab={setTab} />
                </div>
                <div className="px-4 py-5 sm:p-6 dark:text-white text-left">
                  {Component}
                </div>
                <div className="px-4 py-4 sm:px-6 dark:text-white">
                  <Footer />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
