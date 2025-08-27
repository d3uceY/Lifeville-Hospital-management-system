export const formatDateForDateTimeLocal = (isoString) => {
    if (!isoString) return "N/A"
    // Parse into Date object (converts to local timezone)
    const date = new Date(isoString);
    // Format components with leading zeros
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // For datetime-local input (without seconds)
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  
  return formattedDate;
};
