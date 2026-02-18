import React from "react";
import { Modal } from "react-bootstrap";
import { LockIcon } from "../../assets/Svgs/Svgs";
import CustomButton from "../customButton/CustomButton";

const PasswordSuccessfullSave = ({ show, onHide, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Body className="m-15 m-sm-32 text-center">
        <div className="d-flex justify-content-center mb-15 mb-sm-32">
          <LockIcon color="#153F68" />
        </div>
        <h4
          className="mb-15 mb-sm-24 aa-heading-04 fw-semibold"
          style={{ color: "#3B3E40" }}
        >
          Password Saved
        </h4>
        <p className="mb-0 text-muted aa-text-base fw-normal">
          Password has been saved successfully
        </p>
      </Modal.Body>
      <Modal.Footer className="py-16 px-15 px-sm-24">
        <CustomButton
          className="btn-primary rounded-pill w-100"
          text="Continue"
          onClick={onHide}
          type="button"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordSuccessfullSave;
