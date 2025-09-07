import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export function TableSkeleton({
  headerCount = 9, 
  rowCount = 5,
  title = "Loading...",
  icon,
  showPagination = true,
  className = "",
}) {
  return (
    <div className={className}>
      <Card className="shadow-sm py-0 overflow-hidden">
        <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {icon && <div className="h-5 w-5">{icon}</div>}
            {title && <Skeleton className="h-6 w-32" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="md:p-6 p-2">
          <div className="rounded-md border overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-[#f0f8f4]">
                <TableRow>
                  {Array.from({ length: headerCount }).map((_, index) => (
                    <TableHead key={index} className="font-medium">
                      <Skeleton className="h-6 w-20" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.from({ length: headerCount }).map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="pl-5">
                        <Skeleton 
                          className={`h-4 ${
                            cellIndex === 0 ? 'w-24' : 
                            cellIndex === 1 ? 'w-20' : 
                            cellIndex === 2 ? 'w-32' : 
                            cellIndex === headerCount - 1 ? 'w-16' : 
                            'w-28'
                          }`}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {showPagination && (
              <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t">
                <div className="flex-1 text-sm text-gray-500">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-x-2 flex">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TableSkeleton;