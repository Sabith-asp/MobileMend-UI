import React from "react";

const Modal = ({ isOpen, onClose, children, head }) => {
  if (!isOpen) return null; // Avoid rendering the modal when it's closed

  return (
    <dialog open className="modal ">
      <div className="modal-box rounded-2xl max-h-[80vh]">
        <form method="dialog">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{head}</h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
