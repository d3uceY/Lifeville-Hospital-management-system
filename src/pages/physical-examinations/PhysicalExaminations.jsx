import React from 'react'
import PhysicalExaminationsTable from './components/PhysicalExaminationsTable'
import ProfilePhysicalExaminationForm from './components/PhysicalExaminationsForm'
import ProfileFormHeader from '../../components/profile-form-header'
export default function PhysicalExaminations() {
    return (
        <div>
            <ProfileFormHeader title="Physical Examinations" description="Fill in the details to create a physical examination" />
            <ProfilePhysicalExaminationForm />
            <PhysicalExaminationsTable />
        </div>
    )
}
