import { useContext, useState, useEffect } from "react";
import { getRegisteredPatients, getDoctors, getAppointments } from "./ApiProviders";
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

/* ============================
   API context for Appointments
   ============================ */
const AppointmentsContext = React.createContext()

export const useAppointmentsData = () => {
    return useContext(AppointmentsContext)
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
            console.error(err)
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

    const fetchDoctors = async () => {
        setLoadingDoctors(true)
        try {
            const response = await getDoctors()
            setDoctors(response)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoadingDoctors(false)
        }
    }
    useEffect(() => {
        fetchDoctors()
    }, [])



    /* ============================
   Appointments code block
   ============================ */
    const [loadingAppointments, setLoadingAppointments] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        setLoadingAppointments(true)
        try {
            const response = await getAppointments()
            setAppointments(response)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoadingAppointments(false)
        }
    }
    useEffect(() => {
        fetchAppointments();
    }, [])



    return (
        <AppointmentsContext.Provider value={{ appointments, loadingAppointments, refreshAppointments: fetchAppointments }}>
            <DoctorContext.Provider value={{ doctors, loadingDoctors, refreshDoctors: fetchDoctors }}>
                <PatientContext.Provider value={{ patientData, loading, refreshPatients: getPatients }}>
                    {children}
                </PatientContext.Provider>
            </DoctorContext.Provider>
        </AppointmentsContext.Provider>
    )
}

//Deuce's notes

//React.createContext is a funtion so it has to look like this
//React.createContext() with parentheses