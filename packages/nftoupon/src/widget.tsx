import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Home from "./components/Home";
import { Footer } from "./components/Footer";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8910/api/graphql",
});

export function Widget() {
  return (
    <Provider value={client}>
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-80 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="max-w-sm divide-y divide-gray-200 dark:bg-slate-800 overflow-hidden rounded-lg bg-white shadow border-solid">
                  <div className="max-w-sm px-4 py-3 dark:text-white text-left">
                    <Home />
                  </div>
                  <div className="px-3 py-3 dark:text-white">
                    <Footer />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </Provider>
  );
}
