import { Link } from "react-router-dom";
// import HomeNotificationBar from "../components/HomeNotificationBar";
// import Navbar from "../components/Navbar";
// import MenuBar from "../components/MenuBar";
import CategoryBanner from "../components/CategoryBanner";
// import MostLovedCategories from "../components/MostLovedCategories ";
import AllProductViews from "../components/AllProductViews";
import Footer from "../components/Footer";
import AllNavSections from "../components/AllNavSections";

const Home = () => {
    return (
        <div>
           <AllNavSections/>
            <CategoryBanner/>  
            {/* <MostLovedCategories/>  */}
            <AllProductViews/>
            <h1>Welcome to the Home Page</h1>
            <Link to={'/dashboard'} className="text-green-500">User Dashboard</Link>
            <Footer/>
        </div>
    );
};

export default Home;
