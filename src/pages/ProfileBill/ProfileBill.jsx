import ProfileBillForm from "./components/ProfileBillForm"
import ProfileBillsTable from "./components/ProfileBillsTable"
import ProfileFormHeader from "../../components/profile-form-header";

export default function ProfileBill() {  return (
    <div>
        <ProfileFormHeader title="Profile Bill" description={`Fill in the details to create a bill`} />
        <ProfileBillForm />
        <ProfileBillsTable />
    </div>
  )
}
