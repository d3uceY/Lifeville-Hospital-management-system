import axios from "axios";

const registerPatient = async (patientData) => {
  const response = await axios.post(`http://localhost:3000/api/patients`);
  return response;
};
