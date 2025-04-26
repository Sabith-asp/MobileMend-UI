import React from "react";
import Login from "../../Components/Login/Login";

const Auth = ({ item }) => {
  return (
    <div className="container mx-auto">
      <div className=" h-[120vh] sm:h-[90vh]  grid grid-cols-1 md:grid-cols-2">
        <div className="h-[100%] flex flex-col items-center justify-center">
          <div className="w-[70%]">
            <img
              src="https://png.monster/wp-content/uploads/2023/09/PNG.monsterapple-iphone-15-pro-photo%20png.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[100%]">{item}</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
