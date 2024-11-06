

export const availabilityArrange = (weeklyScheduledata: any): string[] => {
  const curr = new Date();
  const year = curr.getFullYear();
  const month = curr.getMonth();
  const todayDate = curr.getDate();
  //third parameter take if it is 0 it will take alst day of last moth
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const availableDates = [];
  for (let day = todayDate + 1; day <= daysInMonth; day++) {
    let date = new Date(year, month, day);
    const weekday = getWeekDayName(date).toLowerCase();
    if (weeklyScheduledata[weekday] && weeklyScheduledata[weekday].isAvailable) {
      availableDates.push(`${getMonthName(date)} ${day} ${getWeekDayName(date).toUpperCase()}`);
    }
  }
  return availableDates

}


const getWeekDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long'
  })
}

const getMonthName = (date: Date) => {
  return date.toLocaleString('en-US', { month: 'long' });
}



