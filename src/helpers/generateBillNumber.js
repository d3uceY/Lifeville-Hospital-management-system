/**
 * Generates a bill number in the format:
 * BILL-YYYY-MM-DD-<random8chars>
 */
export function generateBillNumber() {
    // Current date in YYYY-MM-DD
    const datePart = new Date().toISOString().slice(0, 10);
  
    // Generate a UUID and take first segment for randomness
    const uuid = crypto.randomUUID();       // e.g., '5a1b2c3d-...'
    const randomPart = uuid.split('-')[0];  // e.g., '5a1b2c3d'
  
    return `BILL-${datePart}-${randomPart}`;
  }
  