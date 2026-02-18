import React, { useState, useRef, useEffect } from "react";
import { mockNotifications } from "../../utils/notifications";

const NotificationDropdown = ({
  isOpen,
  onClose,
  notifications: externalNotifications,
  onNotificationsChange,
}) => {
  const [notifications, setNotifications] = useState(
    externalNotifications || mockNotifications
  );
  const [visibleCount, setVisibleCount] = useState(5);
  const dropdownRef = useRef(null);

  // Update local state when external notifications change
  useEffect(() => {
    if (externalNotifications) {
      setNotifications(externalNotifications);
    }
  }, [externalNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDelete = (id) => {
    // This will be handled by backend API later
    // For now, just remove from local state
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== id
    );
    setNotifications(updatedNotifications);
    // Notify parent component if callback provided
    if (onNotificationsChange) {
      onNotificationsChange(updatedNotifications);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, notifications.length));
  };

  const visibleNotifications = notifications.slice(0, visibleCount);
  const hasMore = visibleCount < notifications.length;

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="notification-dropdown"
      style={styles.dropdown}
    >
      <div style={styles.header}>
        <h5 className="aa-heading-05 fw-semibold mb-0">Notifications</h5>
        <p className="aa-text-xs fw-normal text-muted mb-0">
          Organize and maintain Companies.
        </p>
      </div>

      <div style={styles.notificationsList}>
        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                ...styles.notificationCard,
                ...(notification.isNew ? styles.notificationCardNew : {}),
              }}
            >
              <div style={styles.notificationContent}>
                <div style={styles.notificationHeader}>
                  <h6
                    style={{
                      ...styles.notificationTitle,
                      ...(notification.isNew
                        ? styles.notificationTitleNew
                        : {}),
                    }}
                  >
                    {notification.title}
                  </h6>
                  {notification.isNew && (
                    <span style={styles.newBadge}>New</span>
                  )}
                  {!notification.isNew && (
                    <span style={styles.dotIndicator}></span>
                  )}
                </div>
                <p
                  style={{
                    ...styles.notificationDescription,
                    ...(notification.isNew
                      ? styles.notificationDescriptionNew
                      : {}),
                  }}
                >
                  {notification.description}
                </p>
                <div style={styles.notificationFooter}>
                  <span
                    style={{
                      ...styles.timestamp,
                      ...(notification.isNew ? styles.timestampNew : {}),
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: "4px" }}
                    >
                      <path
                        d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7 12.6875C3.79063 12.6875 1.3125 10.2094 1.3125 7C1.3125 3.79063 3.79063 1.3125 7 1.3125C10.2094 1.3125 12.6875 3.79063 12.6875 7C12.6875 10.2094 10.2094 12.6875 7 12.6875Z"
                        fill={
                          notification.isNew
                            ? "rgba(255, 255, 255, 0.8)"
                            : "#6B7280"
                        }
                      />
                      <path
                        d="M7.4375 3.5H6.5625V7.4375H10.0625V6.5625H7.4375V3.5Z"
                        fill={
                          notification.isNew
                            ? "rgba(255, 255, 255, 0.8)"
                            : "#6B7280"
                        }
                      />
                    </svg>
                    {notification.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(notification.id)}
                style={{
                  ...styles.deleteButton,
                  ...(notification.isNew ? styles.deleteButtonNew : {}),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = notification.isNew
                    ? "rgba(255, 255, 255, 0.1)"
                    : "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                aria-label="Delete notification"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke={notification.isNew ? "#FFFFFF" : "#6B7280"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <p className="aa-text-sm text-muted">No notifications</p>
          </div>
        )}
      </div>

      {hasMore && (
        <div style={styles.footer}>
          <button
            onClick={handleSeeMore}
            style={styles.seeMoreButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F3F4F6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "8px",
    width: "420px",
    maxWidth: "90vw",
    background: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    border: "1px solid #E5E7EB",
    zIndex: 1050,
    maxHeight: "600px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #E5E7EB",
  },
  notificationsList: {
    overflowY: "auto",
    maxHeight: "450px",
    padding: "8px",
  },
  notificationCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "16px",
    marginBottom: "8px",
    background: "#FFFFFF",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    transition: "all 0.2s",
    cursor: "pointer",
  },
  notificationCardNew: {
    background: "#153F68",
    borderColor: "#153F68",
  },
  notificationContent: {
    flex: 1,
    marginRight: "12px",
  },
  notificationHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  notificationTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1F2937",
    margin: 0,
    flex: 1,
  },
  notificationTitleNew: {
    color: "#FFFFFF",
  },
  newBadge: {
    display: "inline-block",
    padding: "2px 8px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 500,
    color: "#FFFFFF",
  },
  dotIndicator: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#0D6EFD",
    flexShrink: 0,
  },
  notificationDescription: {
    fontSize: "13px",
    color: "#6B7280",
    margin: "0 0 8px 0",
    lineHeight: "1.5",
  },
  notificationDescriptionNew: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  notificationFooter: {
    display: "flex",
    alignItems: "center",
  },
  timestamp: {
    fontSize: "12px",
    color: "#6B7280",
    display: "flex",
    alignItems: "center",
  },
  timestampNew: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  deleteButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background 0.2s",
    flexShrink: 0,
  },
  deleteButtonNew: {
    color: "#FFFFFF",
  },
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
  },
  footer: {
    padding: "12px 20px",
    borderTop: "1px solid #E5E7EB",
    textAlign: "center",
  },
  seeMoreButton: {
    background: "transparent",
    border: "none",
    color: "#153F68",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
};

export default NotificationDropdown;
