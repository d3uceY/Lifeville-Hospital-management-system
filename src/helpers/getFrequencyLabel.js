export function getFrequencyLabel(value) {
    switch (value) {
      case "once_daily":
        return "Once daily (OD)";
      case "twice_daily":
        return "Twice daily (BD)";
      case "three_times_daily":
        return "Three times daily (TDS)";
      case "four_times_daily":
        return "Four times daily (QID)";
      case "q6h":
        return "Every 6 hours";
      case "q8h":
        return "Every 8 hours";
      case "q12h":
        return "Every 12 hours";
      case "weekly":
        return "Once weekly";
      case "prn":
        return "PRN (as needed)";
      case "stat":
        return "STAT (immediately)";
      default:
        return "Unknown frequency";
    }
  }
  