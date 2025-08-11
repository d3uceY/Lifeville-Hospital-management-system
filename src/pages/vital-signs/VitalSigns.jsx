import React from 'react'
import ProfileVitalSignDialog from './components/ProfileVitalSignDialog'
import ProfileVitalSignsTable from './components/ProfileVitalSignsTable'
import { useParams } from 'react-router-dom'

export default function VitalSigns() {
    const { patient_id } = useParams()
  return (
    <div>
        <ProfileVitalSignDialog />
        <ProfileVitalSignsTable patientId={patient_id} />
    </div>
  )
}
