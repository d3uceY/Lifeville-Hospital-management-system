import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SuspenseFallback from './components/loader/SuspenseFallback';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/auth/Login';
import { AuthProvider } from './providers/AuthContext';

// Context providers
import { AppDataProvider } from './providers/ApiContextProvider';
import { SocketContextProvider } from './providers/SocketContextProvider';

// Lazy-loaded components
const Page = lazy(() => import('./app/dashboard/page'));
const PatientProfileSidebar = lazy(() => import('./app/dashboard/patient-profile-sidebar'));
const Register = lazy(() => import('./pages/patient-management/Register'));
const Patients = lazy(() => import('./pages/patient-management/Patients'));
const Inpatients = lazy(() => import('./pages/patient-management/Inpatients'));
const AddInpatient = lazy(() => import('./pages/patient-management/AddInpatient'));
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const PatientProfile = lazy(() => import('./pages/patient-management/patientProfile'));
const UpcomingAppointments = lazy(() => import('./pages/appointments/Appointments'));
const Settings = lazy(() => import('./pages/settings/settings'));
const EditPatientProfile = lazy(() => import('./pages/patient-management/EditPatientProfile'));
const Deaths = lazy(() => import('./pages/birth-and-death/death'));
const Births = lazy(() => import('./pages/birth-and-death/birth'));
const SymptomTypes = lazy(() => import('./pages/symptoms/SymptomTypes'));
const SymptomHeads = lazy(() => import('./pages/symptoms/SymptomHeads'));
const Beds = lazy(() => import('./pages/beds/Beds'));
const BedGroup = lazy(() => import('./pages/beds/BedGroup'));
const BedType = lazy(() => import('./pages/beds/BedType'));
const AddBill = lazy(() => import('./pages/bills/AddBill'));
const Bills = lazy(() => import('./pages/bills/Bills'));
const LabTestTypes = lazy(() => import('./pages/lab-tests/LabTestTypes'));

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider>
        <Router>
          <AuthProvider>
            <AppDataProvider>
              <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Page />}>
                      <Route index element={<Overview />} />
                      <Route path="register" element={<Register />} />
                      <Route path="patients" element={<Patients />} />
                      <Route path="inpatients" element={<Inpatients />} />
                      <Route path="add-inpatient" element={<AddInpatient />} />
                      <Route path="patient-profile">
                        <Route element={<PatientProfileSidebar />}>
                          <Route path="full-profile/:patient_id" element={<PatientProfile />} />
                          <Route path="edit/:patient_id" element={<EditPatientProfile />} />
                        </Route>
                      </Route>
                      <Route path="births" element={<Births />} />
                      <Route path="deaths" element={<Deaths />} />
                      <Route path="appointments" element={<UpcomingAppointments />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="symptom-types" element={<SymptomTypes />} />
                      <Route path="symptom-heads" element={<SymptomHeads />} />
                      <Route path="beds" element={<Beds />} />
                      <Route path="bed-group" element={<BedGroup />} />
                      <Route path="bed-type" element={<BedType />} />
                      <Route path="add-bill" element={<AddBill />} />
                      <Route path="bills" element={<Bills />} />
                      <Route path="lab-test-types" element={<LabTestTypes />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </AppDataProvider>
          </AuthProvider>
        </Router>
      </SocketContextProvider>
    </QueryClientProvider>
  );
}

export default App;
