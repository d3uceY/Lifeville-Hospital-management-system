import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"

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
        <form>
            <div className='md:grid-cols-2 grid-cols grid gap-3'>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="date">Date</Label>
                    <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="date" />
                </div>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="hospitalNumber">Hospital Number</Label>
                    <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="number" id="hospitalNumber" />
                </div>

                <div className="form-group">
                    <Label className="mb-2" htmlFor="firstName">First Name</Label>
                    <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="firstName" />
                </div>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="otherNames">Other Names</Label>
                    <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="otherNames" />
                </div>
            </div>
        </form>
    );
}

// Contact Information Section
export function ContactInformationForm() {
    return (
        <form>
            <div>
                <div className='md:grid-cols-4 grid-cols grid gap-3'>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="sex">Sex</Label>
                        <Select className="">
                            <SelectTrigger className="w-full border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]">
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
                        <Label className="mb-2" htmlFor="maritalStatus" >Marital Status</Label>
                        <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="maritalStatus" placeholder="eg. single, married"/>
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="date" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="phoneNumber">Phone Number</Label>
                        <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6429]" type="number" id="phoneNumber" placeholder="eg. 0701234567"/>
                    </div>
                </div>


                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="address">Address</Label>
                    <Textarea className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" placeholder="Type address here" />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="occupation">Occupation</Label>
                    <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="occupation" placeholder="Type occupation here"/>
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="placeOfWorkAddress">Address of Place of Work</Label>
                    <Textarea className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" placeholder="Type place of work address" />
                </div>
            </div>
        </form>
    );
}

// Demographic Information Section
export function DemographicForm() {
    return (
        <div className='grid grid-cols-2 gap-3 mt-3'>
            <div className="form-group">
                <Label className="mb-2" htmlFor="religion">Religion</Label>
                <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="religion" placeholder="muslim" />
            </div>
            <div className="form-group">
                <Label className="mb-2" htmlFor="nationality">Nationality</Label>
                <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="nationality" placeholder="Nigeria" />
            </div>
        </div>
    );
}

// Next of Kin Section
export function NextOfKinForm() {
    return (
        <form>
            <div>
                <div className='grid grid-cols-3 gap-3'>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="nextOfKin">Next of Kin</Label>
                        <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="nextOfKin" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="relationship">Relationship</Label>
                        <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="text" id="relationship" />
                    </div>
                    <div className="form-group">
                        <Label className="mb-2" htmlFor="nextOfKinPhoneNumber">Next of Kin Phone Number</Label>
                        <Input className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" type="number" id="nextOfKinPhoneNumber" />
                    </div>
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="addressOfNextOfKin">Address of Next of Kin</Label>
                    <Textarea className="border border-[#268a6461] rounded-sm  focus-visible:ring-[#268a6465]" placeholder="Type address of next of kin" id="addressOfNextOfKin" />
                </div>
            </div>
        </form>
    );
}

// Medical History Section
export function MedicalHistoryForm() {
    return (
        <form>
            <div>
                <div className="form-group">
                    <Label className="mb-2" htmlFor="pastMedicalHistory">Past Medical History</Label>
                    <Textarea
                        id="pastMedicalHistory"
                        placeholder="Enter past medical history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="pastSurgicalHistory">Past Surgical History</Label>
                    <Textarea
                        id="pastSurgicalHistory"
                        placeholder="Enter past surgical history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="familyHistory">Family History</Label>
                    <Textarea
                        id="familyHistory"
                        placeholder="Enter family history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="socialHistory">Social History</Label>
                    <Textarea
                        id="socialHistory"
                        placeholder="Enter social history"
                    />
                </div>
                <div className="form-group mt-3">
                    <Label className="mb-2" htmlFor="drugHistory">Drug History</Label>
                    <Textarea
                        id="drugHistory"
                        placeholder="Enter drug history"
                    />
                </div>
            </div>
        </form>
    );
}

export function Allergies() {
    return (
        <form action="">
            <div className="form-group">
                <Label className="mb-2" htmlFor="allergies">Any Allergies?</Label>
                <Textarea
                    id="allergies"
                    placeholder="List any allergies"
                />
            </div>
            <div className="form-group mt-3">
                <Label className="mb-2" htmlFor="dietaryRestrictions">Any Dietary Restrictions</Label>
                <Textarea
                    id="dietaryRestrictions"
                    placeholder="List any dietary restrictions"
                />
            </div>
            <div className="form-group mt-3">
                <Label className="mb-2" htmlFor="dietAllergies">Specify Diet Allergies to Certain Drugs</Label>
                <Textarea
                    id="dietAllergies"
                    placeholder="Specify diet-related drug allergies"
                />
            </div>
        </form>
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
