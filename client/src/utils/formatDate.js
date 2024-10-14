import { format, formatDistanceToNow, isValid } from "date-fns";

export const formatDate = (date) => {
  const parsedDate = new Date(date);

  // Check if the date is valid
  if (!isValid(parsedDate)) {
    return "Invalid date"; // Return this message if the date is invalid
  }

  const now = new Date();
  const differenceInMilliseconds = now - parsedDate;
  const hours = differenceInMilliseconds / (1000 * 60 * 60);

  if (hours < 24) {
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } else if (hours < 48) {
    return "a day ago";
  } else if (hours < 168) {
    return `${Math.floor(hours / 24)} days ago`;
  } else if (hours < 336) {
    return "a week ago";
  } else if (hours < 672) {
    return "2 weeks ago";
  } else {
    return format(parsedDate, "dd/MM/yyyy");
  }
};
