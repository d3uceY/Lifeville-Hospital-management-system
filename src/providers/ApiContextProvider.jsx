'use client';
import React, { createContext, useContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getRegisteredPatients,
  getDoctors,
  getAppointments,
  getDeaths,
  getBirths,
  getSymptomTypes,
  getSymptomHeads,
  getInpatients,
  getBeds,
  getBedGroups,
  getBedTypes,
} from './ApiProviders';

// Context definitions
const PatientContext = createContext(null);
const DoctorContext = createContext(null);
const AppointmentsContext = createContext(null);
const BirthAndDeaths = createContext(null);
const SymptomTypes = createContext(null);
const SymptomHeads = createContext(null);
const InpatientAdmissions = createContext(null);
const Beds = createContext(null);

// Exported hooks
export const usePatientData = () => useContext(PatientContext);
export const useDoctorData = () => useContext(DoctorContext);
export const useAppointmentsData = () => useContext(AppointmentsContext);
export const useBirthAndDeaths = () => useContext(BirthAndDeaths);
export const useSymptomTypes = () => useContext(SymptomTypes);
export const useSymptomHeads = () => useContext(SymptomHeads);
export const useInpatientAdmissions = () => useContext(InpatientAdmissions);
export const useBeds = () => useContext(Beds);

// Main provider component
export function AppDataProvider({ children }) {
  const patientsQ = useQuery({ queryKey: ['patients'], queryFn: getRegisteredPatients });
  const doctorsQ = useQuery({ queryKey: ['doctors'], queryFn: getDoctors });
  const appointmentsQ = useQuery({ queryKey: ['appointments'], queryFn: getAppointments });
  const deathsQ = useQuery({ queryKey: ['deaths'], queryFn: getDeaths });
  const birthsQ = useQuery({ queryKey: ['births'], queryFn: getBirths });
  const symptomTypesQ = useQuery({ queryKey: ['symptomTypes'], queryFn: getSymptomTypes });
  const symptomHeadsQ = useQuery({ queryKey: ['symptomHeads'], queryFn: getSymptomHeads });
  const inpatientsQ = useQuery({ queryKey: ['inpatients'], queryFn: getInpatients });
  const bedsQ = useQuery({ queryKey: ['beds'], queryFn: getBeds });
  const bedGroupsQ = useQuery({ queryKey: ['bedGroups'], queryFn: getBedGroups });
  const bedTypesQ = useQuery({ queryKey: ['bedTypes'], queryFn: getBedTypes });

  return (
    <AppointmentsContext.Provider value={{
      appointments: appointmentsQ.data ?? [],
      loadingAppointments: appointmentsQ.isLoading,
      refreshAppointments: appointmentsQ.refetch,
    }}>
      <DoctorContext.Provider value={{
        doctors: doctorsQ.data ?? [],
        loadingDoctors: doctorsQ.isLoading,
        refreshDoctors: doctorsQ.refetch,
      }}>
        <BirthAndDeaths.Provider value={{
          deaths: deathsQ.data ?? [],
          loadingDeaths: deathsQ.isLoading,
          refreshDeaths: deathsQ.refetch,
          births: birthsQ.data ?? [],
          loadingBirths: birthsQ.isLoading,
          refreshBirths: birthsQ.refetch,
        }}>
          <PatientContext.Provider value={{
            patientData: patientsQ.data ?? [],
            loading: patientsQ.isLoading,
            refreshPatients: patientsQ.refetch,
          }}>
            <SymptomTypes.Provider value={{
              symptomTypes: symptomTypesQ.data ?? [],
              loadingSymptomTypes: symptomTypesQ.isLoading,
              refreshSymptomTypes: symptomTypesQ.refetch,
            }}>
              <SymptomHeads.Provider value={{
                symptomHeads: symptomHeadsQ.data ?? [],
                loadingSymptomHeads: symptomHeadsQ.isLoading,
                refreshSymptomHeads: symptomHeadsQ.refetch,
              }}>
                <InpatientAdmissions.Provider value={{
                  inpatientAdmissions: inpatientsQ.data ?? [],
                  loadingInpatientAdmissions: inpatientsQ.isLoading,
                  refreshInpatientAdmissions: inpatientsQ.refetch,
                }}>
                  <Beds.Provider value={{
                    beds: bedsQ.data ?? [],
                    loadingBeds: bedsQ.isLoading,
                    refreshBeds: bedsQ.refetch,
                    bedGroups: bedGroupsQ.data ?? [],
                    loadingBedGroups: bedGroupsQ.isLoading,
                    refreshBedGroups: bedGroupsQ.refetch,
                    bedTypes: bedTypesQ.data ?? [],
                    loadingBedTypes: bedTypesQ.isLoading,
                    refreshBedTypes: bedTypesQ.refetch,
                  }}>
                    {children}
                  </Beds.Provider>
                </InpatientAdmissions.Provider>
              </SymptomHeads.Provider>
            </SymptomTypes.Provider>
          </PatientContext.Provider>
        </BirthAndDeaths.Provider>
      </DoctorContext.Provider>
    </AppointmentsContext.Provider>
  );
}

// Root-level wrapper
const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppDataProvider>{children}</AppDataProvider>
    </QueryClientProvider>
  );
}
