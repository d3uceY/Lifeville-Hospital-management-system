import { useContext, useState, useEffect } from "react";
import { getRegisteredPatients, getDoctors, getAppointments, getDeaths, getBirths, getSymptomTypes } from "./ApiProviders";
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


/* ============================
   API context for Birth and Deaths
   ============================ */
const BirthAndDeaths = React.createContext()

export const useBirthAndDeaths = () => {
    return useContext(BirthAndDeaths)
}


/* ============================
   API context for Symptom Types
   ============================ */
const SymptomTypes = React.createContext()

export const useSymptomTypes = () => {
    return useContext(SymptomTypes)
}







export function PatientContextProvider({ children }) {


    /* ============================
   Patients custom hook
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
   Doctors custom hook
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
   Appointments custom hook
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


    /* ============================
   Deaths and Births custom hook
   ============================ */
    const [loadingDeaths, setIsLoadingDeaths] = useState(false);
    const [loadingBirths, setIsLoadingBirths] = useState(false);
    const [deaths, setDeaths] = useState([]);
    const [births, setBirths] = useState([]);

    const fetchDeaths = async () => {
        try {
            setIsLoadingDeaths(true)
            const response = await getDeaths()
            // console.log(response)
            setDeaths(response)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingDeaths(false)
        }
    }

    const fetchBirths = async () => {
        try {
            setIsLoadingBirths(true)
            const response = await getBirths()
            // console.log(response)
            setBirths(response)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingBirths(false)
        }
    }

    useEffect(() => {
        fetchDeaths();
        fetchBirths();
    }, [])

    /* ============================
  Symptom Types custom hook
  ============================ */
    const [loadingSymptomTypes, setIsLoadingSymptomTypes] = useState(false);
    const [symptomTypes, setSymptomTypes] = useState([]);

    const fetchSymptomTypes = async () => {
        try {
            setIsLoadingSymptomTypes(true)
            const response = await getSymptomTypes()
            setSymptomTypes(response)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingSymptomTypes(false)
        }
    }

    useEffect(() => {
        fetchSymptomTypes();
    }, [])

    /* ============================
   API context providers
   ============================ */
    return (
        <AppointmentsContext.Provider value={{ appointments, loadingAppointments, refreshAppointments: fetchAppointments }}>
            <DoctorContext.Provider value={{ doctors, loadingDoctors, refreshDoctors: fetchDoctors }}>
                <BirthAndDeaths.Provider value={{ deaths, loadingDeaths, refreshDeaths: fetchDeaths, births, loadingBirths, refreshBirths: fetchBirths }}>
                    <PatientContext.Provider value={{ patientData, loading, refreshPatients: getPatients }}>
                        <SymptomTypes.Provider value={{ symptomTypes, loadingSymptomTypes, refreshSymptomTypes: fetchSymptomTypes }}>
                            {children}
                        </SymptomTypes.Provider>
                    </PatientContext.Provider>
                </BirthAndDeaths.Provider>
            </DoctorContext.Provider>
        </AppointmentsContext.Provider>
    )
}

