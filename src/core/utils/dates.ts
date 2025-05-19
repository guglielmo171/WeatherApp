export function getShortWeekday(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {weekday: 'short'});
}

export function getHour(dateString: string): string {
    const date = new Date(dateString);
    // console.log( date.getHours().toString().padStart(2, '0'))
    return date.getHours().toString().padStart(2, '0');
}

export function getTimeFromEpoch(epoch: number): string {
    const date = new Date(epoch * 1000);

    // Ottiene ore e minuti
    const hours = date.getHours().toString().padStart(2, '0');
    // const minutes = date.getMinutes().toString().padStart(2, '0');

    return hours;
    // return `${hours}:${minutes}`;
}