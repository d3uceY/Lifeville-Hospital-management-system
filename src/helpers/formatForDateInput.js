
//this formats date to yyyy-mm-dd for the input fields

export const formatForDateInput = (date) => {
    if (!date) return "N/A"
    return new Date(date).toISOString().split("T")[0];
}
