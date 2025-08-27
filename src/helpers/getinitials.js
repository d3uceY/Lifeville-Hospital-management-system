export const getInitials = (str) => {
    if (!str) return "N/A"
    return str.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}