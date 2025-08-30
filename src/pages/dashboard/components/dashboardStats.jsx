import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, UserPlus, Activity, Bed, FlaskConical } from "lucide-react"
import { usePatientData, useOverviewStatistics } from "../../../providers/ApiContextProvider"


function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {/* {trend && (
          <p className={`text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? "+" : ""}
            {trend.value}% from last month
          </p>
        )} */}
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {

  const { patientData } = usePatientData();
  const {
    patientStatusDistribution,
    loadingPatientStatusDistribution,
    refreshPatientStatusDistribution,
    appointmentsToday,
    loadingAppointmentsToday,
    refreshAppointmentsToday,
    labTestPending,
    loadingLabTestPending,
    refreshLabTestPending,
  } = useOverviewStatistics();


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard title="Total Patients" value={patientData?.length} icon={Users} />
      <StatCard title="Appointments Today" value={appointmentsToday} icon={Calendar} />
      <StatCard title="Admissions" value={patientStatusDistribution?.[0]?.value} icon={UserPlus} />
      {/* <StatCard title="Available Beds" value="47" icon={Bed} trend={{ value: 5, isPositive: true }} /> */}
      <StatCard title="Lab Tests Pending" value={labTestPending} icon={FlaskConical} />
      {/* <StatCard title="Critical Patients" value="12" icon={Activity} trend={{ value: -3, isPositive: false }} /> */}
    </div>
  )
}
