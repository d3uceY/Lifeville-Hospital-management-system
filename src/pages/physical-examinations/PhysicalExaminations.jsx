import React from 'react'
import PhysicalExaminationsTable from './components/PhysicalExaminationsTable'
import ProfilePhysicalExaminationForm from './components/PhysicalExaminationsForm'

export default function PhysicalExaminations() {
    return (
        <div>
            <ProfilePhysicalExaminationForm />
            <PhysicalExaminationsTable />
        </div>
    )
}
