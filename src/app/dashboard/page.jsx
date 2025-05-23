import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import SuspenseFallback from "../../components/loader/SuspenseFallback"
import { Suspense } from "react"
import { useLocation } from "react-router-dom"
// import ThemeToggle from "../../components/themeToggle"

export default function Page() {
  // this will be passed to suspense as location.key to force it
  // to reload when the route changes
  const location = useLocation()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <div>
            <ThemeToggle />
          </div> */}
        </header>
        <div className="md:p-6 p-2 min-h-screen overflow-y-auto">
          <div className="rounded-2xl shadow-md h-full bg-white md:p-4 p-2">
            {/* this is where the app routes are rendered */}
            <Suspense fallback={<SuspenseFallback />} key={location.key}>
              <Outlet />
            </Suspense>
            {/* this is the universal toaster component*/}
            <Toaster richColors />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
