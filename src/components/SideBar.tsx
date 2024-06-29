import * as React from "react";
import { Sun } from "./SvgIcons";

interface ChildComponentProps {
  sideBarOpen: Boolean;
  openQuote: (data: Boolean) => void;
}

interface SideContent {
  id: Number;
  amount: String;
  text: String;
}

const sideContentData: SideContent[] = [
  {
    id: 1,
    amount: "$2,450.00",
    text: "Ocean Freight/Haulage/CBT",
  },
  {
    id: 2,
    amount: "$2,450.00",
    text: "Air Freight/ Ocean Freight/ CBT/ Haulage",
  },
  {
    id: 3,
    amount: "$2,450.00",
    text: "Air Freight/ Ocean Freight/ CBT/ Haulage",
  },
];

const SideBar: React.FC<ChildComponentProps> = ({ sideBarOpen, openQuote }) => {
  return (
    <>
      <div
        className={`sidebar right-0 h-full fixed bg-darkActive lg:w-[300px] md:w-[300px] w-3/4 lg:top-[5.8rem] top-0 ${
          sideBarOpen ? "open" : "closed"
        }`}
      >
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
          <div className="flex w-full flex-col gap-6 my-3">
            {sideContentData.map((contentData, index) => (
              <div
                className="w-full flex hover:bg-lightFur group cursor-pointer"
                key={index}
              >
                <div className="w-1 flex flex-col mx-1 my-1 flex-grow bg-darkCrayola" />
                <div className="w-full flex flex-col h-full py-1 px-2">
                  <div className="w-full flex justify-between">
                    <p className="text-xs text-lightFur group-hover:text-blueFold">
                      {contentData.amount}
                    </p>
                  </div>
                  <div className="w-full flex mt-3">
                    <p className="text-blueFold text-xs">{contentData.text}</p>
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
