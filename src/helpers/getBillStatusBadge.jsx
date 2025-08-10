import { Badge } from "@/components/ui/badge"
export const getBillStatusBadge = (status) => {
    const statusConfig = {
        paid: { variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100" },
        unpaid: { variant: "secondary", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
        overdue: { variant: "destructive", className: "bg-red-100 text-red-800 hover:bg-red-100" },
        cancelled: { variant: "outline", className: "bg-red-500 text-white hover:bg-red-500" },
    }

    const config = statusConfig[status] || statusConfig.unpaid
    return (
        <Badge variant={config.variant} className={config.className}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}
