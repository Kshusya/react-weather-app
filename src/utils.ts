export default function isDayTime(hours: number): boolean {
    return hours >= 7 && hours <= 18
}