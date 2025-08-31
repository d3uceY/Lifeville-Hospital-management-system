import React from 'react'
import ProfileFormHeader from '../../components/profile-form-header'
import PatientVisitForm from './components/PatientVisitForm'
import ProfilePatientVisitsTable from './components/ProfilePatientVisitsTable'

export default function ProfilePatientVisits() {
  return (
    <div>
      <ProfileFormHeader
        title="Record Patient Visit"
        description={`Fill in details to record a visit`}
      />
      <PatientVisitForm />
      <ProfilePatientVisitsTable />
    </div>
  )
}
