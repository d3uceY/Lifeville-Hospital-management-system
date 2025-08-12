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
  AlertTriangle,
  Bed
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
        }
      ],
    },

    // {
    //   title: "Reports & Analytics",
    //   url: "#",
    //   icon: BarChart,
    //   items: [
    //     {
    //       title: "Daily Activity Reports",
    //       url: "#",
    //     },
    //     {
    //       title: "Revenue & Financial Tracking",
    //       url: "#",
    //     },
    //     {
    //       title: "Appointment Statistics",
    //       url: "#",
    //     }
    //   ],
    // },
    // {
    //   title: "User & System Settings",
    //   url: "#",
    //   icon: UserCog,
    //   items: [
    //     {
    //       title: "Manage User Roles",
    //       url: "#",
    //     },
    //     {
    //       title: "System Configuration & Security",
    //       url: "#",
    //     }
    //   ],
    // },
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
          title: "Inpatients",
          url: "/inpatients",
        },
        // {
        //   title: "Patient History",
        //   url: "/history",
        // },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Appointments",
          url: "/appointments",
        }
      ],
    },
    // {
    //   title: "Electronic Medical Records",
    //   url: "#",
    //   icon: FileText,
    //   items: [
    //     // {
    //     //   title: "Patient Records",
    //     //   url: "#",
    //     // },
    //     {
    //       title: "Diagnostics and Prescriptions",
    //       url: "#",
    //     }
    //   ],
    // },
    {
      title: "Lab Tests",
      url: "#",
      icon: FlaskConical,
      items: [
        {
          title: "Laboratory",
          url: "/lab-tests",
        }
      ],
    },
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
          title: "Create Bill",
          url: "/add-bill",
        },
        {
          title: "Bills",
          url: "/bills",
        }
      ],
    },
    // {
    //   title: "Pharmacy & Inventory",
    //   url: "#",
    //   icon: Box,
    //   items: [
    //     {
    //       title: "Issue Medicines",
    //       url: "#",
    //     },
    //     {
    //       title: "Inventory Levels & Stock Alerts",
    //       url: "#",
    //     }
    //   ],
    // },
  ],
  setup: [
    {
      title: "Symptoms (🛠️)",
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
    },
    {
      title: "Conditions (🛠️)",
      url: "#",
      icon: AlertTriangle,
      items: [
        {
          title: "Conditions",
          url: "/conditions",
        }
      ],
    },
    {
      title: "Beds (🛠️)",
      url: "#",
      icon: Bed,
      items: [
        {
          title: "Beds",
          url: "/beds",
        },
        {
          title: "Bed groups",
          url: "/bed-group",
        },
        {
          title: "Bed types",
          url: "/bed-type",
        }
      ],
    },
    {
      title: "Lab test (🛠️)",
      url: "#",
      icon: FlaskConical,
      items: [
        {
          title: "Lab Test Types",
          url: "/lab-test-types",
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
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavClinical items={data.clinical} />
        <NavInventory items={data.inventory} />
        <NavSetup items={data.setup} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
