import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { formTabData, tabList } from '../components/forms/data/RegistrationFormData';

export default function Register() {
    const [currentTabValue, setCurrentTabValue] = useState(tabList[0].value);
    const currentIndex = tabList.findIndex(tab => tab.value === currentTabValue);

    const handleNext = () => {
        if (currentIndex < tabList.length - 1) {
            setCurrentTabValue(tabList[currentIndex + 1].value);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentTabValue(tabList[currentIndex - 1].value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted');
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <Tabs value={currentTabValue} onValueChange={setCurrentTabValue}>
                    <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full h-fit gap-1 mb-4">
                        {tabList.map((tab, index) => (
                            <TabsTrigger 
                                key={tab.value} 
                                value={tab.value}
                                className="flex justify-center items-center p-2"
                            >
                                <span className='text-[#268A63] mr-1'>{index + 1}.</span>
                                <span className="truncate">{tab.name}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {formTabData.map((tab, index) => (
                        <TabsContent key={tabList[index].value} value={tabList[index].value}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{tab.title}</CardTitle>
                                    <CardDescription>{tab.cardDescription}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {Array.isArray(tab.component)
                                        ? tab.component.map((Component, idx) => (
                                            <Component key={idx} />
                                        ))
                                        : <tab.component />}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>

                <div className="mt-4 flex gap-2 justify-end">
                    {currentIndex > 0 && (
                        <Button 
                            type="button"
                            onClick={handlePrevious}
                            variant="outline"
                        >
                            Previous
                        </Button>
                    )}
                    {currentIndex < tabList.length - 1 ? (
                        <Button type="button" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button type="submit">Submit</Button>
                    )}
                </div>
            </form>
        </div>
    );
}