const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    
    const m = d.getMonth();
    const month = months[m];
    
    const date = d.getDate();

    const hh = d.getHours();
    const h = hh > 12 ? hh - 12 : hh;
    const t = hh >= 12 ? 'PM' : 'AM';

    const mm = d.getMinutes();

    return { year, month, m, date, h, hh, t, mm };
}


const ith = (i) => ({
    1: 'st',
    2: 'nd',
    3: 'rd',
})[i%10] || 'st';

export const getTimeString = (time) => {
    const { year, month, date } = formatDate(time);
    
    return `${date}${ith(date)} ${month}, ${year}`
}