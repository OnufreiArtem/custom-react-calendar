export const sameMonths = (date1, date2) => {
    return date1 !== undefined && date2 !== undefined && date1?.getMonth() === date2?.getMonth();
}

export const ydmEquals = (date1, date2) => {
    return (
        date1 !== undefined &&
        date2 !== undefined &&
        date1?.getDate() === date2?.getDate() &&
        date1?.getFullYear() === date2?.getFullYear() &&
        date1?.getMonth() === date2?.getMonth()
    );
};

export const addMonth = (date, amount) => {
    let tempDate = new Date(date.getTime());
    tempDate.setMonth(tempDate.getMonth() + amount);
    return tempDate;
}

export const dateFormat = (date) => {
    if(!date) return;
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

export const dateRangeFormat = (pair) => {
    return `${pair.first !== undefined ? dateFormat(pair.first) : "_"} - ${pair.last !== undefined ? dateFormat(pair.last) : "_"}`;
}

export const dateBetween = (targetDate, startDate, finishDate) => {
    return targetDate > startDate && targetDate < finishDate;
}
