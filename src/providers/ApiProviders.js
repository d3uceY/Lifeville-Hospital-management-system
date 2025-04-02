import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;



//PATIENT API ENDPOINTS
//this registers the patient as the data is passed as an argument
export const registerPatient = async (patientData) => {
  const response = await axios.post(
    apiUrl + "/api/patients",
    patientData
  );
  return response;
};

//this renders the registered patients
export const getRegisteredPatients = async () => {
  const response = await axios.get(apiUrl + "/api/patients");
  return response.data; 
};

export const viewRegisteredPatient = async (patientId) => {
  const response = await axios.get(
    apiUrl + "/api/patients/" + patientId
  );
  return response.data;
};




//VITAL SIGNS API ENDPOINTS
export const createVitalSign = async (vitalSignData) => {
  const response = await axios.post(
    apiUrl + "/api/vital-signs",
    vitalSignData
  );
  return response;
};
