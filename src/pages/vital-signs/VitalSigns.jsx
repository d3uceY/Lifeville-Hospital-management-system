import React from 'react'
import ProfileVitalSignForm from './components/ProfileVitalSignForm'
import ProfileVitalSignsTable from './components/ProfileVitalSignsTable'
import { useParams } from 'react-router-dom'
import ProfileFormHeader from '../../components/profile-form-header'
import { hasPermission } from '../../helpers/hasPermission'

export default function VitalSigns() {
  const { patient_id } = useParams()
  return (
    <div>
      <ProfileFormHeader title="Vital Signs" description={`Fill in the details to create a vital sign`} />
      {
        hasPermission(['superadmin', 'doctor', 'nurse']) &&
        <ProfileVitalSignForm />
      }
      <ProfileVitalSignsTable patientId={patient_id} />
    </div>
  )
}
