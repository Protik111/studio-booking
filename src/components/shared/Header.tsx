import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white py-6 shadow-md shadow-black/10 z-[1024] dark:bg-darkRaisin">
      <div className="container lg:flex justify-between md:items-center">
        <div className="brand-logo text-center">
          <Link to="/">
            <h2 className="text-2xl font-bold">Studio Booking</h2>
          </Link>
        </div>

        <div className="right_nav_controls self-center max-lg:-mt-8">
          <ul className="flex flex-row items-center gap-2 sm:gap-4 md:gap-4 dark:text-white">
            <Link to="/bookings" className="text-md dark:text-white">
              <li className="ml-auto hover:border border-theme px-4 py-1 rounded-full cursor-pointer">
                <span>Bookings</span>
              </li>
            </Link>
            <Link to="/studio" className="text-md dark:text-white">
              <li className="ml-auto hover:border border-theme px-4 py-1 rounded-full cursor-pointer">
                <span>Studio</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
