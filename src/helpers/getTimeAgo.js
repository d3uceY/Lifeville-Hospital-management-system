export function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 5) {
        return "just now";
    }
    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 5) {
        return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months === 1 ? "" : "s"} ago`;
    }

    const years = Math.floor(days / 365);
    return `${years} year${years === 1 ? "" : "s"} ago`;
}
