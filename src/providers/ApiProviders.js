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
