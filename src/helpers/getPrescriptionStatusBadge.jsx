import { Badge } from "@/components/ui/badge"

export const getPrescriptionStatusBadge = (status) => {
    if (!status) return null
    const statusConfig = {
        active: { variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100" },
        "on hold": { variant: "secondary", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
        modified: { variant: "outline", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
        discontinued: { variant: "destructive", className: "bg-red-100 text-red-800 hover:bg-red-100" },
        completed: { variant: "default", className: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
        expired: { variant: "secondary", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
        pending: { variant: "outline", className: "bg-yellow-50 text-yellow-800 hover:bg-yellow-50" },
        rejected: { variant: "destructive", className: "bg-red-200 text-red-900 hover:bg-red-200" },
        superseded: { variant: "secondary", className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100" },
        cancelled: { variant: "destructive", className: "bg-red-500 text-white hover:bg-red-500" },
    }

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending
    return (
        <Badge variant={config.variant} className={config.className}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}
