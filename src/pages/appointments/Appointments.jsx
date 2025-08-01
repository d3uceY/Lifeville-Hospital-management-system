import ScheduleAppointmentDialog from "./components/ScheduleAppointmentDialog"
import { useAppointmentsData } from "../../providers/ApiContextProvider"



export default function DoctorAppointmentsUI() {
  const { appointments } = useAppointmentsData();

  const pastAppointments = appointments.filter(appointment => new Date(appointment.appointment_date) < new Date());
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointment_date) > new Date());

  // today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset current date time to midnight

  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    appointmentDate.setHours(0, 0, 0, 0); // reset appointment date time to midnight
    return appointmentDate.getTime() === today.getTime();
  });

  return (
    
          <div className="flex gap-2">
            <ScheduleAppointmentDialog />
          </div>
     
  )
}

