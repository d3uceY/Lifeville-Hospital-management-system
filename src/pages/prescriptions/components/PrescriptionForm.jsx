"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContext";
import { createPrescription } from "../../../providers/ApiProviders";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

import { ClipboardList, FileText, Plus, Trash2, Save, X, Pill } from "lucide-react";

const schema = z.object({
  prescribed_by: z.string().nonempty({ message: "prescribed by is required" }),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        drug_name: z.string().nonempty({ message: "Drug name is required" }),
        dosage: z.string().optional(),
        frequency: z.string().optional(),
        duration: z.string().optional(),
        instructions: z.string().optional(),
      })
    )
    .min(1, { message: "At least one prescription item is required" }),
});

const FREQUENCIES = [
  { value: "once_daily", label: "Once daily (OD)" },
  { value: "twice_daily", label: "Twice daily (BD)" },
  { value: "three_times_daily", label: "Three times daily (TDS)" },
  { value: "four_times_daily", label: "Four times daily (QID)" },
  { value: "q6h", label: "Every 6 hours" },
  { value: "q8h", label: "Every 8 hours" },
  { value: "q12h", label: "Every 12 hours" },
  { value: "weekly", label: "Once weekly" },
  { value: "prn", label: "PRN (as needed)" },
  { value: "stat", label: "STAT (immediately)" },
];

export default function PrescriptionForm() {
  const { patient_id } = useParams();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isValid, errors },
    register,
    control,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      prescribed_by: user?.name || "",
      notes: "",
      items: [{ drug_name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addItem = () =>
    append({ drug_name: "", dosage: "", frequency: "", duration: "", instructions: "" });

  const removeItem = (index) => {
    if (fields.length > 1) remove(index);
  };

  const onSubmit = (values) => {
    const payload = {
      patient_id: Number(patient_id),
      prescribed_by: values.prescribed_by,
      notes: values.notes,
      items: values.items,
    };

    const promise = async () => {
      try {
        setIsSubmitting(true);
        const res = await createPrescription(payload);
        reset({
          recorded_by: user?.name || "",
          notes: "",
          items: [{ drug_name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
        });
        queryClient.invalidateQueries({ queryKey: ["patientPrescriptions", patient_id] });
        return res;
      } catch (err) {
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    };

    toast.promise(promise(), {
      loading: "Creating prescription...",
      success: () => "Prescription created successfully",
      error: (err) => err?.response?.data?.message || err?.message || "Failed to create prescription",
    });
  };

  return (
    <div className="container mx-auto py-8  max-w-5xl">
      {/* Header */}
      {/* <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-md shadow-sm">
        <div className="flex items-center">
          <Pill className="text-blue-500 mr-3" size={24} />
          <div>
            <h2 className="text-blue-800 font-medium text-lg">Create New Prescription</h2>
            <p className="text-blue-700 text-sm">Add medications and instructions for the patient</p>
          </div>
        </div>
      </div> */}

      <div className="mb-8 border-l-4 border-l-[#106041] pl-4 bg-[#f0f8f4] p-4 rounded-r-md shadow-sm">
        <h1 className="text-3xl font-bold">Prescription</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details to create a prescription for patient #{patient_id}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        {/* Prescription Info */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <ClipboardList size={20} />
              Prescription Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">Patient ID</Label>
                <Input disabled value={patient_id || ""} className="bg-gray-50 text-black border-[#268a6477]" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="recorded_by">
                  Prescribed By
                </Label>
                <Input
                  id="recorded_by"
                  className="text-black border-[#268a6477] bg-gray-50"
                  {...register("prescribed_by")}
                  disabled
                />
                {errors.prescribed_by && (
                  <p className="text-red-500 text-sm mt-1">{errors.prescribed_by.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescription Items */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <FileText size={20} />
              Prescription Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Item {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium mb-2 block text-gray-700">Drug Name</Label>
                    <Input
                      className="text-black border-[#268a6477]"
                      placeholder="e.g., Amoxicillin"
                      {...register(`items.${index}.drug_name`)}
                    />
                    {errors.items?.[index]?.drug_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.items[index].drug_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-gray-700">Dosage</Label>
                    <Input
                      className="text-black border-[#268a6477]"
                      placeholder="e.g., 500 mg"
                      {...register(`items.${index}.dosage`)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-gray-700">Frequency</Label>
                    <Controller
                      control={control}
                      name={`items.${index}.frequency`}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Common Frequencies</SelectLabel>
                              {FREQUENCIES.map((f) => (
                                <SelectItem key={f.value} value={f.value}>
                                  {f.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-gray-700">Duration</Label>
                    <Input
                      className="text-black border-[#268a6477]"
                      placeholder="e.g., 7 days"
                      {...register(`items.${index}.duration`)}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <Label className="text-sm font-medium mb-2 block text-gray-700">Instructions</Label>
                    <Input
                      className="text-black border-[#268a6477]"
                      placeholder="e.g., Take after meals"
                      {...register(`items.${index}.instructions`)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="w-full border-dashed border-2 border-[#106041] text-[#106041] hover:bg-[#106041] hover:text-white"
            >
              <Plus size={16} className="mr-2" />
              Add Another Item
            </Button>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <FileText size={20} />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="notes">
                Notes
              </Label>
              <Textarea
                id="notes"
                className="text-black border-[#268a6477] bg-gray-50 min-h-[100px]"
                placeholder="Any additional notes for this prescription..."
                {...register("notes")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-right mt-8 flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="px-6 py-2"
            onClick={() =>
              reset({
                recorded_by: user?.name || "",
                notes: "",
                items: [{ drug_name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
              })
            }
          >
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="px-6 py-2 bg-[#106041] text-white hover:bg-[#106041]/80"
          >
            <Save size={16} className="mr-2" />
            {isSubmitting ? "Saving..." : "Save Prescription"}
          </Button>
        </div>
      </form>
    </div>
  );
}
