import React from 'react'
import ProfileFormHeader from '../../components/profile-form-header'
import AddAdmissionForm from './components/AddAdmissionForm'
import AdmissionTable from './components/AdmissionTable'

export default function Admissions() {
  return (
    <div>
        <ProfileFormHeader title="Admissions" description="Add new admission"/>
        <AddAdmissionForm />
        <AdmissionTable />
    </div>
  )
}
