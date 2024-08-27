import { Link } from "react-router-dom";


const NavbarRight = () => {
    return (
        <div className="flex items-center space-x-4 text-white text-sm">
            <div>
               <Link to={'/user/profile'}>
               <span>Hello, sign in</span>
               <p className="font-bold">Account & Lists</p>
               </Link>
            </div>
            <div>
                <p>Returns</p>
                <p className="font-bold">& Orders</p>
            </div>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                </svg>
                <p className="ml-2">Cart</p>
            </div>
        </div>
    );
};

export default NavbarRight;
