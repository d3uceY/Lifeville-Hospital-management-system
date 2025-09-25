import { Switch } from "@/components/ui/switch";
import { useAuth } from "../../providers/AuthContext";
import { toggleActiveUser } from "../../providers/ApiProviders";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function UserActiveToggle({ user }) {
    const { accessToken, user: authUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const toggleActiveUserHandler = async () => {
        const promise = async () => {
            try {
                setIsLoading(true);
                const response = await toggleActiveUser(accessToken, user.id);
                return response;
            } catch (error) {
                return error;
            } finally {
                setIsLoading(false);
                queryClient.invalidateQueries({
                    queryKey: ["users"],
                });
            }
        }
        toast.promise(promise(), {
            loading: "Loading...",
            success: "User active status toggled successfully!",
            error: "Failed to toggle user active status!",
        });
    };

    return (
        <Switch onCheckedChange={toggleActiveUserHandler} checked={user.is_active} disabled={isLoading || authUser.id === user.id} />
    )
}