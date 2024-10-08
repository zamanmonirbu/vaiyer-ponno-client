import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { makePayment } from "../../actions/paymentActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllNavSections from "../AllNavSections";

const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const paymentState = useSelector((state) => state.payment);
  const { loading } = paymentState;

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
      customerName: userProfile.name,
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

  return (
    <div>
      <AllNavSections />
      <div className="container mx-auto p-6 bg-gray-200 rounded-lg shadow-md mt-4">
        <ToastContainer /> {/* This will display the toast notifications */}
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {/* User Information as Table Data */}
        <div className="mb-4 text-center">
          {userProfile && (
            <table className="w-[50%] m-auto">
              <tbody>
                <tr>
                  <td className="py-2 text-left">
                    <strong>Customer Name:</strong>
                  </td>
                  <td className="py-2 text-left">{userProfile.name}</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">
                    <strong>Customer Email:</strong>
                  </td>
                  <td className="py-2 text-left">{userProfile.email}</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">
                    <strong>Product Delivery Address:</strong>
                  </td>
                  <td className="py-2 text-left">{userProfile.address}</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">
                    <strong>Mobile:</strong>
                  </td>
                  <td className="py-2 text-left">{userProfile?.mobile}</td>
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
            className="bg-green-500 text-white rounded px-4 ml-2"
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-500">Discount applied: ${discount}</p>
        )}
        <button
          onClick={handlePayment}
          className="bg-yellow-500 text-white rounded px-4 py-2 w-full mt-4"
          disabled={loading} // Disable button if loading
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
