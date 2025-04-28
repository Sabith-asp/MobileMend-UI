import React from "react";
import { FaFileAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ApplicationDetails = ({ application }) => {
  // Function to handle document download
  const downloadDocument = (base64Data) => {
    // Decode the base64 string into a byte array
    const byteCharacters = atob(base64Data); // Decoding the base64 string to raw binary
    const byteArrays = [];

    // Convert the raw binary into a byte array (Uint8Array)
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    // Combine the byte arrays into one large Uint8Array
    const byteArray = new Uint8Array(
      byteArrays.reduce(
        (acc, byteArray) => acc.concat(Array.from(byteArray)),
        []
      )
    );

    // Create a Blob from the byteArray
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf"; // You can adjust the name based on your logic
    link.click();

    // Clean up the URL object after use
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-6 bg-white rounded-xl shadow-lg border text-sm space-y-4">
      <div className="border-b pb-2">
        <h2 className="text-lg font-semibold">Application Details</h2>
        <p className="text-gray-500 text-xs">
          Review applicant information and documents
        </p>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Personal Information</h3>
        <div className="mt-2 space-y-1 text-gray-600">
          <p>
            <span className="font-semibold">Full Name:</span>
            {application?.name}
          </p>
          <p>
            <span className="font-semibold">Applied On:</span>
            {new Date(application?.requestDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {application?.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {application?.phone}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Professional Details</h3>
        <div className="mt-2 space-y-1 text-gray-600">
          <p>
            <span className="font-semibold">Experience:</span>
            {application?.experience} years
          </p>

          <p>
            <span className="font-semibold">Specializations:</span>{" "}
            {application?.specialization?.split(",").map((sp) => (
              <span className="p-1 px-2 bg-blue-200 text-primaryblue text-xs rounded-full mr-1">
                {sp}
              </span>
            ))}
          </p>
          <p>
            <span className="font-semibold">Bio:</span>
            <span className="block truncate">{application?.bio}</span>
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Documents</h3>
        <div className="mt-2 flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-blue-500" />
            <span className="text-gray-700">Resume/CV</span>
          </div>
          {/* Show the document as a download link */}
          {application?.documentData ? (
            <button
              onClick={() => downloadDocument(application.documentData)}
              className="text-blue-600 hover:underline text-sm"
            >
              Download
            </button>
          ) : (
            <span className="text-gray-500 text-xs">No document available</span>
          )}
        </div>
      </div>

      {/* Uncomment these if needed */}
      {/* <div className="flex justify-end gap-2 pt-4">
        <button className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
          <FaTimesCircle /> Reject Application
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition">
          <FaCheckCircle /> Approve Application
        </button>
      </div> */}
    </div>
  );
};

export default ApplicationDetails;
