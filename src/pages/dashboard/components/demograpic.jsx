import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
const populationChartData = [
  { patients: "teenagers", visitors: 275, fill: "#268A63" },
  { patients: "young adults", visitors: 200, fill: "#22C55E" },
  { patients: "adults", visitors: 187, fill: "#FE0B05" },
  { patients: "senior citizens", visitors: 173, fill: "#B2D2C6" },
  { patients: "children", visitors: 90, fill: "#2563EB" },
]

const populationChartConfig = {
  visitors: {
    label: "Patients",
  },
  teenagers: {
    label: "Teenagers (13-19)",
    color: "#268A63",
  },
  "young adults": {
    label: "Young Adults (20-39)",
    color: "#22C55E",
  },
  adults: {
    label: "Adults (40-64)",
    color: "#FE0B05",
  },
  "senior citizens": {
    label: "Senior Citizens (65+)",
    color: "#B2D2C6",
  },
  children: {
    label: "Children (0-12)",
    color: "#2563EB",
  },
}

const genderPopulationChartConfig = {
  visitors: {
    label: "Patients",
  },
  male: {
    label: "Male",
    color: "#268A63",
  },
  female: {
    label: "Female",
    color: "#FE0B05",
  }
}

const genderPopulationChartData = [
  { patients: "male", visitors: 275, fill: "#268A63" },
  { patients: "female", visitors: 200, fill: "#FE0B05" },
]



export default function DemographicCharts() {
  return (
    <div className="flex gap-4">
      <Card className="flex flex-col flex-1">
        <CardHeader className="items-center pb-0">
          <CardTitle>Demographic Distribution</CardTitle>
          <CardDescription>Breakdown of population by age groups</CardDescription>
        </CardHeader>
        <CardContent className="flex-1  pb-0">
          <ChartContainer
            config={populationChartConfig}
            className="mx-auto aspect-square max-h-[320px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={populationChartData}
                dataKey="visitors"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                nameKey="patients"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="patients" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
        </CardFooter>
      </Card>
      <Card className="flex flex-col flex-1">
        <CardHeader className="items-center pb-0">
          <CardTitle>Demographic Distribution</CardTitle>
          <CardDescription>Breakdown of population by gender</CardDescription>
        </CardHeader>
        <CardContent className="flex-1  pb-0">
          <ChartContainer
            config={genderPopulationChartConfig}
            className="mx-auto aspect-square max-h-[320px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={genderPopulationChartData}
                dataKey="visitors"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                nameKey="patients"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="patients" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>

        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
        </CardFooter>
      </Card>
    </div>
  )
}
