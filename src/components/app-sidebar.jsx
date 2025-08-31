import { lazy } from "react"
import {
  PieChart,
  Users,
  Calendar,
  FlaskConical,
  CreditCard,
  BookOpen,
  AlertTriangle,
  Bed,
  User
} from "lucide-react"
import lifeVilleLogo from '/lifeville-logo.svg'

import { NavMain } from "@/components/nav-main"
import { NavClinical } from "./nav-clinical"
import { NavInventory } from "./nav-inventory"
import { NavUser } from "@/components/nav-user"
import { NavSetup } from "./nav-setup"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { filterMenuItems } from "../helpers/filterMenuItems"
import { SearchDialog } from "./search-dialog"

// const SearchDialog = lazy(() => import("./search-dialog"))

// This is sample data.
export const data = {
  teams: [
    {
      name: "Lifeville Hospital Management System",
      logo: lifeVilleLogo,
      plan: "Enterprise",
    }
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: PieChart,
      isActive: true,
      roles: ["superadmin", "doctor", "nurse", "receptionist", "lab", "accountant"],
      tags: ["dashboard", "overview", "home"],
      items: [
        {
          title: "Overview",
          url: "/",
          roles: ["superadmin", "doctor", "nurse", "receptionist", "lab", "accountant"],
          tags: ["dashboard", "overview", "summary"],
        }
      ],
    },
  ],

  clinical: [
    {
      title: "Patient Management",
      url: "#",
      icon: Users,
      roles: ["superadmin", "doctor", "nurse", "receptionist"],
      tags: ["patients", "registration", "inpatients", "records"],
      items: [
        {
          title: "Registration",
          url: "/register",
          tags: ["register patient", "new patient", "patient intake"],
          roles: ["superadmin", "receptionist", "nurse"],
        },
        {
          title: "Patients",
          url: "/patients",
          tags: ["all patients", "patient list", "outpatients"],
          roles: ["superadmin", "doctor", "nurse", "receptionist"],
        },
        {
          title: "Inpatients",
          url: "/inpatients",
          tags: ["inpatients", "admitted patients", "hospitalized"],
          roles: ["superadmin", "doctor", "nurse"],
        },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: Calendar,
      roles: ["superadmin", "doctor", "nurse", "receptionist"],
      tags: ["appointments", "scheduling", "calendar"],
      items: [
        {
          title: "Appointments",
          url: "/appointments",
          tags: ["appointments", "schedule", "booking"],
          roles: ["superadmin", "doctor", "nurse", "receptionist"],
        }
      ],
    },
    {
      title: "Lab Tests",
      url: "#",
      icon: FlaskConical,
      roles: ["superadmin", "lab", "doctor"],
      tags: ["lab", "tests", "diagnostics"],
      items: [
        {
          title: "Laboratory",
          url: "/lab-tests",
          tags: ["lab tests", "pathology", "laboratory", "analysis", "investigation"],
          roles: ["superadmin", "lab", "doctor"],
        }
      ],
    },
    {
      title: "Birth & Death Records",
      url: "#",
      icon: BookOpen,
      roles: ["superadmin", "doctor", "nurse"],
      tags: ["birth records", "death records", "civil registry"],
      items: [
        {
          title: "Birth Records",
          url: "/births",
          tags: ["birth records", "newborn", "delivery"],
          roles: ["superadmin", "doctor", "nurse"],
        },
        {
          title: "Death Records",
          url: "/deaths",
          tags: ["death records", "mortality", "deceased"],
          roles: ["superadmin", "doctor"],
        }
      ],
    },
  ],

  inventory: [
    {
      title: "Bills & Payments",
      url: "#",
      icon: CreditCard,
      roles: ["superadmin", "accountant"],
      tags: ["billing", "payments", "finance"],
      items: [
        {
          title: "Bills",
          url: "/bills",
          tags: ["bills", "invoices", "transactions"],
          roles: ["superadmin", "accountant"],
        }
      ],
    },
  ],

  setup: [
    {
      title: "Symptoms (🛠️)",
      url: "#",
      icon: AlertTriangle,
      roles: ["superadmin", "doctor"],
      tags: ["symptoms", "diagnosis", "medical signs"],
      items: [
        {
          title: "Symptom Types",
          url: "/symptom-types",
          tags: ["symptom types", "categories", "classification"],
          roles: ["superadmin", "doctor"],
        },
        {
          title: "Symptom heads",
          url: "/symptom-heads",
          tags: ["symptom heads", "groups", "symptom structure"],
          roles: ["superadmin", "doctor"],
        }
      ],
    },
    {
      title: "Conditions (🛠️)",
      url: "#",
      icon: AlertTriangle,
      roles: ["superadmin", "doctor"],
      tags: ["conditions", "diagnosis", "diseases"],
      items: [
        {
          title: "Conditions",
          url: "/conditions",
          tags: ["conditions", "medical conditions", "disorders"],
          roles: ["superadmin", "doctor"],
        }
      ],
    },
    {
      title: "Beds (🛠️)",
      url: "#",
      icon: Bed,
      roles: ["superadmin", "nurse"],
      tags: ["beds", "bed groups", "bed types", "wards"],
      items: [
        {
          title: "Beds",
          url: "/beds",
          tags: ["beds", "hospital beds", "admission beds"],
          roles: ["superadmin", "nurse"],
        },
        {
          title: "Bed groups",
          url: "/bed-group",
          tags: ["bed groups", "wards", "sections"],
          roles: ["superadmin", "nurse"],
        },
        {
          title: "Bed types",
          url: "/bed-type",
          tags: ["bed types", "categories", "beds"],
          roles: ["superadmin", "nurse"],
        }
      ],
    },
    {
      title: "Lab test (🛠️)",
      url: "#",
      icon: FlaskConical,
      roles: ["superadmin", "lab"],
      tags: ["lab test setup", "lab configuration", "test types"],
      items: [
        {
          title: "Lab Test Types",
          url: "/lab-test-types",
          tags: ["lab test types", "setup", "categories"],
          roles: ["superadmin", "lab"],
        }
      ],
    },
    {
      title: "Users / Roles (🛠️)",
      url: "#",
      icon: User,
      roles: ["superadmin"],
      tags: ["users", "roles", "permissions", "administration"],
      items: [
        {
          title: "Users",
          url: "/users",
          tags: ["users", "staff", "accounts", "administrators"],
          roles: ["superadmin"],
        }
      ],
    },
  ]
}


export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SearchDialog data={data} />
      <SidebarContent>
        <NavMain items={filterMenuItems(data.navMain)} />
        <NavClinical items={filterMenuItems(data.clinical)} />
        <NavInventory items={filterMenuItems(data.inventory)} />
        <NavSetup items={filterMenuItems(data.setup)} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
