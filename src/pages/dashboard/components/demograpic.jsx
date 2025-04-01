import { Pie, PieChart } from "recharts"
import { usePatientData } from "../../../providers/ApiContextProvider"
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
import ChartSkeleton from "./chartSkeleton"

// These configurations define labels and colors for your charts.
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

export default function DemographicCharts() {
  const { patientData, loading } = usePatientData()

  if (loading) {
    return (
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
        {
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <ChartSkeleton />
            </div>
          ))
        }
      </div>
    )
  }

  // Initialize counters for each age group and gender.
  const ageGroups = {
    "children": 0,
    "teenagers": 0,
    "young adults": 0,
    "adults": 0,
    "senior citizens": 0,
  }

  const genderCounts = {
    male: 0,
    female: 0,
  }

  // Get the current date for age calculation.
  const now = new Date()

  // Process each patient.
  patientData.forEach((patient) => {
    // Calculate age from date_of_birth.
    const dob = new Date(patient.date_of_birth)
    let age = now.getFullYear() - dob.getFullYear()
    const monthDiff = now.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      age--
    }

    // Group patients into age categories.
    if (age >= 0 && age <= 12) {
      ageGroups["children"] += 1
    } else if (age >= 13 && age <= 19) {
      ageGroups["teenagers"] += 1
    } else if (age >= 20 && age <= 39) {
      ageGroups["young adults"] += 1
    } else if (age >= 40 && age <= 64) {
      ageGroups["adults"] += 1
    } else if (age >= 65) {
      ageGroups["senior citizens"] += 1
    }

    // Count genders (assumes the sex field is either "Male" or "Female").
    const gender = patient.sex.toLowerCase()
    if (gender === "male") {
      genderCounts.male += 1
    } else if (gender === "female") {
      genderCounts.female += 1
    }
  })

  // Create the chart data arrays.
  const populationChartData = Object.entries(ageGroups).map(([group, count]) => {
    // Match fill colors based on your config.
    let fill
    switch (group) {
      case "teenagers":
        fill = populationChartConfig.teenagers.color
        break
      case "young adults":
        fill = populationChartConfig["young adults"].color
        break
      case "adults":
        fill = populationChartConfig.adults.color
        break
      case "senior citizens":
        fill = populationChartConfig["senior citizens"].color
        break
      case "children":
        fill = populationChartConfig.children.color
        break
      default:
        fill = "#ccc"
    }
    return { patients: group, visitors: count, fill }
  })

  const genderPopulationChartData = Object.entries(genderCounts).map(([gender, count]) => {
    let fill
    switch (gender) {
      case "male":
        fill = genderPopulationChartConfig.male.color
        break
      case "female":
        fill = genderPopulationChartConfig.female.color
        break
      default:
        fill = "#ccc"
    }
    return { patients: gender, visitors: count, fill }
  })

  return (
    <div className="flex gap-4">
      <Card className="flex flex-col flex-1">
        <CardHeader className="items-center pb-0">
          <CardTitle>Demographic Distribution</CardTitle>
          <CardDescription>Breakdown of population by age groups</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
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
        <CardFooter className="flex-col gap-2 text-sm" />
      </Card>
      <Card className="flex flex-col flex-1">
        <CardHeader className="items-center pb-0">
          <CardTitle>Demographic Distribution</CardTitle>
          <CardDescription>Breakdown of population by gender</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
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
        <CardFooter className="flex-col gap-2 text-sm" />
      </Card>
    </div>
  )
}
