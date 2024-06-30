import { ChevronLeft, EyeIcon } from "./components/SvgIcons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { useNavigate } from "react-router-dom";
import SectionsBlock from "./components/SectionsBlock";

function NewQuote() {
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full flex lg:p-9 md:p-9 py-6 px-4 bg-lightGray">
        <div className="w-full flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
          <div className="flex flex-col lg:gap-2 gap-4">
            <div
              className="flex gap-1 text-xs cursor-pointer"
              onClick={() => navigate("/")}
            >
              <ChevronLeft />
              <p className="text-romanSilver">Back to quotes</p>
            </div>
            <div className="flex gap-2">
              <p className="lg:text-2xl md:text-2xl text-base text-shinyBlack">
                “Quote Title Here”
              </p>
              <p
                className="lg:text-2xl md:text-2xl text-base"
                style={{ color: "#9CA3AF" }}
              >
                [2/5/2024]
              </p>
            </div>
          </div>
          <div className="flex w-full lg:w-max md:w-max justify-center gap-3">
            <button
              type="button"
              className="py-2 px-4 flex justify-center rounded-md bg-white border-2 text-romanSilver text-[13px] lg:text-sm"
            >
              Save as draft
            </button>
            <button
              type="button"
              className="py-2 px-4 flex justify-center gap-2 rounded-md border-2 bg-lightGreen text-[13px] lg:text-sm"
              style={{ color: "#005C00" }}
            >
              <span className="flex flex-col pt-[2px] justify-center">
                <EyeIcon />
              </span>
              Preview
            </button>
          </div>
        </div>
      </header>

      <div className="my-10 flex flex-col w-full lg:px-9 md:px-9 px-3">
        <div className="lg:w-3/4 md:w-3/4 w-full flex py-3 lg:px-5 px-3 bg-maniacGray rounded-t-md">
          <div className="flex lg:flex-row md:flex-row flex-col gap-2">
            <p className="text-xs text-darkCrayola font-[500] flex flex-col justify-center">
              Change Quote Time
            </p>
            <div className="w-max py-1 px-3 border-2 lg:border md:border flex lg:gap-3 gap-2 lg:-ml-0 -ml-2 rounded-full">
              <p className="text-xs text-darkGreen flex flex-col justify-center">
                Sat 7th, May 2024
              </p>
              <div className="flex border-0">
                <TimeRangePicker
                  className={"text-xs text-gray-500 border-0"}
                  clearIcon={null}
                  clockIcon={null}
                  value={["22:15:00", "23:45:00"]}
                />
              </div>
            </div>
          </div>
        </div>
        {/**
         * Sections Block comes in here
         */}
        <div className="flex flex-col gap-10 lg:my-0 md:my-0 my-4">
          <SectionsBlock />
        </div>
      </div>
    </>
  );
}

export default NewQuote;
