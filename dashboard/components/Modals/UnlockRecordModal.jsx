import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../customButton/CustomButton";
import toast from "react-hot-toast";

const UnlockRecordModal = ({ show, onHide, user }) => {
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleUnlock = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Record for ${user.firstName} unlocked successfully!`);
      setLoading(false);
      onHide();
    }, 1500); // 1.5s delay
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Body className="text-center p-15 p-sm-32">
        <div className="mb-15 mb-sm-32">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="48"
              height="48"
              rx="8"
              fill="#F04B4B"
              fillOpacity="0.08"
            />
            <path
              d="M12 24C12 25.5759 12.3104 27.1363 12.9134 28.5922C13.5165 30.0481 14.4004 31.371 15.5147 32.4853C16.629 33.5996 17.9519 34.4835 19.4078 35.0866C20.8637 35.6896 22.4241 36 24 36C25.5759 36 27.1363 35.6896 28.5922 35.0866C30.0481 34.4835 31.371 33.5996 32.4853 32.4853C33.5996 31.371 34.4835 30.0481 35.0866 28.5922C35.6896 27.1363 36 25.5759 36 24C36 22.4241 35.6896 20.8637 35.0866 19.4078C34.4835 17.9519 33.5996 16.629 32.4853 15.5147C31.371 14.4004 30.0481 13.5165 28.5922 12.9134C27.1363 12.3104 25.5759 12 24 12C22.4241 12 20.8637 12.3104 19.4078 12.9134C17.9519 13.5165 16.629 14.4004 15.5147 15.5147C14.4004 16.629 13.5165 17.9519 12.9134 19.4078C12.3104 20.8637 12 22.4241 12 24Z"
              stroke="#F04B4B"
              strokeWidth="1.81818"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6 15.6001L32.4 32.4001"
              stroke="#F04B4B"
              strokeWidth="1.81818"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4 className="aa-heading-04 mb-24 fw-semibold">Are your sure?</h4>
        <p className="aa-text-base fw-normal mb-0">
          Are you sure that you wish to unlock this <br /> record?
        </p>
      </Modal.Body>
      <Modal.Footer className="px-16 py-15 py-sm-24 gap-3">
        <CustomButton
          onClick={onHide}
          className="btn-outline-primary flex-grow-1 rounded-pill"
          type="button"
          text="Cancel"
        />
        <CustomButton
          className="btn-primary flex-grow-1 rounded-pill"
          type="button"
          text="Yes"
          onClick={handleUnlock}
          loading={loading}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default UnlockRecordModal;
