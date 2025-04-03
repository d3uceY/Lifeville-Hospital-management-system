import { useContext, useState, useEffect } from "react";
import { getRegisteredPatients, getDoctors } from "./ApiProviders";
import React from "react";

/* ============================
   API context for patients
   ============================ */
const PatientContext = React.createContext() //*

export const usePatientData = () => {
    return useContext(PatientContext)
}


/* ============================
   API context for doctors
   ============================ */
const DoctorContext = React.createContext() //*

export const useDoctorData = () => {
    return useContext(DoctorContext)
}




export function PatientContextProvider({ children }) {
    /* ============================
   Patients code block
   ============================ */
    const [patientData, setPatientData] = useState([])
    const [loading, setLoading] = useState(false)

    const getPatients = async () => {
        try {
            setLoading(true)
            const response = await getRegisteredPatients();
            setPatientData(response)
        } catch (err) {
            console.error(response, err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPatients();
    }, [])





    /* ============================
   Doctors code block
   ============================ */
    const [loadingDoctors, setLoadingDoctors] = useState(false)
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetchDoctors()
    }, [])

    const fetchDoctors = async () => {
        setLoadingDoctors(true)
        try {
            const response = await getDoctors()
            setDoctors(response)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoadingDoctors(false)
        }
    }


    return (
        <DoctorContext.Provider value={{ doctors, loadingDoctors, refreshDoctors: fetchDoctors }}>
            <PatientContext.Provider value={{ patientData, loading, refreshPatients: getPatients }}>
                {children}
            </PatientContext.Provider>
        </DoctorContext.Provider>
    )
}

//Deuce's notes

//React.createContext is a funtion so it has to look like this
//React.createContext() with parentheses