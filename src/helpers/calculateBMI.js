export const calculateBMI = (weight, height) => {
    if (!weight || !height) return "N/A"
    const bmi = weight / Math.pow(height, 2);
    return bmi.toFixed(2);
}