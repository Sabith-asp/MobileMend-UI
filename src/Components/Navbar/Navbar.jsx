import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-2 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
            <li>
              <a>Item 4</a>
            </li>
          </ul>
        </div>
        <a className=" text-2xl font-bold">
          <span className="text-primaryblue">Mobile</span>Mend
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a>Item 1</a>
          </li>
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li>
            <a>Item 4</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn-primary-rounded  text-xs font-normal hidden sm:flex">
          <IoCallOutline className="flex justify-center items-center mt-[2px] mr-1" />
          Book a Repair
        </button>
        <button className="btn-primary-rounded text-xs ml-3 font-normal">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
