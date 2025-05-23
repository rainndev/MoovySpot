const CategoryNavigation = () => {
  return (
    <div className="from-logo-blue/5 border-y-logo-blue/10 flex w-full items-center justify-center border-b bg-gradient-to-t from-0% to-transparent py-4">
      <ul className="flex w-full max-w-5xl items-center justify-between px-5 text-base text-white">
        <li>Popular</li>
        <li>Now Playing</li>
        <li>Upcoming</li>
        <li>Top Rated</li>
        <li>Latest</li>
      </ul>
    </div>
  );
};

export default CategoryNavigation;
