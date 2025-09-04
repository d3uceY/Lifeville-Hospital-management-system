import { Bell, CheckCheck, Loader2 } from "lucide-react"
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
import { useQueryClient } from "@tanstack/react-query"
import { getUnreadNotifications } from "../../providers/ApiProviders"
import { getNotificationBadge } from "../../helpers/getNotificationBadge"
// import { ExternalLink } from "lucide-react"
import { markNotificationAsRead } from "../../providers/ApiProviders"
import { CustomTooltip } from "../../helpers/customTooltip"
import { Link } from "react-router-dom"

export function NotificationButton() {
    const { accessToken } = useAuth();
    const queryClient = useQueryClient();

    const { data: notifications, isLoading } = useQuery({
        queryKey: ["unreadNotifications", accessToken],
        queryFn: () => getUnreadNotifications({ accessToken }),
        enabled: !!accessToken
    })

    const handleMarkedAsRead = async (notificationId) => {
        await markNotificationAsRead({ accessToken, notificationId });
        queryClient.invalidateQueries({
            queryKey: ["unreadNotifications", accessToken],
        });
    }

    if (isLoading) {
        return <Loader2 className="h-4 w-4 animate-spin" />
    }

    const { unreadNotifications, totalUnread } = notifications;
    const unreadCount = totalUnread;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
                    {unreadCount > 0 && !isLoading && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="sr-only">{unreadCount} unread notifications</span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96">
                <div className="px-4 py-3 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                        {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                    </p>
                </div>

                <div className="max-h-80 overflow-y-auto">
                    {unreadNotifications.map((notification) => {
                        const badgeComponent = getNotificationBadge(notification)
                        return (
                            <DropdownMenuItem key={notification.id} className="p-0 focus:bg-muted/50">
                                <div className="flex items-start gap-3 p-3 w-full">
                                    <div className="flex-shrink-0 pt-1">{badgeComponent}</div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-xs leading-tight text-balance">{notification.title}</p>
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 text-pretty">
                                            {notification.message}
                                        </p>
                                        <span className="text-xs text-muted-foreground/80 mt-1 block">{notification.time}</span>
                                    </div>

                                    {/* <div className="flex-shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 hover:bg-muted"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            <span className="sr-only">View notification</span>
                                        </Button>
                                    </div> */}
                                    <CustomTooltip content="Mark as read">
                                        <div className="flex-shrink-0">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 p-0 hover:bg-green-100 text-green-600"
                                                onClick={() => handleMarkedAsRead(notification.id)}
                                            >
                                                <CheckCheck className="h-3 w-3" />
                                                <span className="sr-only">Mark notification as read</span>
                                            </Button>
                                        </div>
                                    </CustomTooltip>
                                </div>
                            </DropdownMenuItem>
                        )
                    })}
                </div>

                {unreadNotifications.length === 0 && (
                    <div className="p-6 text-center">
                        <p className="text-xs text-muted-foreground">No new notifications</p>
                    </div>
                )}

                <DropdownMenuSeparator />
                <div className="p-2">
                    <Link to="/notifications">
                        <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                            View all notifications
                        </Button>
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
