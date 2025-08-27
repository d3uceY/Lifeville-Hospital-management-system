
import { lazy } from 'react'
const DemographicCharts = lazy(() => import('./components/demograpic'))

export default function Overview() {
    return (
        <div>
            <DemographicCharts />
        </div>
    )
}
