export default function Profile() {
  return (
    <form className="space-y-8">
      <div className="space-y-8">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  www.nftoupon.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="resize-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
