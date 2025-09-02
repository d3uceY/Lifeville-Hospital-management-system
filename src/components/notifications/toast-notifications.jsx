import { useSocket } from '../../providers/SocketContextProvider';
import { useEffect } from 'react';
import { toast } from "sonner";
import infoSound from '/sounds/info-sound.mp3'
import { playSound } from '../../helpers/playSound';

const ToastNotifications = () => {
    const socket = useSocket();

    // for general notifications
    useEffect(() => {
        socket.connect();

        socket.on('notification', (notification) => {
            playSound(infoSound);
            toast.info(notification?.message, {
                description: notification?.description,
                duration: 10000,
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
