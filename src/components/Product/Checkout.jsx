import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { makeCodOrder, makePayment } from "../../actions/paymentActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../actions/cookieUtils";
import { getUserProfile } from "../../actions/userActions";


const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const paymentState = useSelector((state) => state.payment);
  const { loading } = paymentState;
  const {codData} = useSelector((state) => state.cod);

  useEffect(()=>{
    if (codData.redirectUrl) {
      // window.location.reload;
      window.location.href = codData.redirectUrl;
    }

  },[codData.redirectUrl])


  const { userProfile } = useSelector((state) => state.user);
  const userAuth = getCookie("userAuth");
  const userId = userAuth ? JSON.parse(userAuth).id : null;

  useEffect(() => {  
    if(userId){
      dispatch(getUserProfile(userId));
    }
  }, [dispatch,userId]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.qty,
    0
  );
  let total = subtotal - discount;

  const handleCouponApply = () => {
    if (coupon === "SAVE10") {
      setDiscount(10);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Sorry, no coupon found!");
    }
  };

  const handlePayment = async () => {
    const products = cartItems.map((item) => ({
      productName: item.name,
      qty: item.qty,
      price: item.unitPrice,
      sellerId: item.seller._id,
      productId: item.product,
    }));

    const paymentData = {
      customerId: userId,
      customerName: userProfile.firstName,
      customerAddress: userProfile.address,
      customerEmail: userProfile.email,
      customerMobile: userProfile.mobile,
      products,
      totalAmount: total,
    };

    const paymentUrl = await dispatch(makePayment(paymentData));
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      toast.error("Payment initiation failed!");
    }
  };

  const handleCashOnDelivery = () => {
    setShowModal(true); // Open the modal for COD confirmation
  };

  const handleCashOnDeliveryConfirm = () => {
    const products = cartItems.map((item) => ({
      productName: item.name,
      qty: item.qty,
      price: item.unitPrice,
      sellerId: item.seller._id,
      productId: item.product,
    }));

    const codData = {
      customerId: userId,
      customerName: userProfile.firstName,
      customerAddress: userProfile.address,
      customerEmail: userProfile.email,
      customerMobile: userProfile.mobile,
      products,
      totalAmount: total,
      paymentMethod: "Cash on Delivery",
    };

    dispatch(makeCodOrder(codData));
    toast.success("Order placed with Cash on Delivery!");
    setShowModal(false); // Close the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without confirming
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200 rounded-lg shadow-md mt-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4 text-center">
        {userProfile && (
          <table className="w-[50%] m-auto">
            <tbody>
              <tr>
                <td className="py-2 text-left"><strong>Customer Name:</strong></td>
                <td className="py-2 text-left">{userProfile.firstName}</td>
              </tr>
              <tr>
                <td className="py-2 text-left"><strong>Customer Email:</strong></td>
                <td className="py-2 text-left">{userProfile.email}</td>
              </tr>
              <tr>
                <td className="py-2 text-left"><strong>Product Delivery Address:</strong></td>
                <td className="py-2 text-left">{userProfile.address}</td>
              </tr>
              <tr>
                <td className="py-2 text-left"><strong>Mobile:</strong></td>
                <td className="py-2 text-left">{userProfile.mobile}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <p className="text-3xl font-bold mb-12">
        Total: <span className="text-yellow-500">${total.toFixed(2)}</span>
      </p>
      <span className="font-bold">Coupon Code</span>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={handleCouponApply}
          className="bg-[#0D9488] text-white rounded px-2 ml-2"
        >
          Apply
        </button>
      </div>
      {discount > 0 && (
        <p className="text-green-500">Discount applied: ${discount}</p>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePayment}
          className="bg-yellow-500 text-white rounded px-4 py-2 w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        <button
          onClick={handleCashOnDelivery}
          className="bg-gray-500 text-white rounded px-4 py-2 w-full"
        >
          Cash on Delivery
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>
            <p>Are you sure you want to place the order with Cash on Delivery?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white rounded px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCashOnDeliveryConfirm}
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
