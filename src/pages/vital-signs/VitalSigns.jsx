import React from 'react'
import ProfileVitalSignForm from './components/ProfileVitalSignForm'
import ProfileVitalSignsTable from './components/ProfileVitalSignsTable'
import { useParams } from 'react-router-dom'

export default function VitalSigns() {
    const { patient_id } = useParams()
  return (
    <div>
        <ProfileVitalSignForm />
        <ProfileVitalSignsTable patientId={patient_id} />
    </div>
  )
}
