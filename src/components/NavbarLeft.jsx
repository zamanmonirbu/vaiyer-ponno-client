import { IoSearchOutline } from "react-icons/io5";

const NavbarLeft = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Location and Search Bar */}
      <div className="flex items-center space-x-2 space-y-2">
        <div className={"text-white text-sm cursor-pointer"}>
          <p>Deliver to</p>
          <p className="font-bold">Bangladesh</p>
        </div>
        <div className={"flex"}>
          <select className="bg-gray-200 border-none text-gray-700 p-1">
            <option>All</option>
          </select>
          <input
            type="text"
            placeholder="Search vaiyer-ponno"
            className="p-3 w-80 border-collapse outline-none"
          />
          <button className="bg-yellow-400 p-2">
            <IoSearchOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarLeft;
