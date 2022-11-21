import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const comments = [
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

const Comment = () => {
  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Message Center
            </h2>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul role="list" className="space-y-8">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div className="flex space-x-3">
                    <div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">
                          {comment.name}
                        </a>
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        <p>{comment.body}</p>
                      </div>
                      <div className="mt-2 space-x-2 text-sm">
                        <span className="font-medium text-gray-500">
                          {comment.date}
                        </span>{" "}
                        <span className="font-medium text-gray-500">
                          &middot;
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <form action="#">
                <div>
                  <label htmlFor="comment" className="sr-only">
                    About
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="resize-none block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Add a note"
                    defaultValue={""}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
