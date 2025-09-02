import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../providers/AuthContext"
import { getInitials } from "../helpers/getinitials"

export function UserAvatar() {
    const { user } = useAuth()

    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-xs">{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
        </div>
    )
}
