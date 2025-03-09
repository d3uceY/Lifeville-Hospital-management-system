import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { nationalities } from './data/RegistrationFormData';
import { useFormContext, Controller } from 'react-hook-form';
import { Asterisk } from 'lucide-react';

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
          <Label className="mb-3" htmlFor="date">
            Date <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="date"
            type="date"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("date")}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="hospitalNumber">
            Hospital Number <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="hospitalNumber"
            type="number"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("hospitalNumber")}
          />
          {errors.hospitalNumber && <p className="text-red-500 text-sm mt-1">{errors.hospitalNumber.message}</p>}
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3 mt-4'>
        <div className="form-group">
          <Label className="mb-3" htmlFor="surname">
            Surname <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="surname"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("surname")}
          />
          {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="firstName">
            First Name <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="firstName"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("firstName")}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <Label className="mb-3" htmlFor="otherNames">
            Other Names <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="otherNames"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("otherNames")}
          />
          {errors.otherNames && <p className="text-red-500 text-sm mt-1">{errors.otherNames.message}</p>}
        </div>
      </div>
    </div>
  );
}

// Contact Information Section
export function ContactInformationForm() {
  const { register, setValue, trigger, watch, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="md:grid-cols-4 grid grid-cols gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="sex">
            Sex <Asterisk color="red" size={10} />
          </Label>
          <Controller
            name="sex"
            control={useFormContext().control}
            // rules={{ required: "Sex is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value || ""}
              >
                <SelectTrigger className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
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
            )}
          />
          {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="maritalStatus">
            Marital Status <Asterisk color="red" size={10} />
          </Label>
          <Controller
            name="maritalStatus"
            control={useFormContext().controll}
            rules={{ required: "Marital Status is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value || ""}
              >
                <SelectTrigger className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Marital Status</SelectLabel>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="dateOfBirth">
            Date of Birth <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="phoneNumber">
            Phone Number <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="phoneNumber"
            type="text"
            placeholder="eg. 0701234567"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("phoneNumber", {
              pattern: {
                value: /^\+?\d{7,15}$/,
                message: "Enter a valid phone number (7-15 digits, optional +)",
              },
            })}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="address">
          Address <Asterisk color="red" size={10} />
        </Label>
        <Textarea
          id="address"
          placeholder="Type address here"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("address")}
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
  const { formState: { errors } } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div className="form-group">
        <Label className="mb-3" htmlFor="religion">Religion</Label>
        <Controller
          name="religion"
          control={useFormContext().control}
          // rules={{ required: "Religion is required" }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value || ""}
            >
              <SelectTrigger className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
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
          )}
        />
      </div>

      <div className="form-group">
        <Label className="mb-3" htmlFor="nationality">Nationality</Label>
        <Controller
          name="nationality"
          control={useFormContext().control}
          // rules={{ required: "Nationality is required" }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value || ""}
            >
              <SelectTrigger className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
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
          )}
        />
        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
      </div>
    </div>
  );
}

// Next of Kin Section
export function NextOfKinForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <div className="form-group">
          <Label className="mb-3" htmlFor="nextOfKin">
            Next of Kin <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="nextOfKin"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("nextOfKin")}
          />
          {errors.nextOfKin && <p className="text-red-500 text-sm mt-1">{errors.nextOfKin.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="relationship">
            Relationship <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="relationship"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("relationship")}
          />
          {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>}
        </div>

        <div className="form-group">
          <Label className="mb-3" htmlFor="nextOfKinPhoneNumber">
            Next of Kin Phone Number <Asterisk color="red" size={10} />
          </Label>
          <Input
            id="nextOfKinPhoneNumber"
            type="text"
            className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
            {...register("nextOfKinPhoneNumber", {
              // required: "Phone number is required",
              pattern: {
                value: /^\+?\d{7,15}$/,
                message: "Enter a valid phone number (7-15 digits, optional +)",
              },
            })}
          />
          {errors.nextOfKinPhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.nextOfKinPhoneNumber.message}</p>}
        </div>
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="addressOfNextOfKin">
          Address of Next of Kin <Asterisk color="red" size={10} />
        </Label>
        <Textarea
          id="addressOfNextOfKin"
          placeholder="Type address of next of kin"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("addressOfNextOfKin")}
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
        <Label className="mb-3" htmlFor="pastMedicalHistory">
          Past Medical History
        </Label>
        <Textarea
          id="pastMedicalHistory"
          placeholder="Enter past medical history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("pastMedicalHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="pastSurgicalHistory">
          Past Surgical History
        </Label>
        <Textarea
          id="pastSurgicalHistory"
          placeholder="Enter past surgical history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("pastSurgicalHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="familyHistory">
          Family History
        </Label>
        <Textarea
          id="familyHistory"
          placeholder="Enter family history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("familyHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="socialHistory">
          Social History
        </Label>
        <Textarea
          id="socialHistory"
          placeholder="Enter social history"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("socialHistory")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="drugHistory">
          Drug History
        </Label>
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
        <Label className="mb-3" htmlFor="allergies">
          Any Allergies?
        </Label>
        <Textarea
          id="allergies"
          placeholder="List any allergies"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("allergies")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="dietaryRestrictions">
          Any Dietary Restrictions
        </Label>
        <Textarea
          id="dietaryRestrictions"
          placeholder="List any dietary restrictions"
          className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
          {...register("dietaryRestrictions")}
        />
      </div>

      <div className="form-group mt-3">
        <Label className="mb-3" htmlFor="dietAllergies">
          Specify Diet Allergies to Certain Drugs
        </Label>
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
