import React from 'react'
import PrescriptionTable from './components/PrescriptionTable'
import PrescriptionForm from './components/PrescriptionForm'
import ProfileFormHeader from '../../components/profile-form-header'
import { hasPermission } from '../../helpers/hasPermission'

export default function Prescriptions() {
    return (
        <>
            <ProfileFormHeader title="Prescription" description="Fill in the details to create a prescription" />
            {
                hasPermission(['doctor', 'superadmin']) &&
                <PrescriptionForm />
            }
            <PrescriptionTable />
        </>
    )
}
