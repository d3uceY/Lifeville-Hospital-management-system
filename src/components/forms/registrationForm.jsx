import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { nationalities } from './data/RegistrationFormData';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"




// Basic Information Section
export function RegistrationForm() {
    return (
        <div>
            <div className='md:grid-cols-2 grid-cols grid gap-3'>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="date">Date</Label>
                    <Input name="date" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="date" />
                </div>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="hospitalNumber">Hospital Number</Label>
                    <Input name="hospitalNumber" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="number" id="hospitalNumber" />
                </div>

                <div className="form-group">
                    <Label className="mb-2" htmlFor="firstName">First Name</Label>
                    <Input name="firstName" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="firstName" />
                </div>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="otherNames">Other Names</Label>
                    <Input name="otherNames" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="otherNames" />
                </div>
            </div>
        </div>
    );
}

// Contact Information Section
export function ContactInformationForm() {
    return (
        <div>
            <div>
                <div className='md:grid-cols-4 grid-cols grid gap-3'>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="sex">Sex</Label>
                        <Select>
                            <SelectTrigger name="sex" className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
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
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="maritalStatus">Marital Status</Label>
                        <Input name="maritalStatus" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="maritalStatus" placeholder="eg. single, married" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input name="dateOfBirth" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="date" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="phoneNumber">Phone Number</Label>
                        <Input name="phoneNumber" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="number" id="phoneNumber" placeholder="eg. 0701234567" />
                    </div>
                </div>

                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="address">Address</Label>
                    <Textarea name="address" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" placeholder="Type address here" />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="occupation">Occupation</Label>
                    <Input name="occupation" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="occupation" placeholder="Type occupation here" />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="placeOfWorkAddress">Address of Place of Work</Label>
                    <Textarea name="placeOfWorkAddress" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" placeholder="Type place of work address" />
                </div>
            </div>
        </div>
    );
}

// Demographic Information Section
export function DemographicForm() {
    return (
        <div className='grid grid-cols-2 gap-3 mt-3'>
            <div className="form-group">
                <Label className="mb-2" htmlFor="religion">Religion</Label>
                <Input name="religion" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="religion" placeholder="muslim" />
            </div>
            <div className="form-group">
                <Label className="mb-2" htmlFor="nationality">Nationality</Label>
                <Select>
                    <SelectTrigger name="nationality" className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
                        <SelectValue placeholder="Select the nationality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select</SelectLabel>
                            {nationalities.map((nationality, index) => (
                                <SelectItem key={index} value={nationality}>{nationality}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

// Next of Kin Section
export function NextOfKinForm() {
    return (
        <div>
            <div>
                <div className='grid grid-cols-3 gap-3'>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="nextOfKin">Next of Kin</Label>
                        <Input name="nextOfKin" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="nextOfKin" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="relationship">Relationship</Label>
                        <Input name="relationship" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="text" id="relationship" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="nextOfKinPhoneNumber">Next of Kin Phone Number</Label>
                        <Input name="nextOfKinPhoneNumber" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" type="number" id="nextOfKinPhoneNumber" />
                    </div>
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="addressOfNextOfKin">Address of Next of Kin</Label>
                    <Textarea name="addressOfNextOfKin" className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]" placeholder="Type address of next of kin" id="addressOfNextOfKin" />
                </div>
            </div>
        </div>
    );
}

// Medical History Section
export function MedicalHistoryForm() {
    return (
        <div>
            <div>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="pastMedicalHistory">Past Medical History</Label>
                    <Textarea
                        className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                        name="pastMedicalHistory"
                        id="pastMedicalHistory"
                        placeholder="Enter past medical history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="pastSurgicalHistory">Past Surgical History</Label>
                    <Textarea
                        className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                        name="pastSurgicalHistory"
                        id="pastSurgicalHistory"
                        placeholder="Enter past surgical history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="familyHistory">Family History</Label>
                    <Textarea
                        className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                        name="familyHistory"
                        id="familyHistory"
                        placeholder="Enter family history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="socialHistory">Social History</Label>
                    <Textarea
                        className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                        name="socialHistory"
                        id="socialHistory"
                        placeholder="Enter social history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="drugHistory">Drug History</Label>
                    <Textarea
                        className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                        name="drugHistory"
                        id="drugHistory"
                        placeholder="Enter drug history"
                    />
                </div>
            </div>
        </div>
    );
}

export function Allergies() {
    return (
        <div>
            <div className="form-group">
                <Label className="mb-2" htmlFor="allergies">Any Allergies?</Label>
                <Textarea
                    className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                    name="allergies"
                    id="allergies"
                    placeholder="List any allergies"
                />
            </div>
            <div className="form-group mt-3">
                <Label className="mb-2" htmlFor="dietaryRestrictions">Any Dietary Restrictions</Label>
                <Textarea
                    className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                    name="dietaryRestrictions"
                    id="dietaryRestrictions"
                    placeholder="List any dietary restrictions"
                />
            </div>
            <div className="form-group mt-3">
                <Label className="mb-2" htmlFor="dietAllergies">Specify Diet Allergies to Certain Drugs</Label>
                <Textarea
                    className="border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]"
                    name="dietAllergies"
                    id="dietAllergies"
                    placeholder="Specify diet-related drug allergies"
                />
            </div>
        </div>
    )
}
export const RegistrationFormList = [
    RegistrationForm,
    ContactInformationForm,
    DemographicForm,
    NextOfKinForm,
    MedicalHistoryForm,
    Allergies
];
