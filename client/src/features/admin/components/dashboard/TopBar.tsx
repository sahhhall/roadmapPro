const TopBar = () => {
  return (
    <div className="border-b mb-4 px-4 mt-2 pb-4 dark:border-gray-800 border-stone-200">
      <div className="flex  items-center justify-between">
        <div>
          <span className="text-xs font-bold block">
            🚀 Good morning, Admin
          </span>
          <span className="text-xs block text-stone-500">
            Tuesday, Nov 8 2024
          </span>
        </div>
        <div className="">
          {/* <Calneder /> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
