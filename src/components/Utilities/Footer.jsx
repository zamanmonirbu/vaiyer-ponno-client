const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 sm:py-8 w-full">
      <div className="mx-auto px-4 sm:px-6 max-w-screen-xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <section aria-labelledby="know-us" className="col-span-1">
            <h3 id="know-us" className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Get To Know Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Vaiyer Ponno
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investor Relations
                </a>
              </li>
              <li className="hidden sm:block">
                <a href="#" className="hover:underline">
                  Vaiyer Ponno Devices
                </a>
              </li>
              <li className="hidden sm:block">
                <a href="#" className="hover:underline">
                  Vaiyer Ponno Science
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="make-money" className="col-span-1">
            <h3 id="make-money" className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Make Money With Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Sell products on Vaiyer Ponno
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sell on Vaiyer Ponno Business
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
              <li className="hidden sm:block">
                <a href="#" className="hover:underline">
                  Self-Publish with Us
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="payment-products" className="col-span-1">
            <h3 id="payment-products" className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Payment Products
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Vaiyer Ponno Business Card
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop with Points
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reload Your Balance
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Currency Converter
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="help" className="col-span-1">
            <h3 id="help" className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Let Us Help You
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  COVID-19 Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Rates & Policies
                </a>
              </li>
              <li className="hidden sm:block">
                <a href="#" className="hover:underline">
                  Returns & Replacements
                </a>
              </li>
              <li className="hidden sm:block">
                <a href="#" className="hover:underline">
                  Customer Service
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2153/2153788.png"
                alt="Vaiyer Ponno Logo"
                className="w-12 sm:w-16 md:w-20"
              />
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 text-xs sm:text-sm">
              <a href="#" className="hover:underline">
                English
              </a>
              <a href="#" className="hover:underline">
                USD & CAD
              </a>
              <a href="#" className="hover:underline">
                Bangladesh
              </a>
              <a href="#" className="hover:underline">
                Help
              </a>
            </div>
          </div>
          <div className="text-center text-xs mt-4 text-gray-400">© 2023 Vaiyer Ponno, Inc. or its affiliates</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
