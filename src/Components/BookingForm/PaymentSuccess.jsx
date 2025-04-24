import React from "react";
import Lottie from "lottie-react";
import successAnimation from "./success.json"; // your downloaded JSON file

const PaymentSuccess = () => {
  return (
    <div style={{ width: 200, margin: "auto" }}>
      <Lottie animationData={successAnimation} loop={false} />
      <h3 style={{ textAlign: "center", color: "green" }}>
        Payment Successful
      </h3>
    </div>
  );
};

export default PaymentSuccess;
