export const getDateDifferenceFromNow = (fromDate) => {
  const now = new Date();
  const from = new Date(fromDate);

  let difference = now.getTime() - from.getTime();

  difference = difference / 1000;

  const yearDifference = now.getFullYear() - from.getFullYear();
  const monthDifference =
    now.getMonth() - from.getMonth() + yearDifference * 12;
  const adjustedYears = Math.floor(monthDifference / 12);
  const remainingMonths = monthDifference % 12;

  difference -=
    adjustedYears * 365 * 24 * 3600 + remainingMonths * 30 * 24 * 3600;

  const dayDifference = Math.floor(difference / (3600 * 24));
  difference -= dayDifference * 3600 * 24;
  const hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  const minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;
  const secondDifference = Math.round(difference);

  let message = "";

  if (adjustedYears > 0) {
    message += `${adjustedYears} ${adjustedYears > 1 ? "years" : "year"}`;
  }
  if (remainingMonths > 0) {
    if (message) message += " ";
    message += `${remainingMonths} ${remainingMonths > 1 ? "months" : "month"}`;
  }
  if (dayDifference > 0) {
    if (message) message += " ";
    message += `${dayDifference} ${dayDifference > 1 ? "days" : "day"}`;
  }
  if (hourDifference > 0) {
    if (message) message += " ";
    message += `${hourDifference} ${hourDifference > 1 ? "hours" : "hour"}`;
  }
  if (minuteDifference > 0) {
    if (message) message += " ";
    message += `${minuteDifference} ${
      minuteDifference > 1 ? "minutes" : "minute"
    }`;
  }
  if (secondDifference > 0 || !message) {
    if (message) message += " ";
    message += `${secondDifference} ${
      secondDifference > 1 ? "seconds" : "second"
    }`;
  }

  return message;
};
