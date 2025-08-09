export const formatToNaira = (amount) => {
    return `₦${Number.parseFloat(amount).toFixed(2)}`
}
