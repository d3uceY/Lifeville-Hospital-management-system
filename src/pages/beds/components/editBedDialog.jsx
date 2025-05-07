import { useBeds } from "../../../providers/ApiContextProvider";
import { updateBed } from "../../../providers/ApiProviders";
import { useState } from "react";
import { FileText, Tags, Edit2, BedDouble, Layers } from "lucide-react";
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
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import spinnerLight from '/spinner-light.svg';

export function EditBedDialog({ bed, children }) {
    const { bed_id, bed_name, bed_type_id, bed_group_id, in_use } = bed;
    const { refreshBeds, bedTypes, loadingBedTypes, bedGroups, loadingBedGroups } = useBeds();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const schema = z.object({
        bedName: z.string().nonempty({ message: "Bed name is required" }),
        bedTypeId: z.string().nonempty({ message: "Bed type is required" }),
        bedGroupId: z.string().nonempty({ message: "Bed group is required" }),
        inUse: z.boolean(),
    });

    const { register, formState: { isValid, errors }, handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            bedName: bed_name,
            bedTypeId: `${bed_type_id}`,
            bedGroupId: `${bed_group_id}`,
            inUse: in_use,
        }
    });

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true);
            const payload = {
                bed_name: data.bedName,
                bed_type_id: Number(data.bedTypeId),
                bed_group_id: Number(data.bedGroupId),
                in_use: data.inUse,
            };
            try {
                const response = await updateBed(bed_id, payload);
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
            loading: 'Updating bed...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-transparent text-black hover:bg-[#e6f2ed] hover:text-[#106041] w-full justify-start">
                    <Edit2 className=" h-4 w-4" />
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto border-[#e0f0e8]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] flex items-center gap-2">
                        <BedDouble className="h-5 w-5" />
                        Edit Bed
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="bedName" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-[#268A64]" />
                                Bed Name
                            </Label>
                            <Input
                                id="bedName"
                                placeholder="Enter bed name..."
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("bedName")}
                            />
                            {errors.bedName && <p className="text-red-500">{errors.bedName.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bedTypeId" className="text-gray-700 flex items-center gap-1">
                                <Tags className="h-3.5 w-3.5 text-[#268A64]" />
                                Bed Type
                            </Label>
                            <div className="relative">
                                {loadingBedTypes && (
                                    <img src={spinnerLight} alt="" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                                )}
                                <Controller
                                    name="bedTypeId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger id="bedTypeId" className="border-[#268a6461] focus:ring-[#268a6429]">
                                                <SelectValue placeholder={loadingBedTypes ? "Loading..." : bedTypes.length > 0 ? `Select a bed type` : `No bed types found`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bedTypes.map((bedType) => (
                                                    <SelectItem key={bedType.bed_type_id} value={`${bedType.bed_type_id}`}>
                                                        <span>{bedType.bed_type_name}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.bedTypeId && <p className="text-red-500">{errors.bedTypeId.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bedGroupId" className="text-gray-700 flex items-center gap-1">
                                <Layers className="h-3.5 w-3.5 text-[#268A64]" />
                                Bed Group
                            </Label>
                            <div className="relative">
                                {loadingBedGroups && (
                                    <img src={spinnerLight} alt="" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8" />
                                )}
                                <Controller
                                    name="bedGroupId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger id="bedGroupId" className="border-[#268a6461] focus:ring-[#268a6429]">
                                                <SelectValue placeholder={loadingBedGroups ? "Loading..." : bedGroups.length > 0 ? `Select a bed group` : `No bed groups found`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bedGroups.map((bedGroup) => (
                                                    <SelectItem key={bedGroup.bed_group_id} value={`${bedGroup.bed_group_id}`}>
                                                        <span>{bedGroup.bed_group_name}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.bedGroupId && <p className="text-red-500">{errors.bedGroupId.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="inUse" className="text-gray-700 flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    id="inUse"
                                    className="mr-2"
                                    {...register("inUse")}
                                />
                                In Use
                            </Label>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 flex items-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-[#268a6461] text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button disabled={!isValid || isSubmitting} type="submit" className="bg-[#106041] hover:bg-[#0d4e34]">
                            {isSubmitting && (<img src={spinnerLight} alt="" className=" h-8 w-8" />)}
                            Save Record
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
