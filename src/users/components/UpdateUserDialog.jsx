import * as React from "react";
import { useState, useEffect } from "react";
import { updateUser } from "../../providers/ApiProviders";
import { toast } from "sonner";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import spinnerLight from "/spinner-light.svg";
import { User, Mail, Shield, Lock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthContext";

const schema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.string().nonempty({ message: "Role is required" }),
});

export function UpdateUserDialog({ user }) {
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const { accessToken } = useAuth();

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            role: user?.role || "",
        },
    });


    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true);
            try {
                const payload = {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                };
                const response = await updateUser(accessToken, payload, user.id);
                queryClient.invalidateQueries({ queryKey: ["users"] });
                setOpen(false);
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: "Updating user...",
            success: (data) => `${data.message || "User updated successfully"}`,
            error: (err) => err.response?.data?.message || err.message,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="action-edit-btn">
                    <Shield className="mr-2 h-4 w-4" />
                    Update User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" /> Update User
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        {/* Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" /> Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter full name..."
                                {...register("name")}
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Role */}
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="flex items-center gap-1">
                                <Shield className="h-3.5 w-3.5" /> Role
                            </Label>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429]">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="superadmin">Super Admin</SelectItem>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                            <SelectItem value="nurse">Nurse</SelectItem>
                                            <SelectItem value="receptionist">Receptionist</SelectItem>
                                            <SelectItem value="lab">Lab Technician</SelectItem>
                                            <SelectItem value="accountant">Accountant</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" /> Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email..."
                            {...register("email")}
                            className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* <div className="grid gap-2 mt-4">
                        <Label htmlFor="password" className="flex items-center gap-1">
                            <Lock className="h-3.5 w-3.5" /> Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div> */}

                    <DialogFooter className="flex gap-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={!isValid || isSubmitting} type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            {isSubmitting && <img src={spinnerLight} alt="" className="h-5 w-5 mr-2" />}
                            Update User
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
