import React from 'react'
import DoctorNotesTable from './components/DoctorNotesTable'
import DoctorsNotesForm from './components/DoctorNotesForm'
import { hasPermission } from '../../helpers/hasPermission'
export default function DoctorNotes() {
  return (
    <div>
      {hasPermission(["doctor", "superadmin"]) && (
        <DoctorsNotesForm />
      )}
      <DoctorNotesTable />
    </div>
  )
}
