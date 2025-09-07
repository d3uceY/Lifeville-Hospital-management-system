import * as React from "react";
import { useState } from "react";
import { createBed } from "../../../providers/ApiProviders";
import { useBeds } from "../../../providers/ApiContextProvider";
import { FilePlus, Home, Tag, Bed } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
    bedName: z.string().nonempty({ message: "Bed name is required" }),
    bedTypeId: z.string().nonempty({ message: "Bed type is required" }),
    bedGroupId: z.string().nonempty({ message: "Bed group is required" }),
    used: z.boolean(),
});

export function CreateBedDialog() {
    const {
        refreshBeds,
        bedGroups,
        loadingBedGroups,
        bedTypes,
        loadingBedTypes,
    } = useBeds();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            bedName: "",
            bedTypeId: "",
            bedGroupId: "",
            used: false,
        },
    });

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true);
            try {
                const payload = {
                    bedName: data.bedName,
                    bedTypeId: Number(data.bedTypeId),
                    bedGroupId: Number(data.bedGroupId),
                    used: data.used,
                };
                const response = await createBed(payload);
                setOpen(false);
                refreshBeds();
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: 'Creating bed...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err.message,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create Bed
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bed className="h-5 w-5 shrink-0" /> Create Bed
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="bedName" className="flex items-center gap-1">
                                <Home className="h-3.5 w-3.5 " /> Bed Name
                            </Label>
                            <Input
                                id="bedName"
                                placeholder="Enter bed name..."
                                {...register("bedName")}
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                            />
                            {errors.bedName && <p className="text-red-500">{errors.bedName.message}</p>}
                        </div>
                        <div className="grid gap-2 grid-cols-2">
                            <div className="grid gap-2 w-full">
                                <Label className="flex items-center gap-1">
                                    <Tag className="h-3.5 w-3.5 " /> Bed Type
                                </Label>
                                <Controller
                                    name="bedTypeId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429] w-full">
                                                <SelectValue placeholder={loadingBedTypes ? "Loading..." : "Select a bed type"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bedTypes.map((type) => (
                                                    <SelectItem key={type.id} value={`${type.id}`}>{type.type_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.bedTypeId && <p className="text-red-500">{errors.bedTypeId.message}</p>}
                            </div>

                            <div className="grid gap-2 w-full">
                                <Label className="flex items-center gap-1">
                                    <Tag className="h-3.5 w-3.5 " /> Bed Group
                                </Label>
                                <Controller
                                    name="bedGroupId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="border-[#268a6461] focus:ring-[#268a6429] w-full">
                                                <SelectValue placeholder={loadingBedGroups ? "Loading..." : "Select a bed group"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bedGroups.map((group) => (
                                                    <SelectItem key={group.id} value={`${group.id}`}>{group.group_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.bedGroupId && <p className="text-red-500">{errors.bedGroupId.message}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Controller
                                name="used"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox className="data-[state=checked]:bg-[#106041]" checked={field.value} onCheckedChange={field.onChange} />
                                )}
                            />
                            <Label>In Use</Label>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={!isValid || isSubmitting} type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            {isSubmitting && <img src={spinnerLight} alt="" className="h-5 w-5 mr-2" />}
                            Save Bed
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
