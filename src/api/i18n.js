import { addDays, format, startOfWeek } from "date-fns";

// https://github.com/date-fns/date-fns/issues/644#issuecomment-671563742
const firstDOW = startOfWeek(new Date());
export const shortWeekDaysArray = Array.from(Array(7)).map((e, i) =>
  format(addDays(firstDOW, i), "EEEEEE")
);
