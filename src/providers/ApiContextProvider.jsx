' ';
import React, { createContext, useContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getRegisteredPatients,
  getDoctors,
  getDeaths,
  getBirths,
  getSymptomTypes,
  getSymptomHeads,
  getInpatients,
  getBeds,
  getBedGroups,
  getBedTypes,
  getLabTestTypes,
  getPatientStatusDistribution,
  getStaffRolesDistribution,
  getAppointmentStatusDistribution,
  getAppointmensToday,
  getLabTestPending,
  getConditions,
} from './ApiProviders';
import { useAuth } from './AuthContext';

// Context definitions
const PatientContext = createContext(null);
const DoctorContext = createContext(null);
const BirthAndDeaths = createContext(null);
const SymptomTypes = createContext(null);
const SymptomHeads = createContext(null);
const InpatientAdmissions = createContext(null);
const Beds = createContext(null);
const LabTests = createContext(null);
const OverviewStatistics = createContext(null);
const Conditions = createContext(null);

// Exported hooks
export const usePatientData = () => useContext(PatientContext);
export const useDoctorData = () => useContext(DoctorContext);
export const useBirthAndDeaths = () => useContext(BirthAndDeaths);
export const useSymptomTypes = () => useContext(SymptomTypes);
export const useSymptomHeads = () => useContext(SymptomHeads);
export const useInpatientAdmissions = () => useContext(InpatientAdmissions);
export const useBeds = () => useContext(Beds);
export const useLabTests = () => useContext(LabTests);
export const useOverviewStatistics = () => useContext(OverviewStatistics);
export const useConditions = () => useContext(Conditions);

// Main provider component
export function AppDataProvider({ children }) {
  const { accessToken } = useAuth();

  //Overview Statistics
  const patientStatusDistributionQ = useQuery({
    queryKey: ['patientStatusDistribution'],
    queryFn: () => getPatientStatusDistribution(accessToken),
    enabled: !!accessToken,
  });

  const staffRolesDistributionQ = useQuery({
    queryKey: ['staffRolesDistribution'],
    queryFn: () => getStaffRolesDistribution(accessToken),
    enabled: !!accessToken,
  });

  const appointmentStatusDistributionQ = useQuery({
    queryKey: ['appointmentStatusDistribution'],
    queryFn: () => getAppointmentStatusDistribution(accessToken),
    enabled: !!accessToken,
  });

  const appointmentsTodayQ = useQuery({
    queryKey: ['appointmentsToday'],
    queryFn: () => getAppointmensToday(accessToken),
    enabled: !!accessToken,
  });

  const labTestPendingQ = useQuery({
    queryKey: ['labTestPending'],
    queryFn: () => getLabTestPending(accessToken),
    enabled: !!accessToken,
  });


  //Patients
  const patientsQ = useQuery({
    queryKey: ['patients'],
    queryFn: () => getRegisteredPatients(accessToken),
    enabled: !!accessToken,
  });

  const doctorsQ = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctors(accessToken),
    enabled: !!accessToken,
  });

  const deathsQ = useQuery({
    queryKey: ['deaths'],
    queryFn: () => getDeaths(accessToken),
    enabled: !!accessToken,
  });

  const birthsQ = useQuery({
    queryKey: ['births'],
    queryFn: () => getBirths(accessToken),
    enabled: !!accessToken,
  });

  const symptomTypesQ = useQuery({
    queryKey: ['symptomTypes'],
    queryFn: getSymptomTypes,
    enabled: !!accessToken,
  });

  const symptomHeadsQ = useQuery({
    queryKey: ['symptomHeads'],
    queryFn: getSymptomHeads,
    enabled: !!accessToken,
  });

  const inpatientsQ = useQuery({
    queryKey: ['inpatients'],
    queryFn: () => getInpatients(accessToken),
    enabled: !!accessToken,
  });

  const bedsQ = useQuery({
    queryKey: ['beds'],
    queryFn: getBeds,
    enabled: !!accessToken,
  });

  const bedGroupsQ = useQuery({
    queryKey: ['bedGroups'],
    queryFn: getBedGroups,
    enabled: !!accessToken,
  });

  const bedTypesQ = useQuery({
    queryKey: ['bedTypes'],
    queryFn: getBedTypes,
    enabled: !!accessToken,
  });

  const labTestTypesQ = useQuery({
    queryKey: ['labTestTypes'],
    queryFn: getLabTestTypes,
    enabled: !!accessToken,
  });

  const conditionsQ = useQuery({
    queryKey: ['conditions'],
    queryFn: getConditions,
    enabled: !!accessToken,
  });


  return (
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
                  <LabTests.Provider value={{
                    labTestTypes: labTestTypesQ.data ?? [],
                    loadingLabTestTypes: labTestTypesQ.isLoading,
                    refreshLabTestTypes: labTestTypesQ.refetch,
                  }}>
                    <OverviewStatistics.Provider value={{
                      patientStatusDistribution: patientStatusDistributionQ.data ?? [],
                      loadingPatientStatusDistribution: patientStatusDistributionQ.isLoading,
                      refreshPatientStatusDistribution: patientStatusDistributionQ.refetch,
                      staffRolesDistribution: staffRolesDistributionQ.data ?? [],
                      loadingStaffRolesDistribution: staffRolesDistributionQ.isLoading,
                      refreshStaffRolesDistribution: staffRolesDistributionQ.refetch,
                      appointmentStatusDistribution: appointmentStatusDistributionQ.data ?? [],
                      loadingAppointmentStatusDistribution: appointmentStatusDistributionQ.isLoading,
                      refreshAppointmentStatusDistribution: appointmentStatusDistributionQ.refetch,
                      appointmentsToday: appointmentsTodayQ.data ?? [],
                      loadingAppointmentsToday: appointmentsTodayQ.isLoading,
                      refreshAppointmentsToday: appointmentsTodayQ.refetch,
                      labTestPending: labTestPendingQ.data ?? [],
                      loadingLabTestPending: labTestPendingQ.isLoading,
                      refreshLabTestPending: labTestPendingQ.refetch,
                    }}>
                      <Conditions.Provider value={{
                        conditions: conditionsQ.data ?? [],
                        loadingConditions: conditionsQ.isLoading,
                        refreshConditions: conditionsQ.refetch,
                      }}>
                        {children}
                      </Conditions.Provider>
                    </OverviewStatistics.Provider>
                  </LabTests.Provider>
                </Beds.Provider>
              </InpatientAdmissions.Provider>
            </SymptomHeads.Provider>
          </SymptomTypes.Provider>
        </PatientContext.Provider>
      </BirthAndDeaths.Provider>
    </DoctorContext.Provider>
  );
}


const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppDataProvider>{children}</AppDataProvider>
    </QueryClientProvider>
  );
}
