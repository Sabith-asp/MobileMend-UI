import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/", { state: { scrollTo: "booking-from" } });
  };
  return (
    <div className="container mx-auto">
      <div className=" h-[90vh] grid grid-cols-1 md:grid-cols-[40%_60%]">
        <div className="h-[100%] flex flex-col justify-center">
          <div className="ml-5 mt-14 sm:mt-0">
            <span className="text-primary text-xs p-1 px-2 bg-blue-200 rounded-full">
              Professional Repair Service
            </span>
            <h1 className="text-3xl sm:text-5xl font-semibold mt-3">
              We Come To <br />
              <span className="text-primaryblue">Fix Your Device</span>
            </h1>
            <p className="mt-4 text-base text-secondarygray">
              Professional, convenient repairs at your home or office. No need
              to visit a store or ship your device.
            </p>
            <div className="flex mt-6">
              <button
                onClick={handleButtonClick}
                className="btn-primary-rounded flex text-xs font-normal"
              >
                Book a Repair Now <FaArrowRight className="mt-[2px] ml-3" />
              </button>
              <button className="btn-light-rounded ml-3 text-xs font-normal">
                <Link to="/services">View Services</Link>
              </button>
            </div>
            <div className="flex mt-7">
              <div className="flex">
                <AiOutlineSafety className="text-primaryblue" />
                <span className="ml-2 text-xs">90-Day Warranty</span>
              </div>
              <div className="flex ml-3">
                <FiClock className="text-primaryblue" />
                <span className="ml-2 text-xs">Fast Repairs</span>
              </div>
              <div className="flex ml-3">
                <MdOutlineLocationOn className="text-primaryblue" />
                <span className="ml-2 text-xs">On-site Service</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[55%] my-11 sm:my-0">
            <img
              src="https://freepngimg.com/download/apple_iphone/133326-12-apple-iphone-free-hd-image.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
