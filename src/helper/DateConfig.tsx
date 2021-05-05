import moment from "moment";

export const formatDate = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const ThreeMonthsBack = (date: Date) => {
  return moment(date).subtract(3, "M").format("YYYY-MM-DD");
};
