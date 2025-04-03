import { useContext, useState, useEffect } from "react";
import { getRegisteredPatients } from "./ApiProviders";
import React from "react";

/* ============================
   API context for patients
   ============================ */

const PatientContext = React.createContext() //*

export const usePatientData = () => {
    return useContext(PatientContext)
}


export function PatientContextProvider({ children }) {

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


    return (
        <PatientContext.Provider value={{ patientData, loading, refreshPatients: getPatients }}>
            {children}
        </PatientContext.Provider>
    )
}

//Deuce's notes

//React.createContext is a funtion so it has to look like this
//React.createContext() with parentheses