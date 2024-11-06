const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 w-full ">
      <div className="mx-auto px-4 max-w-screen-xl"> {/* Optional max-width */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <section aria-labelledby="know-us">
            <h3 id="know-us" className="font-bold text-lg mb-4">Get To Know Us</h3>
            <ul>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">About Vaiyer Ponno</a></li>
              <li><a href="#" className="hover:underline">Investor Relations</a></li>
              <li><a href="#" className="hover:underline">Vaiyer Ponno Devices</a></li>
              <li><a href="#" className="hover:underline">Vaiyer Ponno Science</a></li>
            </ul>
          </section>
          <section aria-labelledby="make-money">
            <h3 id="make-money" className="font-bold text-lg mb-4">Make Money With Us</h3>
            <ul>
              <li><a href="#" className="hover:underline">Sell products on Vaiyer Ponno</a></li>
              <li><a href="#" className="hover:underline">Sell on Vaiyer Ponno Business</a></li>
              <li><a href="#" className="hover:underline">Sell apps on Vaiyer Ponno</a></li>
              <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline">Self-Publish with Us</a></li>
              <li><a href="#" className="hover:underline">Host a Vaiyer Ponno Hub</a></li>
              <li><a href="#" className="hover:underline">See More Make Money with Us</a></li>
            </ul>
          </section>
          <section aria-labelledby="payment-products">
            <h3 id="payment-products" className="font-bold text-lg mb-4">Vaiyer Ponno Payment Products</h3>
            <ul>
              <li><a href="#" className="hover:underline">Vaiyer Ponno Business Card</a></li>
              <li><a href="#" className="hover:underline">Shop with Points</a></li>
              <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
              <li><a href="#" className="hover:underline">Vaiyer Ponno Currency Converter</a></li>
            </ul>
          </section>
          <section aria-labelledby="help">
            <h3 id="help" className="font-bold text-lg mb-4">Let Us Help You</h3>
            <ul>
              <li><a href="#" className="hover:underline">Vaiyer Ponno and COVID-19</a></li>
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Your Orders</a></li>
              <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
              <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
              <li><a href="#" className="hover:underline">Manage Your Content and Devices</a></li>
              <li><a href="#" className="hover:underline">Customer Service</a></li>
            </ul>
          </section>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2153/2153788.png"
                alt="Vaiyer Ponno Logo"
                className="w-8 md:w-16 lg:w-20"
              />
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">English</a>
              <a href="#" className="hover:underline">USD & CAD</a>
              <a href="#" className="hover:underline">Bangladesh</a>
              <a href="#" className="hover:underline">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
