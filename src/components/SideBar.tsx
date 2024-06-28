import * as React from "react";
import { Sun } from "./SvgIcons";

interface ChildComponentProps {
  sideBarOpen: Boolean;
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

const SideBar: React.FC<ChildComponentProps> = ({ sideBarOpen }) => {
  return (
    <>
      <div
        className={`sidebar right-0 h-full fixed bg-darkActive lg:w-[300px] md:w-[300px] w-full lg:top-[5.8rem] top-0 ${
          sideBarOpen ? "open" : "closed"
        }`}
      >
        <div className="w-full flex p-5 flex-col gap-2">
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
          <div className="flex w-full flex-col gap-2 my-3">
            {sideContentData.map((contentData, index) => (
              <div className="w-full flex flex-col h-full py-2" key={index}>
                <div className="w-full flex justify-between">
                  <p className="text-xs text-lightFur">{contentData.amount}</p>
                </div>
                <div className="w-full flex my-3">
                  <p className="text-blueFold text-xs">{contentData.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
