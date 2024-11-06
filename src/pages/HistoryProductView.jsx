import AllNavSections from "../components/Nav/AllNavSections";
import ReturnsAndOrders from "../components/Product/ReturnsAndOrders";
import Footer from "../components/Utilities/Footer";

const HistoryProductView = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Use flexbox for full height */}
      <AllNavSections />
      <div className="flex flex-col min-h-screen"> {/* This will take up the remaining height */}
        <ReturnsAndOrders />
      </div>
      <Footer />
    </div>
  );
};

export default HistoryProductView;
