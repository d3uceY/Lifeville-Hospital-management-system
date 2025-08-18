export const getInitials = (str) => {
    return str.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}