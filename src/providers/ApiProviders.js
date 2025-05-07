import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

/* ============================
   API Helper function here for PATIENTS
   ============================ */
export const registerPatient = async (patientData) => {
  const response = await axios.post(apiUrl + "/api/patients", patientData);
  return response;
};

export const getRegisteredPatients = async () => {
  const response = await axios.get(apiUrl + "/api/patients");
  return response.data;
};

export const viewRegisteredPatient = async (patientId) => {
  const response = await axios.get(apiUrl + "/api/patients/" + patientId);
  return response.data;
};

export const updateRegisteredPatient = async (patientId, patientData) => {
  const response = await axios.put(
    apiUrl + "/api/patients/" + patientId,
    patientData
  );
  return response.data;
};

export const deleteRegisteredPatient = async (patientId) => {
  const response = await axios.delete(apiUrl + "/api/patients/" + patientId);
  return response.data;
};

/* ============================
   API Helper function here for Vital Signs
   ============================ */
export const createVitalSign = async (vitalSignData) => {
  const response = await axios.post(apiUrl + "/api/vital-signs", vitalSignData);
  return response;
};

/* ============================
   API Helper function here for DOCTORS
   ============================ */
export const registerDoctor = async (doctorData) => {
  const response = await axios.post(apiUrl + "/api/doctors", doctorData);
  return response;
};

export const getDoctors = async () => {
  const response = await axios.get(apiUrl + "/api/doctors");
  return response.data;
};

export const viewDoctor = async (doctorId) => {
  const response = await axios.get(apiUrl + "/api/doctors/" + doctorId);
  return response.data;
};

export const deleteDoctor = async (doctorId) => {
  const response = await axios.delete(apiUrl + "/api/doctors/" + doctorId);
  return response.data;
};

export const updateDoctor = async (doctorData) => {
  const response = await axios.put(apiUrl + "/api/doctors/", doctorData);
  return response.data;
};

/* ============================
   API Helper function here for Appointments
   ============================ */
export const getAppointments = async () => {
  const response = await axios.get(apiUrl + "/api/appointments");
  return response.data;
};

export const viewAppointment = async (appointmentId) => {
  const response = await axios.get(
    apiUrl + "/api/appointments/" + appointmentId
  );
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await axios.post(
    apiUrl + "/api/appointments",
    appointmentData
  );
  return response.data;
};

export const updateAppointment = async (appointmentData, appointmentId) => {
  const response = await axios.put(
    apiUrl + "/api/appointments/" + appointmentId,
    appointmentData
  );
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await axios.put(
    apiUrl + "/api/appointments/" + appointmentId + "/status",
    { status }
  );
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await axios.delete(
    apiUrl + "/api/appointments/" + appointmentId
  );
  return response.data;
};

/* ============================
   API Helper function here for DEATHS
   ============================ */

export const getDeaths = async () => {
  const response = await axios.get(apiUrl + "/api/deaths");
  return response.data;
};

export const createDeath = async (deathData) => {
  const response = await axios.post(apiUrl + "/api/deaths", deathData);
  return response.data;
};

export const deleteDeath = async (deathId) => {
  const response = await axios.delete(apiUrl + "/api/deaths/" + deathId);
  return response.data;
};

export const updateDeathRecord = async (deathId, deathData) => {
  const response = await axios.put(
    apiUrl + "/api/deaths/" + deathId,
    deathData
  );
  return response.data;
};

/* ============================
   API Helper function here for BIRTHS
   ============================ */

export const getBirths = async () => {
  const response = await axios.get(apiUrl + "/api/births");
  return response.data;
};

export const createBirths = async (birthData) => {
  const response = await axios.post(apiUrl + "/api/births", birthData);
  return response.data;
};

export const deleteBirth = async (birthId) => {
  const response = await axios.delete(apiUrl + "/api/births/" + birthId);
  return response.data;
};

export const updateBirthRecord = async (birthId, birthData) => {
  const response = await axios.put(
    apiUrl + "/api/births/" + birthId,
    birthData
  );
  return response.data;
};

/* ============================
   API Helper function here for SYMPTOMS
   ============================ */

// SYMPTOM TYPES
export const getSymptomTypes = async () => {
  const response = await axios.get(apiUrl + "/api/symptom-types");
  return response.data;
};

export const createSymptomType = async (symptomTypeData) => {
  const response = await axios.post(
    apiUrl + "/api/symptom-types",
    symptomTypeData
  );
  return response.data;
};

export const updateSymptomType = async (symptomTypeId, symptomTypeData) => {
  const response = await axios.put(
    apiUrl + "/api/symptom-types/" + symptomTypeId,
    symptomTypeData
  );
  return response.data;
};

export const deleteSymptomType = async (symptomTypeId) => {
  const response = await axios.delete(
    apiUrl + "/api/symptom-types/" + symptomTypeId
  );
  return response.data;
};

// SYMPTOM HEADS
export const getSymptomHeads = async () => {
  const response = await axios.get(apiUrl + "/api/symptom-heads");
  return response.data;
};

export const createSymptomHead = async (symptomHeadData) => {
  const response = await axios.post(
    apiUrl + "/api/symptom-heads",
    symptomHeadData
  );
  return response.data;
};

export const updateSymptomHead = async (symptomHeadId, symptomHeadData) => {
  const response = await axios.put(
    apiUrl + "/api/symptom-heads/" + symptomHeadId,
    symptomHeadData
  );
  return response.data;
};

export const deleteSymptomHead = async (symptomHeadId) => {
  const response = await axios.delete(
    apiUrl + "/api/symptom-heads/" + symptomHeadId
  );
  return response.data;
};

/* ============================
   API Helper function here for INPATIENT ADMISSIONS
   ============================ */

export const getInpatientAdmissions = async () => {
  const response = await axios.get(`${apiUrl}/api/inpatients`);
  return response.data;
};

export const getInpatientAdmission = async (admissionId) => {
  const response = await axios.get(`${apiUrl}/api/inpatients/${admissionId}`);
  return response.data;
};

export const createInpatientAdmission = async (admissionData) => {
  const response = await axios.post(`${apiUrl}/api/inpatients`, admissionData);
  return response.data;
};

export const updateInpatientAdmission = async (admissionId, admissionData) => {
  const response = await axios.put(
    `${apiUrl}/api/inpatients/${admissionId}`,
    admissionData
  );
  return response.data;
};

export const deleteInpatientAdmission = async (admissionId) => {
  const response = await axios.delete(
    `${apiUrl}/api/inpatients/${admissionId}`
  );
  return response.data;
};
