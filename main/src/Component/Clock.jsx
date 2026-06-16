import React from "react";
import {useState, useEffect} from "react"

export function useClock(type = 12) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const year    = time.getFullYear();
  const month   = time.getMonth();
  const date    = time.getDate();
  let day     = time.getDay();
  const hours24 = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const totalSec =
  time.getHours() * 3600 +
  time.getMinutes() * 60 +
  time.getSeconds();

  const dayProgress = totalSec / 240;


  if (type == "date") {
    switch (day) {
      case 1:
        day = "Monday"
        break
      case 2:
        day = "Tuesday"
        break
      case 3:
        day = "Wednesday"
        break
      case 4:
        day = "Thursday"
        break
      case 5:
        day = "Friday"
        break
      case 6:
        day = "Saturday"
        break
      case 0:
        day = "Sunday"
        break
      default:
        day = "Unknown" 
    }

    return {
      year, month, day, date
    }
  }
  if (type == 24) {
    return {
      hour: padZero(hours24),
      min: padZero(minutes),
      sec: padZero(seconds),
      pro: Number(dayProgress)
    }
  }

  let hours12 = hours24 % 12;
  hours12 = hours12 || 12;

  function padZero(num) {
  return String(num).padStart(2, "0");
}


  return {
    hour: padZero(hours12),
    min: padZero(minutes),
    sec: padZero(seconds),
    ampm: hours24 >= 12 ? "PM" : "AM",
    pro: dayProgress
  };
}

