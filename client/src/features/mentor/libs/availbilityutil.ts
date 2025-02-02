

// export const availabilityArrange = (weeklyScheduledata: any): string[] => {
//   const curr = new Date();
//   const year = curr.getFullYear();
//   const month = curr.getMonth();
//   const todayDate = curr.getDate();
//   //third parameter take if it is 0 it will take alst day of last moth
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const availableDates = [];
//   for (let day = todayDate + 1; day <= daysInMonth; day++) {
//     let date = new Date(year, month, day);
//     const weekday = getWeekDayName(date).toLowerCase();
//     if (weeklyScheduledata[weekday] && weeklyScheduledata[weekday].isAvailable) {
//       availableDates.push(`${getMonthName(date)} ${day} ${getWeekDayName(date).toUpperCase()}`);
//     }
//   }
//   return availableDates

// }
export const availabilityArrange = (weeklyScheduledata: any): string[] => {
  const curr = new Date();
  const year = curr.getFullYear();
  const month = curr.getMonth(); // curr month (0-based)
  const todayDate = curr.getDate(); // curr day
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // daus in the current month

  const availableDates = [];
  for (let day = todayDate + 1; day <= daysInMonth; day++) {
    let date = new Date(year, month, day); // remain days in the current month
    const weekday = getWeekDayName(date).toLowerCase();
    if (weeklyScheduledata[weekday] && weeklyScheduledata[weekday].isAvailable) {
      availableDates.push(`${getMonthName(date)} ${day} ${getWeekDayName(date).toUpperCase()}`);
    }
  }

  //   next month if the current date is near the end of the month
  if (todayDate >= daysInMonth) {
    const nextMonth = month + 1; // jan will be `12` in the 0-based index
    const nextYear = nextMonth > 11 ? year + 1 : year; // move to next year if December
    const actualNextMonth = nextMonth % 12; //  around to January (0)

    const daysInNextMonth = new Date(nextYear, actualNextMonth + 1, 0).getDate();
    for (let day = 1; day <= daysInNextMonth; day++) {
      let date = new Date(nextYear, actualNextMonth, day);
      const weekday = getWeekDayName(date).toLowerCase();
      if (weeklyScheduledata[weekday] && weeklyScheduledata[weekday].isAvailable) {
        availableDates.push(`${getMonthName(date)} ${day} ${getWeekDayName(date).toUpperCase()}`);
      }
    }
  }
  return availableDates;
};


const getWeekDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long'
  })
}

const getMonthName = (date: Date) => {
  return date.toLocaleString('en-US', { month: 'long' });
}



