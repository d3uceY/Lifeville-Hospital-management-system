import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User2, Filter, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

export function SymptomTypeSkeletonLoader() {
    const skeletonRowCount = 10; // Number of skeleton rows to show

    return (
        <div className="lg:p-6">
            <Card className="border-[#e0f0e8] shadow-sm py-0 overflow-hidden">
                <CardHeader className="pb-3 border-b border-[#e0f0e8] bg-[#f0f8f4] pt-6 flex items-center justify-between">
                    <CardTitle className="text-[#106041] flex items-center gap-2">
                        <User2 className="h-5 w-5" />
                        <Skeleton className="h-6 w-36" />
                    </CardTitle>
                    <Skeleton className="h-9 w-24" />
                </CardHeader>
                <CardContent className="md:p-6">
                    <div className="mb-6 bg-white rounded-lg border border-[#e0f0e8] p-4 shadow-sm">
                        <h3 className="text-sm font-medium text-[#106041] mb-3 flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <Skeleton className="h-5 w-16" />
                        </h3>
                        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-14" />
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                    <Skeleton className="h-10 w-full pl-9" />
                                </div>
                            </div>
                            {/* Add more skeleton filters if needed */}
                            <div className="space-y-2 hidden md:block">
                                <Skeleton className="h-4 w-14" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2 hidden xl:block">
                                <Skeleton className="h-4 w-14" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Skeleton className="h-9 w-28" />
                        </div>
                    </div>

                    <div className="rounded-md border border-[#e0f0e8] overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-[#f0f8f4]">
                                <TableRow className="hover:bg-[#e6f2ed] border-b border-[#e0f0e8]">
                                    {/* Adjust number/width of skeleton headers based on actual table */}
                                    <TableHead className="text-[#106041] font-medium">
                                        <Skeleton className="h-5 w-24" />
                                    </TableHead>
                                    <TableHead className="text-[#106041] font-medium">
                                        <Skeleton className="h-5 w-40" />
                                    </TableHead>
                                    <TableHead className="text-[#106041] font-medium">
                                        <Skeleton className="h-5 w-20" />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: skeletonRowCount }).map((_, index) => (
                                    <TableRow key={`skeleton-row-${index}`} className="hover:bg-[#e6f2ed] border-b border-[#e0f0e8]">
                                        <TableCell className="pl-5"><Skeleton className="h-5 w-auto" /></TableCell>
                                        <TableCell className="pl-5"><Skeleton className="h-5 w-auto" /></TableCell>
                                        <TableCell className="pl-5"><Skeleton className="h-5 w-auto" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-end space-x-2 py-4 px-6 bg-[#f9fcfa] border-t border-[#e0f0e8]">
                            <div className="flex-1">
                                <Skeleton className="h-5 w-28" />
                            </div>
                            <div className="space-x-2 flex">
                                <Skeleton className="h-9 w-20" />
                                <Skeleton className="h-9 w-20" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}