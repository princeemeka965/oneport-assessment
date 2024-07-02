import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "./SvgIcons";
import { getQuoteDataRequest } from "../store/actions";
import { checkCurrentDate, convertToISOString } from "../helpers/timeFormat";

interface ChildComponentProps {
  openDrawer: (data: { quoteObj: any; openModal: Boolean }) => void;
}

interface QuoteSummary {
  quoteObj: {}[];
  quoteCount: number;
  totalAmount: number;
}

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
  /**
   * Here we are making an API call on component Mount
   * This call helps us get all quotes within a date range
   * First we simulate the date range from Jan 2022 till Dec 2024
   * We dispatch the function to get our Quotes using simulatedParams
   */
  const dispatch = useDispatch();
  const { quoteData } = useSelector((state: any) => ({
    quoteData: state.quoteData,
  }));
  const [loading, setLoading] = useState<Boolean>(true);
  const simulatedRangeParams =
    "start_date=2022-01-01T00:00:00.000Z&end_date=2024-12-31T23:00:00.000Z";

  useEffect(() => {
    dispatch(getQuoteDataRequest(simulatedRangeParams));
  }, [dispatch]);

  useEffect(() => {
    if (quoteData) {
      setLoading(false);
    }
  }, [quoteData]);

  /**
   *
   * @param date
   * @param month
   * @param year
   * @param quotesData
   * @returns {quoteCount, totalAmount}
   *
   * Function to get Quote count and amount
   * Where date is the day of each month
   * Month is the month on view
   * Year is the year on view
   * And quotesData is response data gotten from our API CALL
   */
  const generateQuotes = (
    date: number,
    month: number,
    year: number,
    quotesData: any
  ): QuoteSummary => {
    // convert date to ISOString
    const paramsDatetoISOString = convertToISOString(date, month, year);

    // if there is no quote data
    if (!quotesData)
      return {
        quoteCount: 0,
        totalAmount: 0,
        quoteObj: [],
      };

    // If there is quote data, find the quotes for that day
    const quoteForDate = quotesData.filter(
      (quote: any) =>
        quote.quote_date.split("T")[0] === paramsDatetoISOString.split("T")[0]
    );

    // If there is no quote for that day
    if (quoteForDate.length === 0)
      return {
        quoteCount: 0,
        totalAmount: 0,
        quoteObj: [],
      };

    // If there is quote for that day
    const quoteCount = quoteForDate.length;
    const totalAmount = quoteForDate.reduce((total: number, quote: any) => {
      const sectionTotal = quote.sections.reduce(
        (sectionSum: any, section: any) => {
          const sectionDataTotal = section.section_data.reduce(
            (dataSum: number, data: { amount: number }) => {
              return dataSum + data.amount;
            },
            0
          );
          return sectionSum + sectionDataTotal;
        },
        0
      );
      return total + sectionTotal;
    }, 0);

    const quoteObj = quoteForDate;
    return { quoteCount, totalAmount, quoteObj };
  };

  const currentMonth = new Date().getMonth(); // get the current Month
  const currentDay = new Date().getDate(); // get today's date
  const currentYear = new Date().getFullYear(); // get current Year

  const [year, setYear] = useState<number>(currentYear); // Set the current Year
  const [month, setMonth] = useState<number>(currentMonth); // Set the current Month
  const [clickedDay, setClickedDay] = useState(0); // get the value of each clicked day

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: JSX.Element[][] = [];
  let days: JSX.Element[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<td key={`empty-${i}`}></td>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const quote = generateQuotes(day, month, year, quoteData);

    days.push(
      <td
        key={day}
        onClick={() => {
          getWeekDetails(quote?.quoteObj);
          setClickedDay(day);
        }}
        className={clickedDay === day ? "bg-darkActive" : ""}
      >
        <div
          className={`${
            checkCurrentDate(day, month, year)
              ? "px-2 rounded-md bg-shinyBlue w-max text-base text-white"
              : "text-shinyGrey px-1 text-base"
          }`}
        >
          {day}
        </div>
        <div className="text-xs mt-8 px-1 text-shinyBlack">
          {quote?.quoteCount} Quotes
        </div>
        <div className="py-1 px-1 mt-1 rounded-md w-max text-xs text-shinyBlack bg-tagGreen">
          Total: ${quote?.totalAmount.toFixed(2)}
        </div>
      </td>
    );
    if ((day + firstDay) % 7 === 0 || day === daysInMonth) {
      weeks.push(days);
      days = [];
    }
  }

  const getWeekDetails = (data: any) => {
    if (data.length > 0) {
      const propsObj: { quoteObj: any; openModal: Boolean } = {
        quoteObj: data,
        openModal: true,
      };
      openDrawer(propsObj);
    }
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
   * This means after 31 december 2024, the Calendar navigates back to 2022 January
   */
  const navigateCalendar = (slug: String) => {
    setClickedDay(0);
    openDrawer({ quoteObj: null, openModal: false });
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <>
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
                  <th className="p-4 font-[500] text-shinyGrey">Sun</th>
                  <th className="p-4 font-[500] text-shinyGrey">Mon</th>
                  <th className="p-4 font-[500] text-shinyGrey">Tue</th>
                  <th className="p-4 font-[500] text-shinyGrey">Wed</th>
                  <th className="p-4 font-[500] text-shinyGrey">Thu</th>
                  <th className="p-4 font-[500] text-shinyGrey">Fri</th>
                  <th className="p-4 font-[500] text-shinyGrey">Sat</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, index) => (
                  <tr key={index}>{week}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
