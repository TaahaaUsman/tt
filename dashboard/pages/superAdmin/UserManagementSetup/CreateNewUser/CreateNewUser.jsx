import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import GoBack from "../../../../components/GoBack/GoBack";
import UserInformationForm from "../../../../components/CreateNewUser/UserInformationForm";
import UsernamePasswordForm from "../../../../components/CreateNewUser/UsernamePasswordForm";
import UserRolesForm from "../../../../components/CreateNewUser/UserRolesForm";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser, createUser, updateUser } from "../../../../redux/features/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from '../../../../components/Loader/Loader';

const CreateNewUser = () => {
  const [activeTab, setActiveTab] = useState("userInformation");
  const { id } = useParams();
  const isUpdateMode = !!id;
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate(); // Added navigate here
  const [newUserData, setNewUserData] = useState({});
  
  useEffect(() => {console.log(newUserData)}, [setNewUserData])

  useEffect(() => {
    if (isUpdateMode && user) {
      setNewUserData(user);
    }
  }, [isUpdateMode, user]);

  useEffect(() => {
    if (isUpdateMode) {
      dispatch(fetchUsers(id));
    }
  }, [id, isUpdateMode, dispatch]);

  const pageTitle = isUpdateMode ? `Manage User: ${newUserData?.username || ""}` : "Create New User";

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      toast.success("User deleted successfully!");
      navigate('/user-management-setup');
    } catch (error) {
      toast.error(error.message || "Failed to delete user.");
    }
  };

  const handleNext = (tabName, data) => {
    setNewUserData((prevData) => ({ ...prevData, ...data }));
    setActiveTab(tabName);
  };

  const handleFinalSubmit = async (rolesData) => {
    const finalPayload = {
      ...newUserData.userInfo,
      ...newUserData.usernamePassword,
      roles: rolesData.roles,
      companies: newUserData.companies,
    };

    try {
      if (isUpdateMode) {
        await dispatch(updateUser({ id: id, data: finalPayload })).unwrap();
        toast.success("User updated successfully!");
      } else {
        await dispatch(createUser(finalPayload)).unwrap();
        toast.success("User created successfully!");
      }
      navigate('/user-management-setup');
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <>
      <div className="sticky-section">
        <GoBack />
        <div className="mt-13 mb-15 mb-sm-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="page-title">
            <h3 className="aa-heading-04 fw-semibold mb-0">
              {pageTitle}
            </h3>
          </div>
          <div className="">
            {isUpdateMode && (
              <button className="btn btn-outline-danger rounded-pill" onClick={handleDeleteUser}>Delete User</button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto w-100 mb-5 mb-sm-11 rounded-pill">
          <div className="modify-type-wrapper d-inline-block pb-10">
            <div className="tabs">
              <Nav variant="pills p-8">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "userInformation"}
                    onClick={() => setActiveTab("userInformation")}
                  >
                    User Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "userName_password"}
                    onClick={() => setActiveTab("userName_password")}
                  >
                    Username/Password
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "userRoles"}
                    onClick={() => setActiveTab("userRoles")}
                  >
                    User Roles
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-danger">Error: {error}</div>
      ) : (
        <>
          {activeTab === "userInformation" ? (
            <UserInformationForm
              ActiveTab={handleNext}
              setNewUserData={setNewUserData}
              isUpdateMode={isUpdateMode}
              userId={id}
            />
          ) : activeTab === "userName_password" ? (
            <UsernamePasswordForm
              ActiveTab={handleNext}
              setNewUserData={setNewUserData}
              isUpdateMode={isUpdateMode}
              userId={id}
            />
          ) : (
            activeTab === "userRoles" && (
              <UserRolesForm
                createUser={createUser}
                ActiveTab={handleNext}
                userData={newUserData}
                setNewUserData={setNewUserData}
                isUpdateMode={isUpdateMode}
                userId={id}
                finalSubmit={handleFinalSubmit}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default CreateNewUser;
