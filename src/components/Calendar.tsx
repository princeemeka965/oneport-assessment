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
  const [year] = useState<number>(2024); // Simulate 2024 as the year to use
  const [month] = useState<number>(currentMonth); // Set the current
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

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between p-4">
        <span className="flex flex-grow">
          <span className="flex flex-col">
            <h2 className="text-2xl font-semibold">All Existing Quotes</h2>
            <h1 className="text-xs" style={{ color: "#6B7280" }}>
              View all created quotes
            </h1>
          </span>
        </span>
        <span className="flex flex-col justify-center">
          <span className="flex gap-3">
            <span className="flex gap-1">
              <p className="text-2xl">
                {`${getMonthsValue(String(month).padStart(2, "0"))}`}
              </p>
              <p className="text-2xl text-shinyGreen">{year}</p>
            </span>
            <span className="flex gap-3">
              <p className="flex flex-col justify-center">
                <ChevronLeft />
              </p>
              <p className="flex flex-col justify-center">
                <ChevronRight />
              </p>
            </span>
          </span>
        </span>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>{week}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
