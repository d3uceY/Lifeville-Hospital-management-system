export const formatToNaira = (amount) => {
    if (!amount) return "N/A"
    return `₦${Number.parseFloat(amount).toFixed(2)}`
}
