import React from 'react'
import DatePicker from '../layouts/DatePicker'

export default function RegistrationForm() {
    return (
        <form action="">
            <div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <DatePicker />
                </div>
                <div className="form-group">
                    <label htmlFor="hospitalNumber">Hospital Number</label>
                    <input type="number" name="hospitalNumber" id="hospitalNumber" />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="sex">Sex</label>
                    <input type="text" name="sex" id="sex" />
                </div>
                <div className="form-group">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <input type="text" name="maritalStatus" id="maritalStatus" />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <DatePicker />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input type="text" name="phoneNumber" id="phoneNumber" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" />
                </div>
                <div className="form-group">
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" name="occupation" id="occupation" />
                </div>
                <div className="form-group">
                    <label htmlFor="placeOfWorkAddress">Address of place of work</label>
                    <input type="text" name="placeOfWorkAddress" id="placeOfWorkAddress" />
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <input type="text" name="religion" id="religion" />
                </div>
                <div className="form-group">
                    <label htmlFor="nationality">nationality</label>
                    <input type="text" name="nationality" id="nationality" />
                </div>
                <div className="form-group">
                    <label htmlFor="nextOfKin">Next of Kin</label>
                    <input type="text" name="nextOfKin" id="nextOfKin" />
                </div>
                <div className="form-group">
                    <label htmlFor="relationship">Relationship</label>
                    <input type="text" name="relationship" id="relationship" />
                </div>
                <div className="form-group">
                    <label htmlFor="addressOfNextOfKin">Address of Next of Kin</label>
                    <input type="text" name="addressOfNextOfKin" id="addressOfNextOfKin" />
                </div>
                <div>
                    <label htmlFor="nextOfKinPhoneNumber">Next of Kin Phone number</label>
                    <input type="text" name="nextOfKinPhoneNumber" id="nextOfKinPhoneNumber" />
                </div>
            </div>

            <div>
            <div className="form-group">
                <label htmlFor="pastMedicalHistory">Past medical history</label>
                <textarea name="pastMedicalHistory" id="pastMedicalHistory" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="pastSurgicalHistory">Past surgical history</label>
                <textarea name="pastSurgicalHistory" id="pastSurgicalHistory" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="familyHistory">Family history</label>
                <textarea name="familyHistory" id="familyHistory" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="socialHistory">Social history</label>
                <textarea name="socialHistory" id="socialHistory" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="drugHistory">Drug history</label>
                <textarea name="drugHistory" id="drugHistory" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="allergies">Any allergies?</label>
                <textarea name="allergies" id="allergies" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="dietaryRestrictions">Any dietary restrictions</label>
                <textarea name="dietaryRestrictions" id="dietaryRestrictions" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="dietAllergies">Specify diet allergies to certain drugs</label>
                <textarea name="dietAllergies" id="dietAllergies" rows="3"></textarea>
            </div>

            </div>
        </form>
    )
}
