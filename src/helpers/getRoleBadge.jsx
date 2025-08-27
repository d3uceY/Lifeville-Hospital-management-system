import { Badge } from "@/components/ui/badge"

export const getRoleBadge = (role, classes = "") => {
  const roleConfig = {
    superadmin: {
      variant: "default",
      className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      label: "Super Admin"
    },
    doctor: {
      variant: "default",
      className: "bg-green-100 text-green-800 hover:bg-green-100",
      label: "Doctor"
    },
    nurse: {
      variant: "secondary",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      label: "Nurse"
    },
    receptionist: {
      variant: "secondary",
      className: "bg-pink-100 text-pink-800 hover:bg-pink-100",
      label: "Receptionist"
    },
    lab: {
      variant: "outline",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      label: "Lab Technician"
    },
    accountant: {
      variant: "default",
      className: "bg-teal-100 text-teal-800 hover:bg-teal-100",
      label: "Accountant"
    },
  }

  const config = roleConfig[role] || {
    variant: "outline",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    label: "Unknown"
  }

  return (
    <Badge variant={config.variant} className={`${classes} ${config.className}`}>
      {config.label}
    </Badge>
  )
}
