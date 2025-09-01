import { useSocket } from '../../providers/SocketContextProvider';
import { useEffect } from 'react';
import { toast } from "sonner";

const ToastNotifications = () => {
    const socket = useSocket();

    // for general notifications
    useEffect(() => {
        socket.connect();

        socket.on('notification', (notification) => {
            toast(notification?.message, {
                description: notification?.description,
                duration: 5000,
                position: "top-right"
            });
        });

        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, [socket]);

    return null;
};

export default ToastNotifications;
