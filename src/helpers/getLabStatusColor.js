

export const getStatusColor = (status) => {
    if (!status) return "text-gray-600"
    const colors = {
        to_do: "text-yellow-600",
        in_progress: "text-blue-600",
        done: "text-green-600",
        failed: "text-red-600",
    }
    return colors[status] || "text-gray-600"
}
