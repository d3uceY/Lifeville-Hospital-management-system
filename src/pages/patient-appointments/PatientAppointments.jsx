import React from 'react'
import PatientAppointmentForm from './components/PatientAppointmentForm'
import PatientAppointmentsTable from './components/PatientAppointmentsTable'
import ProfileFormHeader from '../../components/profile-form-header'

export default function PatientAppointments() {
  return (
    <div>
        <ProfileFormHeader title="Patient Appointments" description="Manage patient appointments" />
        <PatientAppointmentForm />
        <PatientAppointmentsTable />
    </div>
  )
}
