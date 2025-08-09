import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
});


/* ============================
API Helper function here for PATIENTS
============================ */
export const registerPatient = async (patientData) => {
  const response = await api.post("/patients", patientData);
  return response;
};

export const getRegisteredPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

export const viewRegisteredPatient = async (patientId) => {
  const response = await api.get("/patients/" + patientId);
  return response.data;
};

export const updateRegisteredPatient = async (patientId, patientData) => {
  const response = await api.put(
    "/patients/" + patientId,
    patientData
  );
  return response.data;
};

export const deleteRegisteredPatient = async (patientId) => {
  const response = await api.delete("/patients/" + patientId);
  return response.data;
};

/* ============================
   API Helper function here for Vital Signs
   ============================ */
export const createVitalSign = async (vitalSignData) => {
  const response = await api.post("/vital-signs", vitalSignData);
  return response;
};

/* ============================
   API Helper function here for DOCTORS
   ============================ */
export const registerDoctor = async (doctorData) => {
  const response = await api.post("/doctors", doctorData);
  return response;
};

export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const viewDoctor = async (doctorId) => {
  const response = await api.get("/doctors/" + doctorId);
  return response.data;
};

export const deleteDoctor = async (doctorId) => {
  const response = await api.delete("/doctors/" + doctorId);
  return response.data;
};

export const updateDoctor = async (doctorData) => {
  const response = await api.put("/doctors/", doctorData);
  return response.data;
};

/* ============================
   API Helper function here for Appointments
   ============================ */
export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

export const viewAppointment = async (appointmentId) => {
  const response = await api.get(
    "/appointments/" + appointmentId
  );
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );
  return response.data;
};

export const updateAppointment = async (appointmentData, appointmentId) => {
  const response = await api.put(
    "/appointments/" + appointmentId,
    appointmentData
  );
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(
    "/appointments/" + appointmentId + "/status",
    { status }
  );
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await api.delete(
    "/appointments/" + appointmentId
  );
  return response.data;
};

/* ============================
   API Helper function here for DEATHS
   ============================ */

export const getDeaths = async () => {
  const response = await api.get("/deaths");
  return response.data;
};

export const createDeath = async (deathData) => {
  const response = await api.post("/deaths", deathData);
  return response.data;
};

export const deleteDeath = async (deathId) => {
  const response = await api.delete("/deaths/" + deathId);
  return response.data;
};

export const updateDeathRecord = async (deathId, deathData) => {
  const response = await api.put(
    "/deaths/" + deathId,
    deathData
  );
  return response.data;
};

/* ============================
   API Helper function here for BIRTHS
   ============================ */

export const getBirths = async () => {
  const response = await api.get("/births");
  return response.data;
};

export const createBirths = async (birthData) => {
  const response = await api.post("/births", birthData);
  return response.data;
};

export const deleteBirth = async (birthId) => {
  const response = await api.delete("/births/" + birthId);
  return response.data;
};

export const updateBirthRecord = async (birthId, birthData) => {
  const response = await api.put(
    "/births/" + birthId,
    birthData
  );
  return response.data;
};

/* ============================
   API Helper function here for SYMPTOMS
   ============================ */

// SYMPTOM TYPES
export const getSymptomTypes = async () => {
  const response = await api.get("/symptom-types");
  return response.data;
};

export const createSymptomType = async (symptomTypeData) => {
  const response = await api.post(
    "/symptom-types",
    symptomTypeData
  );
  return response.data;
};

export const updateSymptomType = async (symptomTypeId, symptomTypeData) => {
  const response = await api.put(
    "/symptom-types/" + symptomTypeId,
    symptomTypeData
  );
  return response.data;
};

export const deleteSymptomType = async (symptomTypeId) => {
  const response = await api.delete(
    "/symptom-types/" + symptomTypeId
  );
  return response.data;
};

// SYMPTOM HEADS
export const getSymptomHeads = async () => {
  const response = await api.get("/symptom-heads");
  return response.data;
};

export const createSymptomHead = async (symptomHeadData) => {
  const response = await api.post(
    "/symptom-heads",
    symptomHeadData
  );
  return response.data;
};

export const updateSymptomHead = async (symptomHeadId, symptomHeadData) => {
  const response = await api.put(
    "/symptom-heads/" + symptomHeadId,
    symptomHeadData
  );
  return response.data;
};

export const deleteSymptomHead = async (symptomHeadId) => {
  const response = await api.delete(
    "/symptom-heads/" + symptomHeadId
  );
  return response.data;
};


/* ============================
   API Helper function here for BED TYPES
   ============================ */

// BED TYPES
export const getBedTypes = async () => {
  const response = await api.get(`/bed-types`);
  return response.data;
};

export const createBedType = async (typeData) => {
  const response = await api.post(`/bed-types`, typeData);
  return response.data;
};

export const updateBedType = async (typeId, typeData) => {
  const response = await api.put(`/bed-types/${typeId}`, typeData);
  return response.data;
};

export const deleteBedType = async (typeId) => {
  const response = await api.delete(`/bed-types/${typeId}`);
  return response.data;
};

// BED GROUPS
export const getBedGroups = async () => {
  const response = await api.get(`/bed-groups`);
  return response.data;
};

export const createBedGroup = async (groupData) => {
  const response = await api.post(`/bed-groups`, groupData);
  return response.data;
};

export const updateBedGroup = async (groupId, groupData) => {
  const response = await api.put(
    `/bed-groups/${groupId}`,
    groupData
  );
  return response.data;
};

export const deleteBedGroup = async (groupId) => {
  const response = await api.delete(`/bed-groups/${groupId}`);
  return response.data;
};

// BEDS
export const getBeds = async () => {
  const response = await api.get(`/beds`);
  return response.data;
};

export const getBed = async (bedId) => {
  const response = await api.get(`/beds/${bedId}`);
  return response.data;
};

export const createBed = async (bedData) => {
  const response = await api.post(`/beds`, bedData);
  return response.data;
};

export const updateBed = async (bedId, bedData) => {
  const response = await api.put(`/beds/${bedId}`, bedData);
  return response.data;
};

export const deleteBed = async (bedId) => {
  const response = await api.delete(`/beds/${bedId}`);
  return response.data;
};


/* ============================
   API Helper function here for inpatient admissions
   ============================ */

export const getInpatients = async () => {
  const response = await api.get(`/inpatients`);
  return response.data;
};

export const getInpatient = async (inpatientId) => {
  const response = await api.get(`/inpatients/${inpatientId}`);
  return response.data;
};

export const createInpatient = async (inpatientData) => {
  const response = await api.post(`/inpatients`, inpatientData);
  return response.data;
};

export const updateInpatient = async (inpatientId, inpatientData) => {
  const response = await api.put(
    `/inpatients/${inpatientId}`,
    inpatientData
  );
  return response.data;
};

export const deleteInpatient = async (inpatientId) => {
  const response = await api.delete(`/inpatients/${inpatientId}`);
  return response.data;
};


/* ============================
API Helper function here for BILLS
============================ */

export const getBills = async (page = 1, pageSize = 20) => {
  const response = await api.get(`/bills?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const getBill = async (billId) => {
  const response = await api.get(`/bills/${billId}`);
  return response.data;
};

export const createBill = async (billData) => {
  const response = await api.post(`/bills`, billData);
  return response.data;
};

export const updateBill = async (billId, billData) => {
  const response = await api.put(
    `/bills/${billId}`,
    billData
  );
  return response.data;
};

export const deleteBill = async (billId) => {
  const response = await api.delete(`/bills/${billId}`);
  return response.data;
};
