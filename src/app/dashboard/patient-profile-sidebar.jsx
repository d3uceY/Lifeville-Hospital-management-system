
import {
  FileText, IdCard, Activity, Stethoscope, MessageSquare,
  ClipboardList, TestTube, Brain, Pill, NotebookPen, Receipt,
  Hospital, CalendarDays, Repeat
} from "lucide-react";

import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { filterMenuItems } from "../../helpers/filterMenuItems"
import { useAuth } from "../../providers/AuthContext";
import { GetTitle } from "../../helpers/getTitle";


export default function PatientProfileSidebar() {

  const { patient_id, surname, first_name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const data = {
    nav: [
      {
        name: "summary",
        icon: FileText,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/patient-summary`,
        roles: ["superadmin", "doctor", "nurse", "lab", "receptionist"],
      },
      {
        name: "full info",
        icon: IdCard,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/full-profile`,
        roles: ["superadmin", "doctor", "receptionist", "lab", "nurse"],
      },
      {
        name: "Visits",
        icon: Repeat,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/patient-visits`,
        roles: ["superadmin", "doctor", "receptionist", "lab", "nurse"],
      },
      {
        name: "admissions",
        icon: Hospital,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/admissions`,
        roles: ["superadmin", "doctor", "nurse", "receptionist"],
      },
      {
        name: "vital signs",
        icon: Activity,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/vital-signs`,
        roles: ["superadmin", "doctor", "nurse"],
      },
      // {
      //   name: "history",
      //   icon: History,
      //   href: `/patient-profile/${patient_id}/history`,
      //   roles: ["superadmin", "doctor", "nurse", "lab"],
      // },
      {
        name: "complaints",
        icon: MessageSquare,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/complaints`,
        roles: ["superadmin", "doctor", "nurse"],
      },
      {
        name: "Doctor's Notes",
        icon: Stethoscope,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/doctor-notes`,
        roles: ["superadmin", "doctor"],
      },
      {
        name: "physical examinations",
        icon: ClipboardList,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/physical-examinations`,
        roles: ["superadmin", "doctor"],
      },
      {
        name: "investigations",
        icon: TestTube,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/analysis`,
        roles: ["superadmin", "doctor", "lab"],
      },
      {
        name: "diagnoses",
        icon: Brain,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/diagnoses`,
        roles: ["superadmin", "doctor"],
      },
      {
        name: "prescriptions",
        icon: Pill,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/prescriptions`,
        roles: ["superadmin", "doctor", "nurse", "pharmacist"],
      },
      {
        name: "procedures",
        icon: Stethoscope,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/procedures`,
        roles: ["superadmin", "doctor"],
      },
      {
        name: "Nurse's Notes",
        icon: NotebookPen,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/nurse-notes`,
        roles: ["superadmin", "nurse", "doctor"],
      },
      {
        name: "bills",
        icon: Receipt,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/profile-bill`,
        roles: ["superadmin", "accountant", "receptionist"],
      },
      {
        name: "appointments",
        icon: CalendarDays,
        href: `/patient-profile/${patient_id}/${surname}/${first_name}/appointments`,
        roles: ["superadmin", "doctor", "nurse", "receptionist"],
      },
    ],
  }

  if ((Number(patient_id)) && ((surname) || (first_name)) && (accessToken)) {
    return (
      <div className="flex h-screen bg-gray-50">
        <GetTitle title="Patient Profile" />
        <SidebarProvider className="flex-1">
          <Sidebar collapsible="none" className="hidden md:flex border-r border-gray-200 bg-white shadow-sm">
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {filterMenuItems(data.nav).map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={decodeURIComponent(location.pathname) === decodeURIComponent(item.href)}
                          className="w-full justify-start px-3 py-2 text-sm font-medium transition-colors hover:bg-[#e6f2ed] hover:text-[#106041] data-[active=true]:bg-[#f0f8f4] data-[active=true]:text-[#106041] data-[active=true]:border-r-2 data-[active=true]:border-[#268a64]"
                        >
                          <Link to={item.href} className="flex items-center gap-3 w-full">
                            <item.icon className="h-4 w-4" />
                            <span className="capitalize">{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* Mobile Navigation */}
            <div className="md:hidden bg-white border-b border-gray-200 md:p-4 p-3">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {data.nav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${location.pathname === item.href
                      ? "bg-[#f0f8f4] text-[#106041] border border-[#268a64]"
                      : "text-gray-600 hover:bg-[#e6f2ed] hover:text-[#106041]"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="capitalize">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="md:p-6 px-2">
                <Outlet />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    )
  } else {
    return navigate("/patients");
  }
}
