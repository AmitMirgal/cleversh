export default function Textarea() {
  return (
    <>
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
            defaultValue={""}
          />
        </div>
      </div>
    </>
  );
}
