import axios from "axios";

export const registerPatient = async (patientData) => {
  const response = await axios.post(
    "http://localhost:3000/api/patients",
    patientData
  );
  return response;
};
