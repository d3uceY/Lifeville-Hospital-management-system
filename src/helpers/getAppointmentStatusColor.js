
/**
 * 
 * @param {string} status - appointment status 
 * @returns {string} color - tailwind classes
 */
export const getAppointmentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "scheduled":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "confirmed":
            return "bg-green-100 text-green-800 border-green-200"
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "completed":
            return "bg-purple-100 text-purple-800 border-purple-200"
        case "canceled":
            return "bg-red-100 text-red-800 border-red-200"
        default:
            return "bg-blue-100 text-blue-800 border-blue-200"
    }
}
