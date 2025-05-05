import * as React from "react"
import {
  PieChart,
  Users,
  Calendar,
  FileText,
  FlaskConical,
  CreditCard,
  Box,
  BarChart,
  UserCog,
  BookOpen,
  AlertTriangle
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Today's Schedule",
          url: "#",
        },
        {
          title: "Alerts & Notifications",
          url: "#",
        },
      ],
    },

    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChart,
      items: [
        {
          title: "Daily Activity Reports",
          url: "#",
        },
        {
          title: "Revenue & Financial Tracking",
          url: "#",
        },
        {
          title: "Appointment Statistics",
          url: "#",
        }
      ],
    },
    {
      title: "User & System Settings",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "Manage User Roles",
          url: "#",
        },
        {
          title: "System Configuration & Security",
          url: "#",
        }
      ],
    },
  ],

  clinical: [
    {
      title: "Patient Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Registration",
          url: "/register",
        },
        {
          title: "Patients",
          url: "/patients",
        },
        {
          title: "Patient History",
          url: "/history",
        },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Book Appointments",
          url: "/book-appointment",
        },
        {
          title: "Appointments",
          url: "/appointments",
        }
      ],
    },
    {
      title: "Electronic Medical Records",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Patient Records",
          url: "#",
        },
        {
          title: "Diagnostics and Prescriptions",
          url: "#",
        }
      ],
    },
    {
      title: "Lab Tests",
      url: "#",
      icon: FlaskConical,
      items: [
        {
          title: "Request Lab Tests",
          url: "#",
        },
        {
          title: "Review & Upload Results",
          url: "#",
        }
      ],
    },
    ,
    {
      title: "Birth & Death Records",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Birth Records",
          url: "/births",
        },
        {
          title: "Death Records",
          url: "/deaths",
        }
      ],
    },
  ],
  inventory: [
    {
      title: "Bills & Payments",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Create Invoice",
          url: "#",
        },
        {
          title: "Payment Status & Receipts",
          url: "#",
        }
      ],
    },
    {
      title: "Pharmacy & Inventory",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Issue Medicines",
          url: "#",
        },
        {
          title: "Inventory Levels & Stock Alerts",
          url: "#",
        }
      ],
    },
  ],
  setup: [
    {
      title: "Symptoms",
      url: "#",
      icon: AlertTriangle,
      items: [
        {
          title: "Symptom Types",
          url: "/symptom-types",
        },
        {
          title: "Symptom heads",
          url: "/symptom-heads",
        }
      ],
    }
  ]
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavClinical items={data.clinical} />
        <NavInventory items={data.inventory} />
        <NavSetup items={data.setup} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
