/**
 * Returns whether the given `appointmentDateStr` matches the `filterWhen` criterion,
 * compared to a reference date (defaults to "today").
 *
 * @param {string}  appointmentDateStr — ISO timestamp, e.g. "2025-05-23T07:27:00.000Z"
 * @param {'upcoming'|'past'|'today'|'futureOrToday'} filterWhen
 * @param {Date | string} [referenceDate] — optional base date (e.g. "2025-05-23")
 * @returns {boolean}
 */
export function filterAppointmentByWhen(appointmentDateStr, filterWhen, referenceDate = new Date()) {
    const appt = new Date(appointmentDateStr);
    if (isNaN(appt)) {
      throw new Error(`Invalid appointment_date: "${appointmentDateStr}"`);
    }
  
    // Zero out time so comparisons happen at day-level (midnight UTC)
    const zeroTime = d => {
      const o = new Date(d);
      o.setHours(0, 0, 0, 0);
      return o.getTime();
    };
  
    const apptDay = zeroTime(appt);
    const refDay = typeof referenceDate === 'string'
      ? zeroTime(new Date(referenceDate))
      : zeroTime(referenceDate);
  
    switch (filterWhen) {
      case 'upcoming':
        return apptDay > refDay;
      case 'past':
        return apptDay < refDay;
      case 'today':
        return apptDay === refDay;
      case 'futureOrToday':
        return apptDay >= refDay;
      default:
        throw new Error(`Unsupported filterWhen: "${filterWhen}"`);
    }
  }
  