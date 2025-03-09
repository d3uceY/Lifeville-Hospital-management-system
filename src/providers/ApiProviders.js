import axios from "axios";




//this registers the patient as the data is passed as an argument
export const registerPatient = async (patientData) => {
  const response = await axios.post(
    "http://localhost:3000/api/patients",
    patientData
  );
  return response;
};

//this renders the registered patients
export const getRegisteredPatients = async () => {
  const response = await axios.get("http://localhost:3000/api/patients");
  return response.data;
};
