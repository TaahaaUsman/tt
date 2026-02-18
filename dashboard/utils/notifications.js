/**
 * Utility function to check if a notification timestamp is within the past hour
 * @param {string} timestamp - Timestamp string like "5 min ago", "1 hour ago", etc.
 * @returns {boolean} - True if notification is within past hour
 */
export const isWithinPastHour = (timestamp) => {
  if (!timestamp) return false;

  // Parse timestamp string
  const lowerTimestamp = timestamp.toLowerCase();

  // Check for "min ago" or "minute ago" (within hour)
  if (
    lowerTimestamp.includes("min ago") ||
    lowerTimestamp.includes("minute ago")
  ) {
    const minutes = parseInt(lowerTimestamp);
    return !isNaN(minutes) && minutes < 60;
  }

  // Check for "hour ago" - if it says "1 hour ago" or less, it's within past hour
  if (lowerTimestamp.includes("hour ago")) {
    const hours = parseInt(lowerTimestamp);
    return !isNaN(hours) && hours <= 1;
  }

  // Anything else (2 hours ago, days ago, etc.) is not within past hour
  return false;
};

/**
 * Count notifications from the past hour
 * @param {Array} notifications - Array of notification objects
 * @returns {number} - Count of notifications from past hour
 */
export const getPastHourNotificationCount = (notifications) => {
  if (!Array.isArray(notifications)) return 0;
  return notifications.filter((notif) => isWithinPastHour(notif.timestamp))
    .length;
};

// Mock notifications data
export const mockNotifications = [
  {
    id: 1,
    title: "Great news! Your profile is now created.",
    description: "Now you can add participant and do their encounters",
    isNew: true,
    timestamp: "1 hour ago",
    type: "profile",
  },
  {
    id: 2,
    title: "New Encounter Created",
    description: "Encounter details have been updated",
    isNew: false,
    timestamp: "5 min ago",
    type: "encounter",
  },
  {
    id: 3,
    title: "New User added",
    description: "User details have been updated",
    isNew: false,
    timestamp: "5 min ago",
    type: "user",
  },
  {
    id: 4,
    title: "Great news! Your profile is now created.",
    description: "Now you can add participant and do their encounters",
    isNew: true,
    timestamp: "1 hour ago",
    type: "profile",
  },
  {
    id: 5,
    title: "New Encounter Created",
    description: "Encounter details have been updated",
    isNew: false,
    timestamp: "5 min ago",
    type: "encounter",
  },
  {
    id: 6,
    title: "Participant Added",
    description: "A new participant has been successfully added to the system",
    isNew: false,
    timestamp: "2 hours ago",
    type: "participant",
  },
  {
    id: 7,
    title: "Consent Statement Updated",
    description: "Consent statement information has been modified",
    isNew: true,
    timestamp: "30 min ago",
    type: "consent",
  },
  {
    id: 8,
    title: "Report Generated",
    description: "Your requested report is now available for download",
    isNew: false,
    timestamp: "3 hours ago",
    type: "report",
  },
  {
    id: 9,
    title: "Company Information Updated",
    description: "Company details have been successfully updated",
    isNew: false,
    timestamp: "1 day ago",
    type: "company",
  },
  {
    id: 10,
    title: "System Maintenance Scheduled",
    description: "Scheduled maintenance will occur tonight at 2 AM",
    isNew: false,
    timestamp: "2 days ago",
    type: "system",
  },
];
