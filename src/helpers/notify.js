export const notify = async (notificationText = "Thank you for enabling notifications!") => {
    if (!("Notification" in window)) {
        return alert("This browser does not support desktop notification");
    }

    if (Notification.permission === "granted") {
        const notification = new Notification(notificationText);
    } else if (Notification.permission !== "denied") {
        await Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const notification = new Notification(notificationText);
            }
        });
    }
}