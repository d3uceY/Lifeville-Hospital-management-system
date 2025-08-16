import { useAuth } from "../providers/AuthContext"

export const hasPermission = (roles) => {
    const { user } = useAuth();
    if (!user) return false;
    return roles.includes(user.role);
}