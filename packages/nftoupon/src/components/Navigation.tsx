import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

const pages = [
  { name: "NFT", tab: 2, current: true },
  { name: "Activity", tab: 3, current: false },
];

type NavigationProps = {
  setTab: (number: any) => void;
};

export default function Navigation(props: NavigationProps) {
  const { setTab } = props;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a
              onClick={() => setTab(1)}
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => {
          if (page.name === "Activity") {
            return (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex">
                    <a
                      onClick={() => setTab(page.tab)}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
                      aria-current={page.current ? "page" : undefined}
                    >
                      {page.name}
                    </a>
                    <span className="flex absolute h-2 w-2 top-0 right-0 -mt-1 -mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </span>
                </div>
              </li>
            );
          } else {
            return (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <a
                    onClick={() => setTab(page.tab)}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.name}
                  </a>
                </div>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}
