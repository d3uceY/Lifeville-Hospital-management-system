import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { nationalities } from '../../components/forms/data/RegistrationFormData';

export default function PatientProfile() {
  return (
    <div className="p-4">
      {/* Basic Information Section */}
      <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
      <Separator className="my-4" />
      <div className="md:grid-cols-2 grid gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="date">Date</Label>
          <Input id="date" type="date" value="2025-04-01" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="hospitalNumber">Hospital Number</Label>
          <Input id="hospitalNumber" type="number" value="123456" disabled />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="form-group">
          <Label className="mb-3" htmlFor="surname">Surname</Label>
          <Input id="surname" type="text" value="Doe" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" value="John" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="otherNames">Other Names</Label>
          <Input id="otherNames" type="text" value="Michael" disabled />
        </div>
      </div>

      {/* Contact Information Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Information</h2>
      <Separator className="my-4" />
      <div className="md:grid-cols-4 grid gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="sex">Sex</Label>
          <Input id="sex" type="text" value="Male" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="maritalStatus">Marital Status</Label>
          <Input id="maritalStatus" type="text" value="Single" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" value="1990-01-01" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" type="text" value="+1234567890" disabled />
        </div>
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="address">Address</Label>
        <Textarea id="address" value="123 Main St, City" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="occupation">Occupation</Label>
        <Input id="occupation" type="text" value="Software Engineer" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="placeOfWorkAddress">Address of Place of Work</Label>
        <Textarea id="placeOfWorkAddress" value="456 Company Rd, City" disabled />
      </div>

      {/* Demographic Information Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Demographic Information</h2>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="religion">Religion</Label>
          <Input id="religion" type="text" value="Christian" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            type="text"
            // Displaying the first nationality from the list for demo purposes
            value={nationalities[0] || "Nationality"}
            disabled
          />
        </div>
      </div>

      {/* Next of Kin Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Next of Kin</h2>
      <Separator className="my-4" />
      <div className="grid grid-cols-3 gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="nextOfKin">Next of Kin</Label>
          <Input id="nextOfKin" type="text" value="Jane Doe" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="relationship">Relationship</Label>
          <Input id="relationship" type="text" value="Sister" disabled />
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="nextOfKinPhoneNumber">Next of Kin Phone Number</Label>
          <Input id="nextOfKinPhoneNumber" type="text" value="+0987654321" disabled />
        </div>
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="addressOfNextOfKin">Address of Next of Kin</Label>
        <Textarea id="addressOfNextOfKin" value="789 Kin St, City" disabled />
      </div>

      {/* Medical History Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Medical History</h2>
      <Separator className="my-4" />
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="pastMedicalHistory">Past Medical History</Label>
        <Textarea id="pastMedicalHistory" value="No significant history" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="pastSurgicalHistory">Past Surgical History</Label>
        <Textarea id="pastSurgicalHistory" value="Appendectomy in 2010" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="familyHistory">Family History</Label>
        <Textarea id="familyHistory" value="History of diabetes" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="socialHistory">Social History</Label>
        <Textarea id="socialHistory" value="Non-smoker" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="drugHistory">Drug History</Label>
        <Textarea id="drugHistory" value="No known drug allergies" disabled />
      </div>

      {/* Allergies Section */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Allergies</h2>
      <Separator className="my-4" />
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="allergies">Any Allergies?</Label>
        <Textarea id="allergies" value="Peanuts" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="dietaryRestrictions">Any Dietary Restrictions</Label>
        <Textarea id="dietaryRestrictions" value="Gluten" disabled />
      </div>
      <div className="form-group mt-4">
        <Label className="mb-3" htmlFor="dietAllergies">Specify Diet Allergies to Certain Drugs</Label>
        <Textarea id="dietAllergies" value="None" disabled />
      </div>
    </div>
  );
}
