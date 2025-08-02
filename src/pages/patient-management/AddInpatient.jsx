import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { usePatientData, useDoctorData, useBeds, useSymptomTypes, useSymptomHeads } from "../../providers/ApiContextProvider"
import { createInpatient } from "../../providers/ApiProviders"
import { useNavigate } from "react-router-dom"
import { useInpatientAdmissions } from "../../providers/ApiContextProvider"

// Format date from this 2023-09-30T23:00:00.000Z to this 2023-09-30
import { formatForDateInput } from "../../helpers/formatForDateInput"

export default function AddInpatient() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedSymptomTypes, setSelectedSymptomTypes] = useState([]);
    const [selectedSymptomHeads, setSelectedSymptomHeads] = useState([]);
    const [symptomsDescription, setSymptomsDescription] = useState("");
    const { patientData } = usePatientData()
    const { doctors } = useDoctorData()
    const { beds } = useBeds()
    const { symptomTypes } = useSymptomTypes()
    const { symptomHeads } = useSymptomHeads()
    const navigate = useNavigate();
    const { refreshInpatientAdmissions } = useInpatientAdmissions()

    // Form validation schema
    const schema = z.object({
        patientId: z.string().min(1, "Patient is required"),
        admissionDate: z.string().nonempty({ message: "Admission date is required" }),
        note: z.string().optional(),
        previousMedicalIssue: z.string().optional(),
        symptomsDescription: z.string().optional(),
        symptomTypes: z.array(z.string()).optional(),
        bedGroup: z.string().optional(),
        bedNumber: z.string().optional(),
        consultantDoctorId: z.string().nonempty({ message: "Consultant Doctor is required" }),
    });




    //form methods that are going to be parsed throughout the form tree
    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            // Basic Information
            patientId: "",
            consultantDoctorId: "",
            admissionDate: formatForDateInput(new Date()),
            note: "",
            previousMedicalIssue: "",
            symptomsDescription: "",
            symptomTypes: [],
            bedGroup: "",
            bedNumber: "",
        },
    })

    //this is destructured from the methods variable
    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        control,
        setValue,
        watch,
    } = methods


    // Watch symptom description to keep our state in sync
    const watchedSymptomsDescription = watch("symptomsDescription");

    // Update the form's symptom description whenever our state changes
    useEffect(() => {

        setValue("symptomsDescription", symptomsDescription);
    }, [symptomsDescription, setValue]);


    // whenever the user checks/un-checks the boxes:
    useEffect(() => {
        // selected symptom types stores the id
        // filters symptom types with id to get name as string
        const symptomTypeValues = symptomTypes
            .filter((st) => selectedSymptomTypes
                .includes(st.symptom_type_id))
            .map((t) => t.symptom_text);

        setValue("symptomTypes", symptomTypeValues, { shouldValidate: true });
    }, [selectedSymptomTypes, setValue]);


    // Handle symptom type checkbox changes
    const handleSymptomTypeChange = (symptomTypeId, checked) => {
        let updatedSelectedTypes;

        if (checked) {
            updatedSelectedTypes = [...selectedSymptomTypes, symptomTypeId];
        } else {
            updatedSelectedTypes = selectedSymptomTypes.filter(id => id !== symptomTypeId);

            // Also unselect any symptom heads of this type
            const headsToRemove = symptomHeads
                .filter(head => head.symptom_type_id === symptomTypeId)
                .map(head => head.symptom_head_id);

            if (headsToRemove.length > 0) {
                const updatedHeads = selectedSymptomHeads.filter(
                    id => !headsToRemove.includes(id)
                );
                setSelectedSymptomHeads(updatedHeads);

                // Update the description by removing descriptions of unselected heads
                let newDescription = symptomsDescription;
                headsToRemove.forEach(headId => {
                    const head = symptomHeads.find(h => h.symptom_head_id === headId);
                    if (head) {
                        newDescription = newDescription.replace(`${head.symptom_head}: ${head.symptom_description}\n\n`, "");
                    }
                });
                setSymptomsDescription(newDescription);
            }
        }

        setSelectedSymptomTypes(updatedSelectedTypes);
    };

    // Handle symptom head checkbox changes
    const handleSymptomHeadChange = (symptomHeadId, checked) => {
        const symptomHead = symptomHeads.find(head => head.symptom_head_id === symptomHeadId);

        if (checked) {
            setSelectedSymptomHeads([...selectedSymptomHeads, symptomHeadId]);

            // Add description to textarea
            const descriptionToAdd = `${symptomHead.symptom_head}: ${symptomHead.symptom_description}\n\n`;
            setSymptomsDescription(prev => prev + descriptionToAdd);
        } else {
            setSelectedSymptomHeads(selectedSymptomHeads.filter(id => id !== symptomHeadId));

            // Remove description from textarea
            const descriptionToRemove = `${symptomHead.symptom_head}: ${symptomHead.symptom_description}\n\n`;
            setSymptomsDescription(prev => prev.replace(descriptionToRemove, ""));
        }
    };




    const onSubmit = async (values) => {

        const payload = {
            ...values,
            patientId: Number(values.patientId),
            consultantDoctorId: Number(values.consultantDoctorId)
        }

        const promise = async () => {
            try {
                setIsSubmitting(true)
                const response = await createInpatient(payload)
                navigate('/inpatients')
                refreshInpatientAdmissions()
                return response;
            } catch (err) {
                console.error(err)
                throw err;
            } finally {
                setIsSubmitting(false)
            }
        }

        toast.promise(promise(), {
            loading: 'Adding inpatient...',
            success: (data) => `${data.message}`,
            error: (err) => `An error occurred (${err?.response?.data?.message}, ${err?.message})`
        });
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <title>Lifeville HMS - Add Inpatient</title>
            <div className="mb-8 border-l-4  pl-4 bg-[#f0f8f4] p-4 rounded-r-md shadow-sm">
                <h1 className="text-3xl font-bold ">
                    Add Inpatient
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative">
                {/* Inpatient Information */}
                <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
                    <CardHeader className="bg-[#f0f8f4] border-b ">
                        <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
                            Inpatient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="patientId">
                                    Patient
                                </Label>
                                <Controller
                                    name="patientId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger className="w-full border-[#268a6477] bg-gray-50">
                                                <SelectValue placeholder="Select patient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Patients</SelectLabel>
                                                    {patientData?.map((patient) => (
                                                        <SelectItem key={patient.patient_id} value={`${patient.patient_id}`}>
                                                            {patient.first_name} {patient.surname} ({patient.hospital_number})
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.patientId && <p className="text-red-500 text-sm mt-1">{errors.patientId.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="admission_date">
                                    Admission Date
                                </Label>
                                <Input
                                    className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                    id="admission_date"
                                    type="date"
                                    {...register("admissionDate")}
                                />
                                {errors.admissionDate && <p className="text-red-500 text-sm mt-1">{errors.admissionDate.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="consultantDoctorId">
                                    Consultant Doctor
                                </Label>
                                <Controller
                                    name="consultantDoctorId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger className="w-full border-[#268a6477] bg-gray-50">
                                                <SelectValue placeholder="Select doctor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Doctors</SelectLabel>
                                                    {doctors?.map((doctor) => (
                                                        <SelectItem key={doctor.doctor_id} value={`${doctor.doctor_id}`}>
                                                            {doctor.first_name} {doctor.last_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.consultantDoctorId && <p className="text-red-500 text-sm mt-1">{errors.consultantDoctorId.message}</p>}
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="bedNumber">
                                    Bed
                                </Label>
                                <Controller
                                    name="bedNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                                            <SelectTrigger className="w-full border-[#268a6477] bg-gray-50">
                                                <SelectValue placeholder="Select bed" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Beds</SelectLabel>
                                                    {beds?.map((bed) => (
                                                        <SelectItem key={bed.id} value={bed.bed_name + " " + bed.bed_group}>
                                                            {bed.bed_name} ({bed.bed_group})
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.bedNumber && <p className="text-red-500 text-sm mt-1">{errors.bedNumber.message}</p>}
                            </div>
                        </div>

                        {/* Symptom Types Selection */}
                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700">
                                Symptom Types
                            </Label>
                            <div className="border w-fit md:w-full border-[#268a6477] bg-gray-50 rounded-md p-3">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[20rem] md:max-w-full max-h-[10rem] overflow-y-auto">
                                    {symptomTypes.map((type) => (
                                        <div key={type.symptom_type_id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`symptom-type-${type.symptom_type_id}`}
                                                checked={selectedSymptomTypes.includes(type.symptom_type_id)}
                                                onCheckedChange={(checked) => handleSymptomTypeChange(type.symptom_type_id, checked)}
                                            />
                                            <label
                                                htmlFor={`symptom-type-${type.symptom_type_id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {type.symptom_text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {errors.symptomTypes && <p className="text-red-500 text-sm mt-1">{errors.symptomTypes.message}</p>}
                            {/* keep RHF aware of your array */}
                            <input type="hidden" {...register("symptomTypes")} />
                        </div>

                        {/* Symptom Heads Selection - Only show for selected symptom types */}
                        {selectedSymptomTypes.length > 0 && (
                            <div className="mt-6">
                                <Label className="text-sm font-medium mb-2 block text-gray-700">
                                    Symptom Details
                                </Label>
                                <div className="border border-[#268a6477] bg-gray-50 rounded-md p-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {symptomHeads
                                            .filter(head => selectedSymptomTypes.includes(head.symptom_type_id))
                                            .map((head) => (
                                                <div key={head.symptom_head_id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`symptom-head-${head.symptom_head_id}`}
                                                        checked={selectedSymptomHeads.includes(head.symptom_head_id)}
                                                        onCheckedChange={(checked) => handleSymptomHeadChange(head.symptom_head_id, checked)}
                                                    />
                                                    <label
                                                        htmlFor={`symptom-head-${head.symptom_head_id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {head.symptom_head}
                                                    </label>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="symptomsDescription">
                                Symptoms Description
                            </Label>
                            <Controller
                                name="symptomsDescription"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[120px]"
                                        id="symptomsDescription"
                                        {...field}                           // field.value & field.onChange
                                        onChange={(e) => {
                                            field.onChange(e);               // update RHF form state
                                            setSymptomsDescription(e.target.value); // keep your local state in sync
                                        }}
                                    />
                                )}
                            />
                            {errors.symptomsDescription && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.symptomsDescription.message}
                                </p>
                            )}

                        </div>

                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="note">
                                Note
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                                id="note"
                                {...register("note")}
                            />
                            {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>}
                        </div>

                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="previousMedicalIssue">
                                Previous Medical Issue
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="previousMedicalIssue"
                                {...register("previousMedicalIssue")}
                            />
                            {errors.previousMedicalIssue && <p className="text-red-500 text-sm mt-1">{errors.previousMedicalIssue.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="text-right mt-8 flex items-center justify-end gap-4">
                    <button
                        type="button"
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="px-6 py-2 bg-[#106041] text-white rounded-md hover:bg-[#106041]/80 flex items-center gap-2"
                    >
                        Add Inpatient
                    </Button>
                </div>
            </form>
        </div>
    )
}

