import { Badge } from "@/components/ui/badge"

export const getRoleBadge = (role) => {
  const roleConfig = {
    superadmin: { 
      variant: "default", 
      className: "bg-purple-100 text-purple-800 hover:bg-purple-100" 
    },
    doctor: { 
      variant: "default", 
      className: "bg-green-100 text-green-800 hover:bg-green-100" 
    },
    nurse: { 
      variant: "secondary", 
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100" 
    },
    receptionist: { 
      variant: "secondary", 
      className: "bg-pink-100 text-pink-800 hover:bg-pink-100" 
    },
    lab: { 
      variant: "outline", 
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
    },
    accountant: { 
      variant: "default", 
      className: "bg-teal-100 text-teal-800 hover:bg-teal-100" 
    },
  }

  const config = roleConfig[role] || { 
    variant: "outline", 
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100" 
  }

  return (
    <Badge variant={config.variant} className={config.className}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  )
}
