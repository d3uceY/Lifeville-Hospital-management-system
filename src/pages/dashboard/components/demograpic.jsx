import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for gender distribution
const genderData = [
  { name: "Men", value: 540, color: "#2563eb" },
  { name: "Women", value: 620, color: "#ec4899" },
];

// Sample data for age distribution
const ageData = [
  { name: "Children (0-12)", value: 250, color: "#22c55e" },
  { name: "Teenagers (13-19)", value: 180, color: "#eab308" },
  { name: "Adults (20+)", value: 730, color: "#8b5cf6" },
];

export default function DemographicCharts() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Demographic Distribution</CardTitle>
        <CardDescription>Breakdown of population by gender and age groups</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gender Distribution Chart */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Gender Distribution</h3>
            <div className="h-80">
              <PieChart width={400} height={400}>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-gender-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Age Distribution Chart */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Age Distribution</h3>
            <div className="h-80">
              <PieChart width={400} height={400}>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-age-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
