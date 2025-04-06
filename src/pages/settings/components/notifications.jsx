import { useSocket } from "../../../providers/SocketContextProvider";
import React, { useEffect, useState } from 'react';
import { formatDate } from "../../../helpers/formatDate";

const Notifications = () => {
    const socket = useSocket();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Connect to the socket server
        socket.connect();

        // Listen for the 'newAppointment' event
        socket.on('newAppointment', (appointment) => {
            setNotifications((prev) => [...prev, appointment]);
        });

        // Clean up the effect
        return () => {
            socket.off('newAppointment');
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className="w-full  mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-100">
                {notifications?.map((appointment, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-sky-500"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">New appointment scheduled:</p>
                                <p className="text-sm text-gray-600 mt-1">{formatDate(appointment?.appointment_date)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {notifications?.length === 0 && <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>}
        </div>
    );
};

export default Notifications;
