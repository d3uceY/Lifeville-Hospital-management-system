" "

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function PatientProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl animate-pulse">
      {/* Header */}
      <div className="mb-8 border-l-4  pl-4">
        <div className="h-8 w-64 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-40 bg-gray-300 rounded"></div>
      </div>

      {/* Basic Information Section */}
      <Card className="pt-0 mb-8 shadow-sm">
        <CardHeader className="bg-[#f0f8f4] border-b ">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Date:
              </Label>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Hospital Number:
              </Label>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Surname:
              </Label>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                First Name:
              </Label>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Other Names:
              </Label>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Section */}
      <Card className="pt-0 mb-8 shadow-sm">
        <CardHeader className="bg-[#f0f8f4] border-b ">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Sex", "Marital Status", "Date of Birth", "Phone Number"].map(
              (label) => (
                <div key={label}>
                  <Label className="text-sm font-medium mb-2 block text-gray-700">
                    {label}:
                  </Label>
                  <div className="h-10 w-full bg-gray-300 rounded"></div>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Address:
              </Label>
              <div className="h-20 w-full bg-gray-300 rounded"></div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Occupation:
              </Label>
              <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Address of Place of Work:
              </Label>
              <div className="h-20 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographic Information Section */}
      <Card className="pt-0 mb-8 shadow-sm">
        <CardHeader className="bg-[#f0f8f4] border-b ">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Religion", "Nationality"].map((label) => (
              <div key={label}>
                <Label className="text-sm font-medium mb-2 block text-gray-700">
                  {label}:
                </Label>
                <div className="h-10 w-full bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next of Kin Section */}
      <Card className="pt-0 mb-8 shadow-sm">
        <CardHeader className="bg-[#f0f8f4] border-b ">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Next of Kin", "Relationship", "Next of Kin Phone Number"].map(
              (label) => (
                <div key={label}>
                  <Label className="text-sm font-medium mb-2 block text-gray-700">
                    {label}:
                  </Label>
                  <div className="h-10 w-full bg-gray-300 rounded"></div>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                Address of Next of Kin:
              </Label>
              <div className="h-20 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History Section */}
      <Card className="pt-0 mb-8 shadow-sm">
        <CardHeader className="bg-[#f0f8f4] border-b ">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
        </CardHeader>
        <CardContent className="pt-6">
          {[
            "Past Medical History",
            "Past Surgical History",
            "Family History",
            "Social History",
            "Drug History",
          ].map((label) => (
            <div key={label} className="mb-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                {label}:
              </Label>
              <div className="h-24 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Allergies Section */}
      <Card className="pt-0 shadow-sm">
        <CardHeader className="bg-[#f0f8f4] border-b ">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
        </CardHeader>
        <CardContent className="pt-6">
          {[
            "Any Allergies?",
            "Any Dietary Restrictions",
            "Specify Diet Allergies to Certain Drugs",
          ].map((label) => (
            <div key={label} className="mb-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700">
                {label}:
              </Label>
              <div className="h-24 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
