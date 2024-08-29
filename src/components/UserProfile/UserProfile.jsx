import AllNavSections from "../AllNavSections";
import CategoryProductView from "../CategoryProductView";
import AboutCategory from "./AboutCategory";
import UserDetails from "./UserDetails";
import Video from "./Video";

const UserProfile = () => {
  return (
    <>
      <AllNavSections />
      <div className="flex flex-col h-screen">
        {/* Top Section */}
        <div className="flex flex-row flex-grow">
          {/* Video View Section */}
          <div className="w-1/5 h-full p-2 bg-gray-200">
            <Video />
          </div>

          {/* Bank Information Section */}
          <div className="flex-grow p-2 bg-gray-100">
            {/* Bank information content goes here */}
            <AboutCategory />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row flex-grow mt-4">
          {/* User Information Section */}
          <div className="w-1/5 h-full p-2 bg-gray-200">
            <UserDetails />
            {/* Other info */}
          </div>

          {/* User Product Shops Section */}
          <div className="flex-grow p-2 bg-gray-100">
            {/* Product shop content goes here */}
            <CategoryProductView />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
