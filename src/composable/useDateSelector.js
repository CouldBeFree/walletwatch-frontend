import moment from "moment";

export default function useDateSelector() {
  const getToday = () => moment().format("YYYY-MM-DD");

  const allTime = () => {
    const t = moment().subtract(10, "years").format("YYYY-MM-DD");
    return {
      startDate: t,
      endDate: getToday(),
    };
  };

  const getWeek = () => {
    const t = moment().subtract(7, "days").format("YYYY-MM-DD");
    return {
      startDate: t,
      endDate: getToday(),
    };
  };

  const today = () => {
    return {
      startDate: getToday(),
      endDate: getToday(),
    };
  };

  const getYear = () => {
    return {
      startDate: `${moment().year()}-01-01`,
      endDate: getToday(),
    };
  };

  const getMonth = () => {
    return {
      startDate: `${moment().year()}-${moment().month() + 1}-01`,
      endDate: getToday(),
    };
  };

  const getDate = (type) => {
    switch (type) {
      case "allTime":
        return allTime();
      case "week":
        return getWeek();
      case "today":
        return today();
      case "year":
        return getYear();
      case "month":
        return getMonth();
    }
  };

  return { getDate };
}
