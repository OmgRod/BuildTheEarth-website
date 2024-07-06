import moment from "moment";

export function toHumanDate(date: string) {
  return moment(date).format("DD.MM.YYYY");
}
export function toHumanTime(date: string) {
  return moment(date).format("HH:mm:ss");
}
export function toHumanDateTime(date: string) {
  return moment(date).format("DD.MM.YYYY HH:mm:ss");
}
