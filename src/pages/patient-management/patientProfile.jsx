import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { nationalities } from '../../components/forms/data/RegistrationFormData';
import { viewRegisteredPatient } from '../../providers/ApiProviders';

export default function PatientProfile() {
    const [patient, setPatient] = useState({});
    const location = useLocation();
    const id = location.pathname.split('/').pop();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await viewRegisteredPatient(id);
                setPatient(response);
                console.log(response);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPatient();
    }, [id]);

    // Helper to format a date string (ISO) to yyyy-mm-dd for the input fields.
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="p-4">
            {/* Basic Information Section */}
            <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
            <Separator className="my-4" />
            <div className="md:grid-cols-2 grid gap-3">
                <div className="form-group">
                    <Label className="mb-3" htmlFor="date">Date:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="date"
                        type="date"
                        value={formatDate(patient.date)}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="hospitalNumber">Hospital Number:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="hospitalNumber"
                        type="number"
                        value={patient.hospital_number || 'N/A'}
                        disabled
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="form-group">
                    <Label className="mb-3" htmlFor="surname">Surname:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="surname"
                        type="text"
                        value={patient.surname || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="firstName">First Name:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="firstName"
                        type="text"
                        value={patient.first_name || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="otherNames">Other Names:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="otherNames"
                        type="text"
                        value={patient.other_names || 'N/A'}
                        disabled
                    />
                </div>
            </div>

            {/* Contact Information Section */}
            <h2 className="text-xl font-semibold mt-8 mb-2">Contact Information</h2>
            <Separator className="my-4" />
            <div className="md:grid-cols-4 grid gap-3">
                <div className="form-group">
                    <Label className="mb-3" htmlFor="sex">Sex:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="sex"
                        type="text"
                        value={patient.sex || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="maritalStatus">Marital Status:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="maritalStatus"
                        type="text"
                        value={patient.marital_status || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="dateOfBirth">Date of Birth:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="dateOfBirth"
                        type="date"
                        value={formatDate(patient.date_of_birth)}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="phoneNumber">Phone Number:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="phoneNumber"
                        type="text"
                        value={patient.phone_number || 'N/A'}
                        disabled
                    />
                </div>
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="address">Address:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="address"
                    value={patient.address || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="occupation">Occupation:</Label>
                <Input
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="occupation"
                    type="text"
                    value={patient.occupation || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="placeOfWorkAddress">Address of Place of Work:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="placeOfWorkAddress"
                    value={patient.place_of_work_address || 'N/A'}
                    disabled
                />
            </div>

            {/* Demographic Information Section */}
            <h2 className="text-xl font-semibold mt-8 mb-2">Demographic Information</h2>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                    <Label className="mb-3" htmlFor="religion">Religion:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="religion"
                        type="text"
                        value={patient.religion || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="nationality">Nationality:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="nationality"
                        type="text"
                        value={patient.nationality || 'N/A'}
                        disabled
                    />
                </div>
            </div>

            {/* Next of Kin Section */}
            <h2 className="text-xl font-semibold mt-8 mb-2">Next of Kin</h2>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-3">
                <div className="form-group">
                    <Label className="mb-3" htmlFor="nextOfKin">Next of Kin:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="nextOfKin"
                        type="text"
                        value={patient.next_of_kin || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="relationship">Relationship:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="relationship"
                        type="text"
                        value={patient.relationship || 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <Label className="mb-3" htmlFor="nextOfKinPhoneNumber">Next of Kin Phone Number:</Label>
                    <Input
                        className="!text-black disabled:opacity-90 border-[#268a6477]"
                        id="nextOfKinPhoneNumber"
                        type="text"
                        value={patient.next_of_kin_phone || 'N/A'}
                        disabled
                    />
                </div>
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="addressOfNextOfKin">Address of Next of Kin:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="addressOfNextOfKin"
                    value={patient.next_of_kin_address || 'N/A'}
                    disabled
                />
            </div>

            {/* Medical History Section */}
            <h2 className="text-xl font-semibold mt-8 mb-2">Medical History</h2>
            <Separator className="my-4" />
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="pastMedicalHistory">Past Medical History:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="pastMedicalHistory"
                    value={patient.past_medical_history || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="pastSurgicalHistory">Past Surgical History:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="pastSurgicalHistory"
                    value={patient.past_surgical_history || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="familyHistory">Family History:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="familyHistory"
                    value={patient.family_history || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="socialHistory">Social History:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="socialHistory"
                    value={patient.social_history || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="drugHistory">Drug History:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="drugHistory"
                    value={patient.drug_history || 'N/A'}
                    disabled
                />
            </div>

            {/* Allergies Section */}
            <h2 className="text-xl font-semibold mt-8 mb-2">Allergies</h2>
            <Separator className="my-4" />
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="allergies">Any Allergies?:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="allergies"
                    value={patient.allergies || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="dietaryRestrictions">Any Dietary Restrictions:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="dietaryRestrictions"
                    value={patient.dietary_restrictions || 'N/A'}
                    disabled
                />
            </div>
            <div className="form-group mt-4">
                <Label className="mb-3" htmlFor="dietAllergies">Specify Diet Allergies to Certain Drugs:</Label>
                <Textarea
                    className="!text-black disabled:opacity-90 border-[#268a6477]"
                    id="dietAllergies"
                    value={patient.diet_allergies_to_drugs || 'N/A'}
                    disabled
                />
            </div>
        </div>
    );
}
