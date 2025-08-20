export const getAge = (dob) => {
    if (!dob) return "N/A"
    const dob = new Date(dob)
    const diffMs = Date.now() - dob.getTime()
    const ageDate = new Date(diffMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return age
}

