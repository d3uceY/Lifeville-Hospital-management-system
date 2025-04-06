
//this formats date to yyyy-mm-dd for the input fields

export const formatForDateInput = (date) =>
  new Date(date).toISOString().split("T")[0];
