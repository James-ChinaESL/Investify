import { calendarOptions, calendarNextMonthOptions } from "./fetchOptions";
import axios from "axios";

export const getNearestWorkDay = async (
  currentYear,
  currentMonth,
  currentDay,
  currentHours
) => {
  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const res = await axios(calendarOptions);
  const currentMonthCalendar = res.data.calendar.days.day;

  const isOpenToday =
    currentMonthCalendar.find((day) => {
      return day.date === currentDate;
    })?.status === "open"
      ? true
      : false;

  if (isOpenToday && currentHours < 7) {
    return currentDate;
  } else {
    const todayIndex = currentMonthCalendar.findIndex(
      (day) => day.date === currentDate
    );

    const nearestWorkDayCurrentMonth = currentMonthCalendar
      .slice(todayIndex + 1)
      .find((day) => day.status === "open");

    if (nearestWorkDayCurrentMonth) {
      return nearestWorkDayCurrentMonth.date;
    } else {
      const res = await axios(
        calendarNextMonthOptions(currentMonth, currentYear)
      );

      const nextMonthCalendar = res.data.calendar.days.day;

      return nextMonthCalendar.find((day) => day.status === "open").date;
    }
  }
};
