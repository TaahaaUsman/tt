import React, { useState } from "react";
import { Bell, Search, Setting } from "../../assets/Svgs/Svgs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import {
  mockNotifications,
  getPastHourNotificationCount,
} from "../../utils/notifications";

const DesktopTopbar = () => {
  const user = useSelector((state) => state.auth);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Calculate notifications from past hour
  const pastHourCount = getPastHourNotificationCount(notifications);

  const handleNotificationToggle = (e) => {
    e.preventDefault();
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationsChange = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  // Bell icon color: #042240 when open (sidebar active color), #153F68 when closed
  const bellColor = isNotificationOpen ? "#042240" : "#153F68";

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <h3 className="aa-heading-04 mb-0 text-primary fw-semibold">
        Good Morning, {user?.first_name} {user?.last_name}
      </h3>
      <div className="d-none d-lg-flex align-items-center gap-3">
        <div className="position-relative">
          <input
            type="search"
            name=""
            id=""
            className="form-control"
            placeholder="Search..."
          />
          <span className="position-absolute top-50 translate-middle-y ms-20">
            <Search color="#D0D5DD" />
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <Link
            to="#"
            onClick={handleNotificationToggle}
            className="setting-button px-17 py-10 h-auto w-auto aa-text-base fw-semibold text-decoration-none"
          >
            <span className="position-relative">
              {pastHourCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "#DC2626",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    minWidth: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "0 6px",
                    zIndex: 1,
                  }}
                >
                  {pastHourCount > 99 ? "99+" : pastHourCount}
                </span>
              )}
              <Bell color={bellColor} size={22} />
            </span>
          </Link>
          <NotificationDropdown
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            notifications={notifications}
            onNotificationsChange={handleNotificationsChange}
          />
        </div>
        <div>
          <Link
            to="#"
            className="setting-button px-17 py-10 h-auto w-auto aa-text-base fw-semibold text-decoration-none"
          >
            <Setting color="#153F68" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopTopbar;
