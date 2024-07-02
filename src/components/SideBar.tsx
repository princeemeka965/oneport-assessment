import React from "react";
import { Sun } from "./SvgIcons";
import { convertToLocaleTime } from "../helpers/timeFormat";

interface ChildComponentProps {
  onClose: () => void;
  sideBarOpen: Boolean;
  quoteData: {}[];
  openQuote: (data: Boolean) => void;
}

const SideBar: React.FC<ChildComponentProps> = ({
  onClose,
  sideBarOpen,
  quoteData,
  openQuote,
}) => {
  const getQuoteAmount = (quoteSections: {}[]): String => {
    const sectionTotal = quoteSections.reduce(
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
    return sectionTotal.toLocaleString();
  };

  console.log(quoteData);

  return (
    <>
      <div
        className={`sidebar right-0 h-full fixed bg-darkActive overflow-y-auto lg:w-[300px] md:w-[300px] w-full lg:top-[5.8rem] top-0 ${
          sideBarOpen ? "open" : "closed"
        }`}
      >
        <div className="w-full flex justify-end" style={{ marginTop: "auto" }}>
          <button
            className="border-blueFold w-auto mx-2 flex cursor-pointer text-white"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="w-full flex p-5 flex-col justify-between gap-2">
          {/**
           * Side Bar Header
           */}
          <div className="flex justify-between w-full">
            <div className="flex gap-1">
              <p className="text-[13px] uppercase font-bold text-blueFold">
                Today
              </p>
              <p className="text-[13px] text-blueFold">2/5/2024</p>
            </div>
            <div className="flex justify-end">
              <p className="text-[13px] font-bold">55º</p>
              <p className="text-[13px]">/40º</p>
              <span className="ml-3">
                <Sun />
              </span>
            </div>
          </div>
          {/**
           * Side Bar Contents
           */}
          <div className="flex w-full flex-col gap-6 my-4">
            {quoteData?.map((contentData: any, index: number) => (
              <div
                className="w-full flex hover:bg-lightFur group cursor-pointer"
                key={index}
              >
                <div className="w-1 flex flex-col mx-1 my-1 flex-grow bg-darkCrayola" />
                <div className="w-full flex flex-col h-full py-1 px-2">
                  <div className="w-full flex justify-between">
                    <p className="text-xs text-lightFur group-hover:text-blueFold">
                      ${getQuoteAmount(contentData?.sections)}
                    </p>
                    <span className="px-2 rounded-sm flex bg-darkCrayola">
                      <p className="text-xs text-lightFur">
                        {convertToLocaleTime(contentData?.quote_date)}
                      </p>
                    </span>
                  </div>
                  <div className="w-full flex mt-3">
                    <p className="text-blueFold text-xs">
                      {contentData?.quote_title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex">
            <div
              className="bg-white w-full rounded-md p-2 flex cursor-pointer justify-center"
              onClick={() => openQuote(true)}
            >
              <span className="text-xs text-shinyBlack flex gap-1">
                <p className="font-black">&#43;</p>{" "}
                <p className="flex flex-col justify-center">Add new quote</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
