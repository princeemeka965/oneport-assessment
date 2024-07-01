import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "./SvgIcons";

interface ChildComponentProps {
  openDrawer: (data: { selectedDate: String; openModal: Boolean }) => void;
}

interface Quote {
  date: Date;
  count: number;
  total: number;
}

const generateQuotes = (year: number, month: number): Quote[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const quotes: Quote[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    quotes.push({
      date: new Date(year, month, day),
      count: 5,
      total: 23045.0,
    });
  }
  return quotes;
};

const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const Calendar: React.FC<ChildComponentProps> = ({ openDrawer }) => {
  const currentMonth = new Date().getMonth(); // get the current Month
  const currentDay = new Date().getDate(); // get today's date
  const currentYear = new Date().getFullYear(); // get current Year

  const [year, setYear] = useState<number>(currentYear); // Set the current Year
  const [month, setMonth] = useState<number>(currentMonth); // Set the current
  const [clickedDay, setClickedDay] = useState(0); // get the value of each clicked day

  const quotes = generateQuotes(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: JSX.Element[][] = [];
  let days: JSX.Element[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<td key={`empty-${i}`}></td>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const quote = quotes.find((q) => q.date.getDate() === day);
    const quoteDate = `${day}-${month}-${year}`;

    days.push(
      <td
        key={day}
        onClick={() => {
          getWeekDetails(quoteDate);
          setClickedDay(day);
        }}
        className={clickedDay === day ? "bg-darkActive" : ""}
      >
        <div
          className={`${
            currentDay === day
              ? "px-2 rounded-md bg-shinyBlue w-max text-base text-white"
              : "text-shinyGrey px-1 text-base"
          }`}
        >
          {day}
        </div>
        <div className="text-xs mt-8 px-1 text-shinyBlack">
          {quote?.count} Quotes
        </div>
        <div className="py-1 px-1 mt-1 rounded-md w-max text-xs text-shinyBlack bg-tagGreen">
          Total: ${quote?.total.toFixed(2)}
        </div>
      </td>
    );
    if ((day + firstDay) % 7 === 0 || day === daysInMonth) {
      weeks.push(days);
      days = [];
    }
  }

  const getWeekDetails = (data: any) => {
    const splitDate = data.split("-"); // split date to get year, month and day
    // convert to ISOString
    const dateData = convertToISOString(
      splitDate[0],
      splitDate[1],
      splitDate[2]
    );
    const propsObj: { selectedDate: String; openModal: Boolean } = {
      selectedDate: dateData,
      openModal: true,
    };
    openDrawer(propsObj);
  };

  const convertToISOString = (
    day: number,
    month: number,
    year: number
  ): String => {
    const date = new Date(Date.UTC(year, month, day)); // Month is zero-indexed
    return date.toISOString();
  };

  const getMonthsValue = (data: string): string => {
    return `${months[Number(data)]}`;
  };

  /**
   *
   * @param slug
   * Function to navigate the Calendar using slug params
   * Here if slug === 'back', this means we are moving backward
   * Else we are moving up the calendar
   * NB: Last simulated date is 2024-12-31
   * This means after 31 december 2024, the Calendar navigates back to 2022
   */
  const navigateCalendar = (slug: String) => {
    switch (slug) {
      case "back":
        if (year > 2022) {
          if (month === 0) {
            setMonth(11);
            setYear(year - 1);
          } else {
            setMonth(month - 1);
          }
        } else {
          if (month > 0) setMonth(month - 1);
        }
        break;

      default:
        if (year === 2024) {
          if (month < 11) setMonth(month + 1);
        } else {
          if (month === 11) {
            setMonth(0);
            setYear(year + 1);
          } else {
            setMonth(month + 1);
          }
        }
        break;
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between lg:p-4 md:p-4 py-4 px-1">
        <span className="flex flex-grow">
          <span className="flex flex-col">
            <h2 className="lg:text-2xl md:text-2xl text-base font-semibold">
              All Existing Quotes
            </h2>
            <h1 className="text-xs" style={{ color: "#6B7280" }}>
              View all created quotes
            </h1>
          </span>
        </span>
        <span className="flex flex-col justify-center">
          <span className="flex gap-3">
            <span className="flex gap-1">
              <p className="lg:text-2xl md:text-2xl text-base">
                {`${getMonthsValue(String(month).padStart(2, "0"))}`}
              </p>
              <p className="lg:text-2xl md:text-2xl text-base text-shinyGreen">
                {year}
              </p>
            </span>
            <span className="flex lg:gap-2 md:gap-2 gap-1">
              <p
                className="flex flex-col justify-center cursor-pointer"
                onClick={() => navigateCalendar("back")}
              >
                <ChevronLeft />
              </p>
              <p
                className="flex flex-col justify-center cursor-pointer"
                onClick={() => navigateCalendar("forward")}
              >
                <ChevronRight />
              </p>
            </span>
          </span>
        </span>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="calendar table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Sun</th>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Mon</th>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Tue</th>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Wed</th>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Thu</th>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Fri</th>
              <th className="px-4 py-3 font-[500] text-shinyGrey">Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, index) => (
              <tr key={index}>{week}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
