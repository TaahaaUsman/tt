import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import GoBack from "../GoBack/GoBack"
// import UserInformationForm from "../../../../components/CreateNewUser/UserInformationForm";
// import UsernamePasswordForm from "../../../../components/CreateNewUser/UsernamePasswordForm";
// import UserRolesForm from "../../../../components/CreateNewUser/UserRolesForm";

import AddEncounterType from "./CreateNewEncounter/AddEncounterType";
import Measurements from "./CreateNewEncounter/Measurements";

const AddNewEncounter = () => {
  const [activeTab, setActiveTab] = useState("addEncounterType");
  return (
    <>
      <div className="sticky-section">
        <GoBack />
        <div className="mt-13 mb-15 mb-sm-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div class="page-title"><h3 class="aa-heading-04 fw-semibold mb-5">Add New Encounter</h3><p class="aa-text-xs fw-normal text-muted mb-0">Organize and maintain Encounter.</p></div>
        </div>
        <div className="overflow-x-auto w-100 mb-5 mb-sm-11 rounded-pill">
          <div className="modify-type-wrapper d-inline-block pb-10">
            <div className="tabs">
              <Nav variant="pills p-8">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "addEncounterType"}
                    onClick={() => setActiveTab("addEncounterType")}
                  >
                    Add Encounter Type
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "measurements"}
                    onClick={() => setActiveTab("measurements")}
                  >
                    Measurements
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      {activeTab === "addEncounterType" ? (
        <AddEncounterType />
      ) : (
        activeTab === "measurements" && <Measurements />
      )}
    </>
  );
};

export default AddNewEncounter;
