function formatPrettyDate(inputDate) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const parts = inputDate.split('-');
    const year = parts[0];
    const monthIndex = parseInt(parts[1]) - 1;
    const day = parts[2];

    return `${day} ${months[monthIndex]} ${year}`;
}

export default formatPrettyDate;