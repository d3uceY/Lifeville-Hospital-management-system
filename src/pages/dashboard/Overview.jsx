
import { lazy } from 'react'
import { DashboardStats } from './components/dashboardStats'
import { DashboardCharts } from './components/dashboardCharts'
const DemographicCharts = lazy(() => import('./components/demograpic'))

export default function Overview() {
    return (
        <div>
            <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Key Statistics</h2>
            <DashboardStats />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Analytics & Reports</h2>
            <DashboardCharts />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Demographic</h2>
            <DemographicCharts />
          </div>
        </div>
        </div>
    )
}
