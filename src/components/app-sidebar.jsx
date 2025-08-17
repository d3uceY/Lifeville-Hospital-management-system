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
      roles: ["superadmin", "doctor", "nurse", "receptionist", "lab", "accountant"],
      items: [
        {
          title: "Overview",
          url: "/",
          roles: ["superadmin", "doctor", "nurse", "receptionist", "lab", "accountant"],
        }
      ],
    },

    // {
    //   title: "Reports & Analytics",
    //   url: "#",
    //   icon: BarChart,
    //   roles: ["superadmin", "accountant"],
    //   items: [
    //     {
    //       title: "Daily Activity Reports",
    //       url: "#",
    //       roles: ["superadmin", "accountant"],
    //     },
    //     {
    //       title: "Revenue & Financial Tracking",
    //       url: "#",
    //       roles: ["superadmin", "accountant"],
    //     },
    //     {
    //       title: "Appointment Statistics",
    //       url: "#",
    //       roles: ["superadmin", "doctor"],
    //     }
    //   ],
    // },
    // {
    //   title: "User & System Settings",
    //   url: "#",
    //   icon: UserCog,
    //   roles: ["superadmin"],
    //   items: [
    //     {
    //       title: "Manage User Roles",
    //       url: "#",
    //       roles: ["superadmin"],
    //     },
    //     {
    //       title: "System Configuration & Security",
    //       url: "#",
    //       roles: ["superadmin"],
    //     }
    //   ],
    // },
  ],

  clinical: [
    {
      title: "Patient Management",
      url: "#",
      icon: Users,
      roles: ["superadmin", "doctor", "nurse", "receptionist"],
      items: [
        {
          title: "Registration",
          url: "/register",
          roles: ["superadmin", "receptionist", "nurse"],
        },
        {
          title: "Patients",
          url: "/patients",
          roles: ["superadmin", "doctor", "nurse", "receptionist"],
        },
        {
          title: "Inpatients",
          url: "/inpatients",
          roles: ["superadmin", "doctor", "nurse"],
        },
        // {
        //   title: "Patient History",
        //   url: "/history",
        //   roles: ["superadmin", "doctor"],
        // },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: Calendar,
      roles: ["superadmin", "doctor", "nurse", "receptionist"],
      items: [
        {
          title: "Appointments",
          url: "/appointments",
          roles: ["superadmin", "doctor", "nurse", "receptionist"],
        }
      ],
    },
    // {
    //   title: "Electronic Medical Records",
    //   url: "#",
    //   icon: FileText,
    //   roles: ["superadmin", "doctor"],
    //   items: [
    //     // {
    //     //   title: "Patient Records",
    //     //   url: "#",
    //     //   roles: ["superadmin", "doctor"],
    //     // },
    //     {
    //       title: "Diagnostics and Prescriptions",
    //       url: "#",
    //       roles: ["superadmin", "doctor"],
    //     }
    //   ],
    // },
    {
      title: "Lab Tests",
      url: "#",
      icon: FlaskConical,
      roles: ["superadmin", "lab", "doctor"],
      items: [
        {
          title: "Laboratory",
          url: "/lab-tests",
          roles: ["superadmin", "lab", "doctor"],
        }
      ],
    },
    {
      title: "Birth & Death Records",
      url: "#",
      icon: BookOpen,
      roles: ["superadmin", "doctor", "nurse"],
      items: [
        {
          title: "Birth Records",
          url: "/births",
          roles: ["superadmin", "doctor", "nurse"],
        },
        {
          title: "Death Records",
          url: "/deaths",
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
      items: [
        {
          title: "Create Bill",
          url: "/add-bill",
          roles: ["superadmin", "accountant"],
        },
        {
          title: "Bills",
          url: "/bills",
          roles: ["superadmin", "accountant"],
        }
      ],
    },
    // {
    //   title: "Pharmacy & Inventory",
    //   url: "#",
    //   icon: Box,
    //   roles: ["superadmin", "accountant", "nurse"],
    //   items: [
    //     {
    //       title: "Issue Medicines",
    //       url: "#",
    //       roles: ["superadmin", "nurse"],
    //     },
    //     {
    //       title: "Inventory Levels & Stock Alerts",
    //       url: "#",
    //       roles: ["superadmin", "accountant"],
    //     }
    //   ],
    // },
  ],

  setup: [
    {
      title: "Symptoms (🛠️)",
      url: "#",
      icon: AlertTriangle,
      roles: ["superadmin", "doctor"],
      items: [
        {
          title: "Symptom Types",
          url: "/symptom-types",
          roles: ["superadmin", "doctor"],
        },
        {
          title: "Symptom heads",
          url: "/symptom-heads",
          roles: ["superadmin", "doctor"],
        }
      ],
    },
    {
      title: "Conditions (🛠️)",
      url: "#",
      icon: AlertTriangle,
      roles: ["superadmin", "doctor"],
      items: [
        {
          title: "Conditions",
          url: "/conditions",
          roles: ["superadmin", "doctor"],
        }
      ],
    },
    {
      title: "Beds (🛠️)",
      url: "#",
      icon: Bed,
      roles: ["superadmin", "nurse"],
      items: [
        {
          title: "Beds",
          url: "/beds",
          roles: ["superadmin", "nurse"],
        },
        {
          title: "Bed groups",
          url: "/bed-group",
          roles: ["superadmin", "nurse"],
        },
        {
          title: "Bed types",
          url: "/bed-type",
          roles: ["superadmin", "nurse"],
        }
      ],
    },
    {
      title: "Lab test (🛠️)",
      url: "#",
      icon: FlaskConical,
      roles: ["superadmin", "lab"],
      items: [
        {
          title: "Lab Test Types",
          url: "/lab-test-types",
          roles: ["superadmin", "lab"],
        }
      ],
    },
    {
      title: "Users / Roles (🛠️)",
      url: "#",
      icon: User,
      roles: ["superadmin"],
      items: [
        {
          title: "Users",
          url: "/users",
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
