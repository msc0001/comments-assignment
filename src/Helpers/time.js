const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const formatDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();

    const m = d.getMonth();
    const month = months[m];

    const date = d.getDate();

    const hh = d.getHours();
    const h = hh > 12 ? hh - 12 : hh;
    const t = hh >= 12 ? "PM" : "AM";

    const mm = d.getMinutes();

    const s = d.getSeconds();

    return { year, month, m, date, h, hh, t, mm, s };
};

const ith = (i) =>
    ({
        1: "st",
        2: "nd",
        3: "rd",
    }[i % 10] || "th");

export const getTimeString = (time) => {
    const { year, month, date, h, t, mm } = formatDate(time);
    const { date: nowDate } = formatDate(Date.now());

    const diff = (Date.now() - time) / 1000;

    if (diff < 5) {
        // 1sec
        return "just now";
    }

    if (diff < 60) {
        // 1 min
        return `${Math.floor(diff)} sec ago`;
    }

    if (diff < 3600) {
        // 1hr
        return `${Math.floor(diff / 60)} min ago`;
    }

    if (date === nowDate) {
        // 1 day
        return `${h}:${mm < 10 ? "0" : ""}${mm} ${t}`;
    }

    return `${date}${ith(date)} ${month}, ${year}`;
};
