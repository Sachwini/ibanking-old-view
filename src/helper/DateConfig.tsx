import moment from "moment";
import dateFormat from "dateformat";

export const formatDate = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const ThreeMonthsBack = (date: Date) => {
  return moment(date).subtract(3, "M").format("YYYY-MM-DD");
};

export const localDate = () => {
  var now = new Date();
  return dateFormat(now, "dddd, mmmm dS, yyyy");
};
