import { addSpare, getSpareByBookingId } from "@/Api/spareApi";
import { Input } from "@/Components/ui/input";
import { setAddSpareModalOpen } from "@/Redux/Slices/uiSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddSpare = ({ setSelectedAddSpare, bookingId }) => {
  const dispatch = useDispatch();
  const [spareName, setSpareName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const { user } = useSelector((state) => state.user);

  const { data: spareByBookingIdData, refetch: spareByBookingIdRefetch } =
    useQuery({
      queryKey: ["spareByBookingId"],
      queryFn: () => getSpareByBookingId(bookingId),
    });

  //   const {
  //     data: addressData,
  //     isLoading,
  //     isError,
  //     error,
  //     refetch: addressRefetch,
  //   } = useQuery({
  //     queryKey: ["addresses"], // unique key
  //     queryFn: getAddress,
  //   });

  console.log(spareByBookingIdData);

  const addSpares = async (sparedata) => {
    try {
      if (!spareName || !price || !qty) return;
      console.log(sparedata);

      const response = await addSpare(sparedata);
      console.log(response);
      setSpareName("");
      setPrice("");
      setQty("");
      spareByBookingIdRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Spare Parts List</h4>

      <table className="w-full border border-gray-300 mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-left">Item Name</th>
            <th className="p-2 border border-gray-300 text-left">Price</th>
            <th className="p-2 border border-gray-300 text-left">Qty</th>
          </tr>
        </thead>
        <tbody>
          {spareByBookingIdData?.data?.length > 0 ? (
            spareByBookingIdData?.data.map((spare, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-300">
                  {spare.spareName}
                </td>
                <td className="p-2 border border-gray-300">
                  {spare.totalCost}
                </td>
                <td className="p-2 border border-gray-300">{spare.qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 text-center text-gray-500">
                No spare parts added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Input Row for Adding Spare */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="col-span-5">
          <h6>Item Name</h6>
          <Input
            value={spareName}
            onChange={(e) => setSpareName(e.target.value)}
          />
        </div>
        <div className="col-span-3">
          <h6>Price</h6>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>
        <div className="col-span-2">
          <h6>Qty</h6>
          <Input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex col-span-2 items-end">
          <button
            onClick={() =>
              addSpares({
                spareName: spareName,
                price: price,
                qty: qty,
                bookingID: bookingId,
                technicianID: user.technicianId,
              })
            }
            className="p-2 border rounded-xl border-gray-400"
          >
            Add
          </button>
        </div>
      </div>

      <div className="py-3 float-end">
        <button
          onClick={() => {
            setSelectedAddSpare(null);
            dispatch(setAddSpareModalOpen());
          }}
          className="btn-primary-gray mr-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSpare;
