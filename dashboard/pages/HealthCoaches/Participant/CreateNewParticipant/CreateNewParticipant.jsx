import React, { useState } from "react";
import GoBack from "../../../../components/GoBack/GoBack";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AddParticipantStepForm from "../../../../components/StepForm/AddParticipantStepForm";
import ParticipantForm from "../../../../components/AddParticipantForm/AddParticipantForm";
import SelectLoaction from "../../../../components/SelectLoaction/SelectLoaction";
import WorkStatus from "../../../../components/WorkStatus/WorkStatus";

const CreateNewParticipant = () => {
  const [activeTab, setActiveTab] = useState("participant");
  return (
    <div>
      <div className="sticky-section">
        <GoBack />

        <div className="mt-13 mb-15 mb-sm-27 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="page-title">
            <h3 className="aa-heading-04 fw-semibold mb-5">
              Create a New Participants
            </h3>
            <p className="aa-text-xxs fw-normal mb-0 text-muted">
              Add New Participant.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto w-100 mb-15 mb-sm-21 rounded-pill">
          <div className="modify-type-wrapper d-inline-block">
            <div className="tabs">
              <Nav variant="pills p-8">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "participant"}
                    onClick={() => setActiveTab("participant")}
                  >
                    Participant Detail
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "workLoaction"}
                    onClick={() => setActiveTab("workLoaction")}
                  >
                    Work Loaction
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "workStatus"}
                    onClick={() => setActiveTab("workStatus")}
                  >
                    Work Status
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      {activeTab === "participant" ? (
        <ParticipantForm activeTab={setActiveTab} />
      ) : activeTab === "workLoaction" ? (
        <SelectLoaction activeTab={setActiveTab} />
      ) : (
        activeTab === "workStatus" && <WorkStatus />
      )}
    </div>
  );
};

export default CreateNewParticipant;
