export const convertTo24HourFormat = (timeString: string) => {
    // period means PM or Am
    const [time, period] = timeString.split(" ");
    const [hour, minute] = time.split(":");
    let formattedHour = parseInt(hour);

    if (period === "PM" && hour !== "12") {
        formattedHour += 12;
    }
    return `${formattedHour}:${minute}`;
};


export const convertTo12HourFormat = (timeString: string) => {
    const [hour, minute] = timeString.split(":");
    const hourFormatted = parseInt(hour);
    const period = hourFormatted >= 12 ? "PM" : "AM";
    const hour12 = hourFormatted % 12 || 12;
    return `${hour12}:${minute} ${period}`;
};


export const generateTimeSlots = (from: string, to: string) => {
    const slots = [];
    const [fromHour] = from.split(":");
    const [toHour] = to.split(":");
    for (let hour = parseInt(fromHour); hour < parseInt(toHour); hour++) {
      const startTime = `${hour}:00`;
      const endTime = `${hour + 1}:00`;
      slots.push({
        startTime: convertTo12HourFormat(startTime),
        endTime: convertTo12HourFormat(endTime),
      });
    }
    return slots
  };

  //will get timestap that will converted into normall day and time
  export const getDayYearByDateString = (timestamp: string) => {
    const date = new Date(timestamp);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${dayOfWeek} ${day} ${year} ${hour}:${minutes} `

  }
  