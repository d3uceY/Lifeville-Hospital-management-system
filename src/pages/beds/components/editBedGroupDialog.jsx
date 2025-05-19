import { useBeds } from "../../../providers/ApiContextProvider";
import { updateBedGroup } from "../../../providers/ApiProviders";
import { useState } from "react";
import { FileText, Edit2, BedDouble } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import spinnerLight from '/spinner-light.svg';

export function EditBedGroupDialog({ bedGroup }) {
    const { id, group_name } = bedGroup;
    const { refreshBedGroups } = useBeds();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const schema = z.object({
        groupName: z.string().nonempty({ message: "Bed group name is required" }),
    });

    const { register, formState: { isValid, errors }, handleSubmit } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            groupName: group_name,
        }
    });

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true);
            try {
                const response = await updateBedGroup(id, data);
                setOpen(false);
                refreshBedGroups();
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: 'Updating bed group...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="action-edit-btn">
                    <Edit2 className=" h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto border-[#e0f0e8]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] flex items-center gap-2">
                        <BedDouble className="h-5 w-5" />
                        Edit Bed Group
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="groupName" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-[#268A64]" />
                                Bed Group Name
                            </Label>
                            <Input
                                id="groupName"
                                placeholder="Enter bed group name..."
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("groupName")}
                            />
                            {errors.groupName && <p className="text-red-500">{errors.groupName.message}</p>}
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
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
