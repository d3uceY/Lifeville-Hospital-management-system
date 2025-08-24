import { Badge } from "@/components/ui/badge"

export const getLabTestStatusBadge = (status) => {
    const statusConfig = {
        "to do": { 
            variant: "secondary", 
            className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
        },
        "in progress": { 
            variant: "default", 
            className: "bg-blue-100 text-blue-800 hover:bg-blue-100" 
        },
        "done": { 
            variant: "default", 
            className: "bg-green-100 text-green-800 hover:bg-green-100" 
        },
        "failed": { 
            variant: "destructive", 
            className: "bg-red-100 text-red-800 hover:bg-red-100" 
        },
    }

    const config = statusConfig[status] || statusConfig["to do"]
    const label = status
        .split("_") // turn underscores into spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    return (
        <Badge variant={config.variant} className={config.className}>
            {label}
        </Badge>
    )
}
