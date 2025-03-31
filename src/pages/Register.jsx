import React from 'react'
import { useState } from 'react'

//api
import { registerPatient } from '../providers/ApiProviders';

//form data
import {
    formTabData,
    tabList
} from '../components/forms/data/RegistrationFormData'

//icons
import {
    Save,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

//button
import { Button } from "@/components/ui/button"

//card component
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

//tab components
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    useForm,
    FormProvider
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { toast, Toaster } from 'sonner';



export default function Register() {


    const [tab, setTab] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNextTab = async (e) => {
        e.preventDefault()
        setTab((prev) => prev + 1)
    }

    const handlePrevTab = (e) => {
        e.preventDefault()
        setTab((prev) => prev - 1)
    }

    const tabsTrigger = (index) => {
        setTab(index)
    }

    const onSubmit = async (data) => {
        const promise = async () => {
            try {
                setIsSubmitting(true);
                const response = await registerPatient(data);
                return response.data; // Resolving the response data
            } catch (err) {
                throw err; // Throwing error to be caught by `toast.promise`
            } finally {
                setIsSubmitting(false);
            }
        };

        toast.promise(promise(), {
            loading: 'Registering patient...',
            success: (data) => `${data.message}`, // Display success message from response
            error: (err) => err.response?.data?.message || 'An error occurred', // Display error message
        });
    };


    const schema = z.object({
        // Required Fields
        date: z.string().nonempty({ message: "Date is required" }),
        hospitalNumber: z.string().nonempty({ message: "Hospital number is required" }),
        surname: z.string().nonempty({ message: "Surname is required" }),
        firstName: z.string().nonempty({ message: "First name is required" }),
        otherNames: z.string().nonempty({ message: "Other names are required" }),
        sex: z.string().nonempty({ message: "Sex is required" }),
        dateOfBirth: z.string().nonempty({ message: "Date of birth is required" }),
        phoneNumber: z.string().nonempty({ message: "Phone number is required" })
            .regex(/^\+?\d{7,15}$/, { message: "Enter a valid phone number (7-15 digits, optional +)" }),
        address: z.string().nonempty({ message: "Address is required" }),
        nationality: z.string().nonempty({ message: "Nationality is required" }),
        nextOfKin: z.string().nonempty({ message: "Next of kin is required" }),
        relationship: z.string().nonempty({ message: "Relationship is required" }),
        nextOfKinPhoneNumber: z.string().nonempty({ message: "Next of kin phone number is required" })
            .regex(/^\+?\d{7,15}$/, { message: "Enter a valid phone number (7-15 digits, optional +)" }),
        addressOfNextOfKin: z.string().nonempty({ message: "Address of next of kin is required" }),

        // Optional Fields
        maritalStatus: z.string().optional(),
        occupation: z.string().optional(),
        placeOfWorkAddress: z.string().optional(),
        religion: z.string().optional(),
        pastMedicalHistory: z.string().optional(),
        pastSurgicalHistory: z.string().optional(),
        familyHistory: z.string().optional(),
        socialHistory: z.string().optional(),
        drugHistory: z.string().optional(),
        allergies: z.string().optional(),
        dietaryRestrictions: z.string().optional(),
        dietAllergies: z.string().optional(),
    });

    //form methods that are going to be parsed throughout the form tree
    const methods = useForm({
        mode: "onChange",
        shouldUnregister: false, // Keep unmounted fields in the form state
        resolver: zodResolver(schema),
        defaultValues: {
            // Basic Information
            date: '',
            hospitalNumber: '',
            surname: '',
            firstName: '',
            otherNames: '',

            // Contact Information
            sex: '',
            maritalStatus: '',
            dateOfBirth: '',
            phoneNumber: '',
            address: '',
            occupation: '',
            placeOfWorkAddress: '',

            // Demographic Information
            religion: '',
            nationality: '',

            // Next of Kin / Emergency Contact
            nextOfKin: '',
            relationship: '',
            nextOfKinPhoneNumber: '',
            addressOfNextOfKin: '',

            // Medical History
            pastMedicalHistory: '',
            pastSurgicalHistory: '',
            familyHistory: '',
            socialHistory: '',
            drugHistory: '',

            // Allergies & Dietary Restrictions
            allergies: '',
            dietaryRestrictions: '',
            dietAllergies: ''
        }
    });

    //this is destructured from the methods variable
    const { handleSubmit, formState: { isValid } } = methods;
    console.log(isValid)
    return (
        <div>
            <FormProvider {...methods}>
                <form className='' onSubmit={handleSubmit(onSubmit)}>
                    <Tabs defaultValue={tabList[0].value} value={tabList[tab].value} className="">
                        <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full !h-fit gap-1 bg-[#268a6485]">
                            {tabList.map((tab, index) => (
                                <TabsTrigger onClick={() => tabsTrigger(index)} key={tab.value} value={tab.value} className="flex justify-center items-center text-white data-[state=active]:!text-[black]">
                                    <span className=' '>{index + 1}.</span>  <span className=''>{tab.name}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {
                            formTabData.map((tab, index) => (
                                <TabsContent key={index} value={tabList[index].value} className="!w-full">
                                    <Card className=" w-full">
                                        <CardHeader className="mb-5">
                                            <CardTitle>{tab.title}</CardTitle>
                                            <CardDescription>
                                                {tab.cardDescription}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            {
                                                //just in case the component key is an array of components
                                                //map components into the dom or else justr render the fucking component
                                                Array.isArray(tab.component)
                                                    ? tab.component.map((component, idx) => React.createElement(component, { key: idx }))
                                                    : React.createElement(tab.component)
                                            }
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))
                        }
                    </Tabs>
                    <div className="flex gap-2 mt-6 w-fit ml-auto">
                        {
                            (tab > 0) &&
                            <Button onClick={handlePrevTab} type="button" variant="outline" className="green-button-outline"><ChevronLeft className="size-4" /> <span>Previous</span></Button>
                        }
                        {
                            !(tab >= tabList.length - 1) &&
                            (<Button onClick={handleNextTab} className="green-button"><ChevronRight className="size-4" /> <span>Next</span></Button>) ||
                            (<Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                                className="green-button">
                                <Save className="size-4" />
                                <span>
                                    Save changes
                                </span>
                            </Button>)
                        }
                        <Toaster richColors />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}