import React from 'react'
import { RegistrationFormList } from '../components/forms/registrationForm'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


export default function Register() {

    const [RegistrationForm,
        ContactInformationForm,
        DemographicForm,
        NextOfKinForm,
        MedicalHistoryForm,
        Allergies] = RegistrationFormList

    const formTabData = [
        {
            component: RegistrationForm,
            title: "Basic Information",
            cardDescription: "Enter basic registration details such as date, hospital number, and full name."
        },
        {
            component: [ContactInformationForm, DemographicForm],
            title: "Contact & Demographic Details",
            cardDescription: "Provide gender, marital status, date of birth, phone number, address, occupation, and workplace address."
        },
        {
            component: NextOfKinForm,
            title: "Next of Kin / Emergency Contact",
            cardDescription: "Enter details for your emergency contact including name, relationship, address, and phone number."
        },
        {
            component: MedicalHistoryForm,
            title: "Medical History",
            cardDescription: "Record your past medical, surgical, family, social, and drug history."
        },
        {
            component: Allergies,
            title: "Allergies & Dietary Restrictions",
            cardDescription: "Specify any allergies and dietary restrictions, including details on drug or food allergies."
        }
    ];

    const tabList = [
        { value: "basic-info", name: "Basic Information" },
        { value: "contact", name: "Contact & Demographic Details" },
        { value: "kin", name: "Next of Kin / Emergency Contact" },
        { value: "medical", name: "Medical History" },
        { value: "allergies", name: "Allergies & Dietary Restrictions" }

    ];

    return (
        <div>
            <Tabs defaultValue="basic-info" className="">
                <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full !h-fit gap-1">

                    {tabList.map((tab, index) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="flex justify-center items-center">
                            <span className='text-[#268A63] '>{index + 1}.</span>  <span>{tab.name}</span>
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
                                    {Array.isArray(tab.component)
                                        ? tab.component.map((component, idx) => React.createElement(component, { key: idx }))
                                        : React.createElement(tab.component)}
                                </CardContent>
                                <CardFooter>
                                    <Button>Save changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    ))
                }
            </Tabs>
        </div>
    )
}
