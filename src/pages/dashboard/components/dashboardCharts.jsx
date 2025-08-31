import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useOverviewStatistics } from "../../../providers/ApiContextProvider"
import ChartSkeleton from "./chartSkeleton"

const monthlyAdmissionsData = [
    { month: "Jan", admissions: 145, discharges: 132 },
    { month: "Feb", admissions: 167, discharges: 154 },
    { month: "Mar", admissions: 189, discharges: 178 },
    { month: "Apr", admissions: 203, discharges: 195 },
    { month: "May", admissions: 234, discharges: 221 },
    { month: "Jun", admissions: 256, discharges: 243 },
]

const departmentUtilizationData = [
    { department: "Emergency", utilization: 85, capacity: 100 },
    { department: "ICU", utilization: 92, capacity: 100 },
    { department: "Surgery", utilization: 78, capacity: 100 },
    { department: "Pediatrics", utilization: 65, capacity: 100 },
    { department: "Cardiology", utilization: 88, capacity: 100 },
    { department: "Orthopedics", utilization: 72, capacity: 100 },
]

const chartConfig = {
    "Scheduled": { label: "Scheduled", color: "var(--color-chart-1)" },
    "Completed": { label: "Completed", color: "var(--color-chart-2)" },
    "Canceled": { label: "Canceled", color: "var(--color-chart-1)" },
    "Confirmed": { label: "Confirmed", color: "var(--color-chart-2)" },
    "Pending": { label: "Pending", color: "var(--color-chart-3)" },
}

const staffRolesConfig = {
    staffs: { label: "Staff" },
    "Doctor": { label: "Doctor", color: "var(--color-chart-1)" },
    "Nurse": { label: "Nurse", color: "var(--color-chart-2)" },
    "Receptionist": { label: "Receptionist", color: "var(--color-chart-3)" },
    "Lab Technician": { label: "Lab Technician", color: "var(--color-chart-4)" },
    "Accountant": { label: "Accountant", color: "var(--color-chart-5)" },
    "Super Admin": { label: "Super Admin", color: "var(--color-chart-6)" },
}

export default function DashboardCharts() {
    const {
        patientStatusDistribution,
        loadingPatientStatusDistribution,
        refreshPatientStatusDistribution,
        staffRolesDistribution,
        loadingStaffRolesDistribution,
        refreshStaffRolesDistribution,
        appointmentStatusDistribution,
        loadingAppointmentStatusDistribution,
        refreshAppointmentStatusDistribution,
    } = useOverviewStatistics();

    const totalStaffCount = staffRolesDistribution.reduce((total, role) => total + role.count, 0);

    return (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">

            {/* Appointment Status Chart */}
            {
                loadingAppointmentStatusDistribution ?
                    (<ChartSkeleton />)
                    :
                    (<Card>
                        <CardHeader>
                          <CardTitle>Appointment Status</CardTitle>
                          <CardDescription>Current appointment distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[200px] mx-auto">
                              <BarChart data={appointmentStatusDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="status" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="count" fill="var(--color-chart-1)" />
                              </BarChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                      )
            }
            
            {/* Patient Status Chart */}
            {
                loadingPatientStatusDistribution ?
                    (<ChartSkeleton />)
                    :
                    (<Card>
                        <CardHeader>
                            <CardTitle>Patient Status</CardTitle>
                            <CardDescription>Admitted vs Outpatient Distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[200px] mx-auto">
                                <PieChart>
                                    <Pie
                                        data={patientStatusDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {patientStatusDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>)
            }

            {/* Staff Roles Chart (Bar Chart Alternative) */}
            {
                loadingStaffRolesDistribution ? (
                    <ChartSkeleton />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Staff Distribution</CardTitle>
                            <CardDescription>Total staff: {totalStaffCount} across all roles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={staffRolesConfig} className="h-[200px] mx-auto">
                                <BarChart data={staffRolesDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="role" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="count" stackId="a" fill="var(--color-chart-1)" />
                                </BarChart>

                            </ChartContainer>
                        </CardContent>
                    </Card>
                )
            }

            {/* Monthly Admissions Trend */}
            {/* <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Monthly Admissions & Discharges</CardTitle>
                    <CardDescription>6-month trend comparison</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                        <LineChart data={monthlyAdmissionsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type="monotone"
                                dataKey="admissions"
                                stroke="var(--color-chart-1)"
                                strokeWidth={2}
                                name="Admissions"
                            />
                            <Line
                                type="monotone"
                                dataKey="discharges"
                                stroke="var(--color-chart-2)"
                                strokeWidth={2}
                                name="Discharges"
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Department Utilization */}
            {/* <Card>
                <CardHeader>
                    <CardTitle>Department Utilization</CardTitle>
                    <CardDescription>Current capacity usage by department</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                        <BarChart data={departmentUtilizationData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="department" type="category" width={80} />
                            <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value}%`, "Utilization"]} />
                            <Bar dataKey="utilization" fill="var(--color-chart-1)" />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>  */}
        </div>
    )
}
