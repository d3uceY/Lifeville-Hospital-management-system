// Temperature
export function formatTemperature(temp) {
    if (temp == null) return "—";
    const color =
        temp < 36.1 || temp > 37.2
            ? "text-red-600 font-semibold"
            : "text-green-600 font-semibold";
    return { value: `${temp}°C`, color };
}

// Blood Pressure
export function formatBloodPressure(sys, dia) {
    if (sys == null || dia == null) return { value: "—", color: "text-gray-700" };

    const color =
        sys < 90 || sys > 120 || dia < 60 || dia > 80
            ? "text-red-600 font-semibold"
            : "text-green-600 font-semibold";

    return { value: `${sys}/${dia} mmHg`, color };
}

// Pulse
export function formatPulse(pulse) {
    if (pulse == null) return "—";
    const color =
        pulse < 60 || pulse > 100
            ? "text-red-600 font-semibold"
            : "text-green-600 font-semibold";
    return { value: `${pulse}`, color };
}

// SpO2
export function formatSpO2(spo2) {
    if (spo2 == null) return "—";
    let color = "text-green-600 font-semibold";
    if (spo2 < 90) color = "text-red-600 font-semibold";
    else if (spo2 < 95) color = "text-orange-500 font-semibold";
    return { value: `${spo2}%`, color };
}

// helpers/vitalSignFormatters.js
export function formatBMI(bmi) {
    if (bmi == null) return { value: "—", color: "text-gray-700" };

    let color = "text-green-600 font-semibold";
    if (bmi < 18.5) color = "text-orange-500 font-semibold"; // underweight
    else if (bmi >= 25 && bmi < 30) color = "text-orange-500 font-semibold"; // overweight
    else if (bmi >= 30) color = "text-red-600 font-semibold"; // obese

    return { value: `${bmi}`, color };
}
