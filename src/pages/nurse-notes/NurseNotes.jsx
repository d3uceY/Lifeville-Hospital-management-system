import React from 'react'


import NurseNotesTable from './components/NurseNotesTable'
import NurseNotesForm from './components/NurseNotesForm'
import { hasPermission } from '../../helpers/hasPermission'
export default function NurseNotes() {
  return (
    <div>
      {hasPermission(["superadmin", "nurse"]) && (
        <NurseNotesForm />
      )}
      <NurseNotesTable />
    </div>
  )
}
