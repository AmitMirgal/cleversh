import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Textarea() {
  return (
    <form action="#">
      <Tab.Group>
        <>
          <Tab.List className="flex items-center">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                    : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                  "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                )
              }
            >
              Write
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                    : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                  "ml-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                )
              }
            >
              Preview
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
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
                  defaultValue={""}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
              <div className="border-b">
                <div className="mx-px mt-px px-3 pt-2 pb-12 text-sm leading-5 text-gray-800 dark:text-white">
                  Preview content will render here.
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </>
      </Tab.Group>
    </form>
  );
}
