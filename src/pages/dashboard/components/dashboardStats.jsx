import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, UserPlus, Activity, Bed, FlaskConical } from "lucide-react"


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
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard title="Total Patients" value="2,847" icon={Users} trend={{ value: 12, isPositive: true }} />
      <StatCard title="Appointments Today" value="156" icon={Calendar} trend={{ value: 8, isPositive: true }} />
      <StatCard title="Admissions" value="23" icon={UserPlus} trend={{ value: -2, isPositive: false }} />
      {/* <StatCard title="Available Beds" value="47" icon={Bed} trend={{ value: 5, isPositive: true }} /> */}
      <StatCard title="Lab Tests Pending" value="89" icon={FlaskConical} trend={{ value: -15, isPositive: false }} />
      {/* <StatCard title="Critical Patients" value="12" icon={Activity} trend={{ value: -3, isPositive: false }} /> */}
    </div>
  )
}
