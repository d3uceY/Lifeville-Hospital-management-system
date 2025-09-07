import * as React from "react";
import { useState } from "react";
import { registerUser } from "../../providers/ApiProviders";
import { FilePlus, User, Mail, Shield, LockKeyhole } from "lucide-react";
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
import spinnerLight from "/spinner-light.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthContext";

// validation schema
const schema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    role: z.string().nonempty({ message: "Role is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export function CreateUserDialog() {
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const { accessToken } = useAuth();

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            password: "",
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
                    password: data.password,
                };


                const response = await registerUser({ accessToken, payload }); // this calls backend (SQL)
                setOpen(false);
                queryClient.invalidateQueries({ queryKey: ["users"] });
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: "Creating user...",
            success: (data) => `${data.message || "User created successfully"}`,
            error: (err) => err.response?.data?.message || err.message,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 shrink-0" /> Create User
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
                            {errors.name && (
                                <p className="text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="grid gap-2">
                            <Label className="flex items-center gap-1">
                                <Shield className="h-3.5 w-3.5" /> Role
                            </Label>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429] w-full">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                            <SelectItem value="nurse">Nurse</SelectItem>
                                            <SelectItem value="receptionist">Receptionist</SelectItem>
                                            <SelectItem value="lab">Lab Technician</SelectItem>
                                            <SelectItem value="accountant">Accountant</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.role && (
                                <p className="text-red-500">{errors.role.message}</p>
                            )}
                        </div>
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" /> Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="Enter email..."
                                {...register("email")}
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>


                        <div className="grid gap-2">
                            <Label htmlFor="password" className="flex items-center gap-1">
                                <LockKeyhole className="h-3.5 w-3.5" /> Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                            />
                            {errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            className="bg-[#106041] hover:bg-[#0d4e34]"
                        >
                            {isSubmitting && (
                                <img src={spinnerLight} alt="" className="h-5 w-5 mr-2" />
                            )}
                            Save User
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
