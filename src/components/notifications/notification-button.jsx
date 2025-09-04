"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../../providers/AuthContext"
import { timeAgo } from "../../helpers/getTimeAgo"
import { useQuery } from "@tanstack/react-query"
import { getUnreadNotifications } from "../../providers/ApiProviders"

export function NotificationButton() {
    const { accessToken } = useAuth();

    const { data: notifications, isLoading } = useQuery({
        queryKey: ["unreadNotifications", accessToken],
        queryFn: () => getUnreadNotifications({ accessToken }),
        enabled: !!accessToken
    })

    console.log(notifications)

    if (isLoading) {
        return <div>Loading...</div>
    }

    const { unreadNotifications, totalUnread } = notifications;
    const unreadCount = totalUnread;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="sr-only">{unreadCount} unread notifications</span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="px-3 py-2">
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">You have {unreadCount} unread notifications</p>
                </div>
                <DropdownMenuSeparator />
                {unreadNotifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                        <div className="flex w-full justify-between items-start">
                            <div className="flex-1">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">{notification.time}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center">
                    <Button variant="ghost" size="sm" className="w-full">
                        View all notifications
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
