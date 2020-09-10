export function getTruncatedTodayDate() {
    return new Date((new Date(Date.now())).setHours(0, 0, 0, 0));
}

export function getTruncatedYesterdayDate() {
    const todayDate = this.getTruncatedTodayDate();
    return new Date(todayDate.setDate(todayDate.getDate() - 1));
}

export function switchDayMonthInDateString(dateString: string, separator: string) {
    const splittedDateString = dateString.split(separator);

    return `${splittedDateString[1]}${separator}${splittedDateString[0]}
        ${separator}${splittedDateString[2]}`;
}
