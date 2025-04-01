import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
export default function ChartSkeleton() {
    return (
        <Card className="flex flex-col flex-1 animate-pulse">
            <CardHeader className="items-center pb-0">
                <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="mx-auto aspect-square max-h-[320px] pb-0">
                    <div className="w-full h-[320px] bg-gray-300 rounded" />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
            </CardFooter>
        </Card>
    )
}
