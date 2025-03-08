import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { nationalities } from './data/RegistrationFormData';
import { useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Basic Information Section
export function RegistrationForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="md:grid-cols-2 grid grid-cols gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="hospitalNumber">Hospital Number</Label>
          <Input
            id="hospitalNumber"
            type="number"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("hospitalNumber", { required: "Hospital number is required" })}
          />
          {errors.hospitalNumber && <p className="text-red-500 text-sm mt-1">{errors.hospitalNumber.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="otherNames">Other Names</Label>
          <Input
            id="otherNames"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("otherNames")}
          />
        </div>
      </div>
    </div>
  );
}

// Contact Information Section
export function ContactInformationForm() {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="md:grid-cols-4 grid grid-cols gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="sex">Sex</Label>
          <Select
            onValueChange={(value) => {
              setValue("sex", value); // Update form state
              trigger("sex"); // Trigger validation
            }}
          >
            <SelectTrigger
              className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            >
              <SelectValue placeholder="Select a Sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>}
        </div>


        <div className="form-group">
          <Label className="mb-3" htmlFor="maritalStatus">Marital Status</Label>
          <Input
            id="maritalStatus"
            type="text"
            placeholder="eg. single, married"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("maritalStatus")}
          />
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("dateOfBirth", { required: "Date of birth is required" })}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="text"
            placeholder="eg. 0701234567"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{7,15}$/, // Allows optional "+" followed by 7-15 digits
                message: "Enter a valid phone number (7-15 digits, optional +)",
              },
            })}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="address">Address</Label>
        <Textarea
          id="address"
          placeholder="Type address here"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="occupation">Occupation</Label>
        <Input
          id="occupation"
          type="text"
          placeholder="Type occupation here"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("occupation")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="placeOfWorkAddress">Address of Place of Work</Label>
        <Textarea
          id="placeOfWorkAddress"
          placeholder="Type place of work address"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("placeOfWorkAddress")}
        />
      </div>
    </div>
  );
}

// Demographic Information Section
export function DemographicForm() {

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div className="form-group">
        <Label className="mb-3" htmlFor="religion">Religion</Label>
        <Select
          onValueChange={(value) => setValue("religion", value)}
          defaultValue=""
        >
          <SelectTrigger
            className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          >
            <SelectValue placeholder="Select religion" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Religion</SelectLabel>
              <SelectItem value="christian">Christian</SelectItem>
              <SelectItem value="muslim">Muslim</SelectItem>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="form-group">
        <Label className="mb-3" htmlFor="nationality">Nationality</Label>
        <Select
          onValueChange={(value) => {
            setValue("nationality", value); // Update form state
            trigger("nationality"); // Validate field
          }}
        >
          <SelectTrigger
            className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          >
            <SelectValue placeholder="Select the nationality" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              {nationalities.map((nationality, index) => (
                <SelectItem key={index} value={nationality}>
                  {nationality}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent> 
        </Select>
        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
      </div>    </div>
  );
}

// Next of Kin Section
export function NextOfKinForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="nextOfKin">Next of Kin</Label>
          <Input
            id="nextOfKin"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("nextOfKin", { required: "Next of kin is required" })}
          />
          {errors.nextOfKin && <p className="text-red-500 text-sm mt-1">{errors.nextOfKin.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="relationship">Relationship</Label>
          <Input
            id="relationship"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("relationship", { required: "Relationship is required" })}
          />
          {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="nextOfKinPhoneNumber">Next of Kin Phone Number</Label>

          <Input
            id="nextOfKinPhoneNumber"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("nextOfKinPhoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{7,15}$/, // Allows optional "+" followed by 7-15 digits
                message: "Enter a valid phone number (7-15 digits, optional +)",
              },
            })}
          />

          {errors.nextOfKinPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.nextOfKinPhoneNumber.message}</p>}
        </div>
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="addressOfNextOfKin">Address of Next of Kin</Label>
        <Textarea
          id="addressOfNextOfKin"
          placeholder="Type address of next of kin"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("addressOfNextOfKin", { required: "Address is required" })}
        />
        {errors.addressOfNextOfKin && <p className="text-red-500 text-sm mt-1">{errors.addressOfNextOfKin.message}</p>}
      </div>
    </div>
  );
}

// Medical History Section
export function MedicalHistoryForm() {
  const { register } = useFormContext();

  return (
    <div>
      <div className="form-group">
        <Label className="mb-3" htmlFor="pastMedicalHistory">Past Medical History</Label>
        <Textarea
          id="pastMedicalHistory"
          placeholder="Enter past medical history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("pastMedicalHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="pastSurgicalHistory">Past Surgical History</Label>
        <Textarea
          id="pastSurgicalHistory"
          placeholder="Enter past surgical history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("pastSurgicalHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="familyHistory">Family History</Label>
        <Textarea
          id="familyHistory"
          placeholder="Enter family history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("familyHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="socialHistory">Social History</Label>
        <Textarea
          id="socialHistory"
          placeholder="Enter social history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("socialHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="drugHistory">Drug History</Label>
        <Textarea
          id="drugHistory"
          placeholder="Enter drug history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("drugHistory")}
        />
      </div>
    </div>
  );
}

// Allergies Section
export function Allergies() {
  const { register } = useFormContext();

  return (
    <div>
      <div className="form-group">
        <Label className="mb-3" htmlFor="allergies">Any Allergies?</Label>
        <Textarea
          id="allergies"
          placeholder="List any allergies"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("allergies")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="dietaryRestrictions">Any Dietary Restrictions</Label>
        <Textarea
          id="dietaryRestrictions"
          placeholder="List any dietary restrictions"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("dietaryRestrictions")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="dietAllergies">Specify Diet Allergies to Certain Drugs</Label>
        <Textarea
          id="dietAllergies"
          placeholder="Specify diet-related drug allergies"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("dietAllergies")}
        />
      </div>
    </div>
  );
}

export const RegistrationFormList = [
  RegistrationForm,
  ContactInformationForm,
  DemographicForm,
  NextOfKinForm,
  MedicalHistoryForm,
  Allergies
];