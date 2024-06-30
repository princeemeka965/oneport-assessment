import * as React from "react";
import { ChevronLeft, EyeIcon } from "./components/SvgIcons";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

function NewQuote() {
  return (
    <>
      <header className="w-full flex lg:p-9 md:p-9 py-6 px-4 bg-lightGray">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 text-xs">
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
          <div className="flex gap-3">
            <button
              type="button"
              className="py-2 px-4 flex justify-center rounded-md bg-white text-romanSilver text-sm"
            >
              Save as draft
            </button>
            <button
              type="button"
              className="py-2 px-4 flex justify-center gap-2 rounded-md bg-lightGreen text-sm"
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

      <div className="my-10 flex flex-col w-full lg:px-9 md:px-9 px-4">
        <div className="w-full flex py-3 px-5 bg-maniacGray rounded-t-md">
          <div className="flex gap-2">
            <p className="text-xs text-darkCrayola font-[500] flex flex-col justify-center">
              Change Quote Time
            </p>
            <div className="w-max py-1 px-3 border flex gap-3 rounded-full">
              <p className="text-xs text-darkGreen flex flex-col justify-center">
                Sat 7th, May 2024
              </p>
              <div className="flex">
                <TimeRangePicker
                  className={"text-xs text-gray-500"}
                  clearIcon={null}
                  clockIcon={null}
                  value={["22:15:00", "23:45:00"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewQuote;
