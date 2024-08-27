import AllNavSections from "./AllNavSections";
import CategoryProductView from "./CategoryProductView";
import AboutCategory from "./UserProfile/AboutCategory";
import UserDetails from "./UserProfile/UserDetails";
import Video from "./UserProfile/Video";

const UserProfile = () => {
    return (
        <>
        <AllNavSections/>
        <div className="flex flex-col h-screen">
            {/* Top Section */}
            <div className="flex flex-row flex-grow">
                {/* Video View Section */}
                <div className="w-1/5 h-full p-2 bg-gray-200">
                    {/* <h2 className="text-lg font-bold mb-2 text-center">Video View</h2> */}
                    {/* Video component or content goes here */}
                    {/* <div className="h-full bg-black">Video</div> */}
                    <Video/>
                </div>

                {/* Bank Information Section */}
                <div className="flex-grow p-2 bg-gray-100">
                    {/* <h2 className="text-lg font-bold mb-2 text-center">I believe in quality not quantity..</h2> */}
                    {/* Bank information content goes here */}
                    {/* <div>Bank Info Content</div> */}
                    <AboutCategory/>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-row flex-grow mt-4">
                {/* User Information Section */}
                <div className="w-1/5 h-full p-2 bg-gray-200">
                    <UserDetails/>
                    {/* Other info */}
                </div>

                {/* User Product Shops Section */}
                <div className="flex-grow p-2 bg-gray-100">
                    {/* <h2 className="text-lg font-bold mb-2">User Product Shops</h2> */}
                    {/* Product shop content goes here */}
                    {/* <div>Product Shop Content</div> */}
                    <CategoryProductView/>
                </div>
            </div>
        </div>
        </>
    );
};

export default UserProfile;
