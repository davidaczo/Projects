const formatDate = (date: Date | null) => {
    if (date === null) {
        return null;
    }

    let newDate = `${date.getFullYear()}-`;
    // to ensure a dateformat like this -> 2020-01-13
    if (date.getMonth() < 10) {
        newDate += '0';
    }
    newDate += `${date.getMonth() + 1}-`;
    if (date.getDate() < 10) {
        newDate += '0';
    }

    newDate += `${date.getDate()}`;
    return newDate;
};

const getDayOfYear = (date: Date) =>
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000;

export const DateService = {
    formatDate,
    getDayOfYear,
};
