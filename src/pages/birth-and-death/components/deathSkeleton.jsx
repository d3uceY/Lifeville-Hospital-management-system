import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User2 } from "lucide-react"

export default function DeathSkeleton() {
    return (
        <div className="p-6 border">
            <Card className="border-[#e0f0e8] shadow-sm ">
                <CardHeader className="pb-3 p-0 border-b border-[#e0f0e8] bg-[#f0f8f4]">
                    <CardTitle className="text-[#106041] flex items-center gap-2">
                        <User2 className="h-5 w-5" />
                        Patients
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="animate-pulse">
                        <div className="flex items-center gap-3 mb-6">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="h-10 w-1/4 bg-gray-200 rounded-md"></div>
                            ))}
                        </div>

                        <div className="overflow-x-auto rounded-md border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Array.from({ length: 7 }).map((_, idx) => (
                                            <th key={idx} className="px-6 py-3">
                                                <div className="h-5 bg-gray-200 rounded w-20 mx-auto"></div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Array.from({ length: 7 }).map((_, cellIndex) => (
                                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}
