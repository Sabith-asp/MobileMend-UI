import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setRatingModalOpen } from "@/Redux/Slices/uiSlice";
import { addRating } from "@/Api/ratingApi";

const RateTechnician = ({ setBookingForRating, bookingForRating }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const rateTechncian = async (data) => {
    try {
      const response = await addRating(data);
      console.log(response);

      setRating(0);
      setReview("");
      dispatch(setRatingModalOpen());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className="text-secondarygray">
        Rate the service provided by {bookingForRating?.technicianName}
      </p>
      <div className="mt-2">
        <h6>Your Rating</h6>
        <div className="flex mt-2">
          <button onClick={() => setRating(1)}>
            <FaStar
              className={`text-xl mr-1 ${
                rating >= 1 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setRating(2)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 2 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setRating(3)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 3 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setRating(4)}>
            <FaStar
              className={`text-xl mr-1  ${
                rating >= 4 ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={() => setRating(5)}>
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
        <button
          onClick={() => {
            dispatch(setRatingModalOpen());
            setBookingForRating(null);
          }}
          className="btn-primary-gray"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            rateTechncian({
              bookingID: bookingForRating?.bookingID,
              technicianID: bookingForRating?.technicianID,
              ratingNo: rating,
              reviewText: review,
            })
          }
          className="btn-primary-blue"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RateTechnician;
