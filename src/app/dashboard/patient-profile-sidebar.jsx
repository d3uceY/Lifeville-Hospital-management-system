import {
  FileText,
  IdCard,
  Activity,
  Pill,
  Stethoscope,
  Brain,
  ClipboardList,
  TestTube,
  MessageSquare
} from "lucide-react"

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


export default function PatientProfileSidebar() {
  const { patient_id } = useParams();
  const location = useLocation();
  
  const data = {
    nav: [
      { name: "summary", icon: FileText, href: `/patient-profile/${patient_id}/summary` },
      { name: "full info", icon: IdCard, href: `/patient-profile/${patient_id}/full-profile` },
      // { name: "history", icon: History, href: `/patient-profile/${patient_id}/history` },
      { name: "vital signs", icon: Activity, href: `/patient-profile/${patient_id}/vital-signs` },
      { name: "investigations", icon: TestTube, href: `/patient-profile/${patient_id}/analysis` },
      { name: "physical examinations", icon: ClipboardList, href: `/patient-profile/${patient_id}/physical-examinations` },
      { name: "complaints", icon: MessageSquare , href: `/patient-profile/${patient_id}/complaints` },
      { name: "prescriptions", icon: Pill, href: `/patient-profile/${patient_id}/prescriptions` },
      { name: "services", icon: Stethoscope, href: `/patient-profile/${patient_id}/services` },
      { name: "diagnosis", icon: Brain, href: `/patient-profile/${patient_id}/diagnosis` },
    ],
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarProvider className="flex-1">
        <Sidebar collapsible="none" className="hidden md:flex border-r border-gray-200 bg-white shadow-sm">
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {data.nav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.href}
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
          <div className="md:hidden bg-white border-b border-gray-200 p-4">
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
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}
