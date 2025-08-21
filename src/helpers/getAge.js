export const getAge = (dob) => {
    if (!dob) return "N/A"
    const date = new Date(dob)
    const diffMs = Date.now() - date.getTime()
    const ageDate = new Date(diffMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return age
}

