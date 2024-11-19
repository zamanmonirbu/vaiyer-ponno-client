import { useSelector } from "react-redux";

const ViewImage = () => {
    const { courierInfo } = useSelector((state) => state.courier);
    return (
        <div>
            <img src={courierInfo.image} alt="" className="w-10 h-10 rounded-full border-2 border-blue-600" />
        </div>
    );
};

export default ViewImage;