import React, { useState } from "react";
import { useFormik } from "formik";
import CustomButton from "../customButton/CustomButton";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";

const UserRolesForm = ({
  ActiveTab,
  userData,
  isUpdateMode,
  userId,
  finalSubmit,
  createUser,
  updateUser,
  setNewUserData
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const roleMapping = {
    admin: "Administrator",
    healthCoach: "Health Educator Statistical",
  };

  const displayToInternalRole = Object.fromEntries(
    Object.entries(roleMapping).map(([key, value]) => [value, key])
  );

  const internalToDisplayRole = roleMapping;

  const [currentRoles, setCurrentRoles] = useState(
    userData?.roles?.map((role) => internalToDisplayRole[role] || role) || []
  );

  // ---------- Formik (only for final Save) ----------
  const formik = useFormik({
    initialValues: {
      roleSelect: "",
    },

    onSubmit: () => handleSave(),
  });

  const openDeleteModal = (role) => {
    setRoleToDelete(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    setCurrentRoles((prevRoles) => prevRoles.filter((r) => r !== roleToDelete));
    setDeleting(false);
    setShowDeleteModal(false);
    setRoleToDelete(null);
  };

  const handleSave = async () => {
    const internalRoles = currentRoles.map(
      (roleDisplay) => displayToInternalRole[roleDisplay]
    );

    finalSubmit({ roles: internalRoles });
  };

  const handleAddRole = (selectedRoleDisplay) => {
    const selectedRoleInternal = displayToInternalRole[selectedRoleDisplay];
    if (selectedRoleInternal && !currentRoles.includes(selectedRoleDisplay)) {
      setCurrentRoles((prevRoles) => [...prevRoles, selectedRoleDisplay]);
    }
  };

  // ---------- Render ----------
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* ---------- Card ---------- */}
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">User Roles</h5>
        </div>
        <div className="devider" />

        <div className="p-15 p-sm-24">
          {/* ----- Add Role ----- */}
          <div className="row align-items-end mb-24">
            <div className="col-12">
              <CustomSingleSelect
                 label="Add User Role"
                 name="roleSelect"
                 options={Object.values(roleMapping)}
                 placeholder="Add User Role"
                 formik={formik}
                 onChange={(e) => {
                   const selectedRoleDisplay = e.target.value;
                   formik.setFieldValue("roleSelect", selectedRoleDisplay);
                   handleAddRole(selectedRoleDisplay);
                 }}
               />
            </div>
          </div>

          {/* ----- Current Roles ----- */}
          <div className="">
            <h6 className="mb-5 aa-text-sm fw-semibold">Current Role</h6>
            {currentRoles.length > 0 ? (
              currentRoles.map((roleDisplay, index) => (
                <div
                  key={index}
                  className="d-flex flex-wrap gap-2 align-items-center mb-2"
                >
                  <div className="d-flex align-items-center justify-content-between gap-2 flex-grow-1">
                    <div
                      className="aa-text-base fw-medium"
                      style={{ color: "#3B3E40" }}
                    >
                      {roleDisplay}
                    </div>
                    <button
                      type="button"
                      className="btn btn-soft-danger rounded-pill ms-2"
                      onClick={() => openDeleteModal(roleDisplay)}
                    >
                      Delete user role
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No roles assigned.</p>
            )}
          </div>
        </div>
      </div>

      <div className="devider" />
      {/* ---------- Bottom Buttons ---------- */}
      <div className="d-flex justify-content-between mt-20">
        <CustomButton
          className="btn-outline-primary rounded-pill"
          text="Back"
          type="button"
          onClick={() => ActiveTab("userName_password")}
        />
        <CustomButton
          className="btn-primary rounded-pill"
          text="Save"
          type="submit"
          loading={formik.isSubmitting}
        />
      </div>

      {/* ---------- Delete Confirmation Modal ---------- */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        roleName={roleToDelete}
        isDeleting={deleting}
      />
    </form>
  );
};
export default UserRolesForm;
