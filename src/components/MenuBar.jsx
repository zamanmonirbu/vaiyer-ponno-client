const MenuBar = () => {
  return (
    <div className="bg-gray-800 text-white h-10 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Menu Button for small screens */}
      <button className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Links (hidden on small screens, flex on large screens) */}
      <nav className="hidden lg:flex space-x-4">
        <a href="#" className="hover:underline">
          Today Deals
        </a>
        <a href="#" className="hover:underline">
          Customer Service
        </a>
        <a href="#" className="hover:underline">
          Registry
        </a>
        <a href="#" className="hover:underline">
          Gift Cards
        </a>
        <a href="#" className="hover:underline">
          Sell
        </a>
      </nav>

      {/* Dropdown menu for small screens */}
      <div className="flex lg:hidden">
        <nav className="space-x-4">
          <a href="#" className="hover:underline">
            Today Deals
          </a>
          <a href="#" className="hover:underline">
            Customer Service
          </a>
          <a href="#" className="hover:underline">
            Registry
          </a>
          <a href="#" className="hover:underline">
            Gift Cards
          </a>
          <a href="#" className="hover:underline">
            Sell
          </a>
        </nav>
      </div>
    </div>
  );
};

export default MenuBar;
