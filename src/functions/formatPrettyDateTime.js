function formatPrettyDateTime(inputDateTime) {

    const inputDate = new Date(inputDateTime);

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    };

    return inputDate.toLocaleString("en-US", options);
};

export default formatPrettyDateTime;