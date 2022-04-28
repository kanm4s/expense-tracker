export const formatShortMonthShortYear = (date) => {
    return new Intl.DateTimeFormat("en-us", {
        year: "2-digit",
        month: "short",
    }).format(date);
};
