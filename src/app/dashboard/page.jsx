import { AppSidebar } from "@/components/app-sidebar"
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
import ToastNotifications from "../../components/notifications/toast-notifications"
import { UserAvatar } from "../../components/nav-header-user"
import { NotificationButton } from "../../components/notifications/notification-button"

export default function Page() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex py-4 h-fit shrink-0 mt-3 rounded-(--radius) items-center bg-white gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-14">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex items-center gap-4 ml-auto px-4">
            <UserAvatar />
            <NotificationButton />
          </div>
        </header>
        <div className="mx-1 mt-6 min-h-screen overflow-y-auto">
          <div className="rounded-2xl shadow-md h-full bg-white p-3">
            <Suspense fallback={<SuspenseFallback />} >
              <Outlet />
            </Suspense>
            <ToastNotifications />
            <Toaster richColors closeButton />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
