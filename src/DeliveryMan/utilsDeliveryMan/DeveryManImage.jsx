import { useSelector } from "react-redux";

const DeliveryManImage = () => {
    const {profile}=useSelector((state)=>state.deliveryMan)
    return (
        <div>
            <img src={profile?.image} alt="hello" className="w-10 h-10 rounded-full border-2 border-gray-600" />
        </div>
    );
};

export default DeliveryManImage;