import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { FaStar } from "react-icons/fa";

const RateTechnician = () => {
  const [rating, setrating] = useState(5);
  const [review, setReview] = useState("");
  return (
    <div>
      <p className="text-secondarygray">Rate the service provided by "Name"</p>
      <div className="mt-2">
        <h6>Your Rating</h6>
        <div className="flex mt-2">
          <button onClick={() => setrating(1)}>
            <FaStar
              className={`text-xl mr-1 ${
                rating >= 1 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setrating(2)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 2 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setrating(3)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 3 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setrating(4)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 4 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setrating(5)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 5 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h6>Review</h6>
        <Textarea
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          placeholder="Write your review here..."
          className="w-full h-24 border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex float-end mt-3">
        <button className="btn-primary-gray">Cancel</button>
        <button className="btn-primary-blue">Submit Rating</button>
      </div>
    </div>
  );
};

export default RateTechnician;
