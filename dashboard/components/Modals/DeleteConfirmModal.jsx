import React from "react";
import { Modal, Button } from "react-bootstrap";
import { TrashIcon } from "../../assets/Svgs/Svgs";
import CustomButton from "../customButton/CustomButton";

const DeleteConfirmModal = ({ show, onHide, onConfirm, isDeleting }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Body className="text-center p-15 p-sm-32">
        <span>
          <TrashIcon color="#F12F1F" />
        </span>
        <h5
          className="aa-heading-04 fw-semibold mt-15 mt-sm-32"
          style={{ color: "#3B3E40" }}
        >
          Are your sure?
        </h5>
        <p className="aa-text-base fw-medium" style={{ color: "#5D5F62" }}>
          Are you sure you want to delete the role
        </p>
      </Modal.Body>
      <Modal.Footer className="px-15 px-sm-24 py-16 gap-2">
        <button
          type="button"
          className="btn btn-outline-light text-primary flex-grow-1 rounded-pill border"
          onClick={onHide}
          disabled={isDeleting}
        >
          No
        </button>
        <CustomButton
          className="btn-primary rounded-pill flex-grow-1"
          onClick={onConfirm}
          loading={isDeleting}
          text="Yes"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
