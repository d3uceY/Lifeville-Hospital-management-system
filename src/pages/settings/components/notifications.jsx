import { useSocket } from "../../../providers/SocketContextProvider";
// src/components/Notifications.js
import React, { useContext, useEffect, useState } from 'react';

const Notifications = () => {
    const  socket  = useSocket();
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
        <div>
            {notifications?.map((appointment, index) => (
                <div key={index}>
                    New appointment scheduled: {appointment?.details}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
