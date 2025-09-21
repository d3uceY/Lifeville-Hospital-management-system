import React from 'react'
import VisitsTable from './components/VisitsTable'
import { GetTitle } from '../../helpers/getTitle'

export default function Visits() {
    return (
        <div className="lg:p-6">
            <GetTitle title="Visits" />
            <VisitsTable />
        </div>
    )
}
