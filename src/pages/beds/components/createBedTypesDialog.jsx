import { useBeds } from "../../../providers/ApiContextProvider";
import { createBedType } from "../../../providers/ApiProviders";
import { useState } from "react";
import { FilePlus, BedDouble, FileText } from "lucide-react";
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

export function CreateBedTypeDialog() {
    const { refreshBedTypes } = useBeds();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    const schema = z.object({
        typeName: z.string().nonempty({ message: "Bed type name is required" }),
    });

    const { register, formState: { isValid, errors }, handleSubmit } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            typeName: "",
        }
    });

    const onSubmit = (data) => {
        const promise = async () => {
            setIsSubmitting(true);
            try {
                const response = await createBedType(data);
                setOpen(false);
                refreshBedTypes();
                return response;
            } catch (error) {
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: 'Creating bed type...',
            success: (data) => `${data.message}`,
            error: (err) => err.response?.data?.message || err?.message || 'An error occurred'
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#106041] hover:bg-[#0d4e34]">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create Bed Type
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-auto border-[#e0f0e8]">
                <DialogHeader>
                    <DialogTitle className="text-[#106041] flex items-center gap-2">
                        <BedDouble className="h-5 w-5" />
                        Create Bed Type
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="bedType" className="text-gray-700 flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-[#268A64]" />
                                Bed Type Name
                            </Label>
                            <Input
                                id="typeName"
                                placeholder="Enter bed type name..."
                                required
                                className="border-[#268a6461] focus:ring-[#268a6429] focus:border-[#268a64]"
                                {...register("typeName")}
                            />
                            {errors.typeName && <p className="text-red-500">{errors.typeName.message}</p>}
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
