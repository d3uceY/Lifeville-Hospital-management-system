import React from 'react'
import { formTabData, tabList } from '../components/forms/data/RegistrationFormData'
import { Save, ChevronLeft, ChevronRight } from "lucide-react";
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
import { useState } from 'react'

export default function Register() {

    const [tab, setTab] = useState(0)

    const handleNextTab = (e) => {
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

    return (
        <div>
            <form className=''>
                <Tabs defaultValue={tabList[0].value} value={tabList[tab].value} className="">
                    <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full !h-fit gap-1 bg-[#e8f9fd7c]">
                        {tabList.map((tab, index) => (
                            <TabsTrigger onClick={() => tabsTrigger(index)} key={tab.value} value={tab.value} className="flex justify-center items-center">
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
                        <Button onClick={handlePrevTab} type="button" variant="outline" className="border-[#268A63] text-[#268A63] hover:text-[#268A63] cursor-pointer flex items-center"><ChevronLeft className="size-4" /> <span>Previous</span></Button>
                    }
                    {
                        !(tab >= tabList.length - 1) &&
                        (<Button onClick={handleNextTab} className="bg-[#268A63] hover:bg-[#268a64e3] cursor-pointer flex items-center"><ChevronRight className="size-4" /> <span>Next</span></Button>)
                    }
                    <Button type="submit" className="bg-[#268A63] hover:bg-[#268a64e3] cursor-pointer flex items-center"><Save className="size-4" /> <span>Save changes</span></Button>

                </div>
            </form>
        </div>
    )
}