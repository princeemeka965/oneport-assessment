import * as React from "react";
import { Card } from "@material-tailwind/react";
import { TrashIcon, USAIcon } from "./SvgIcons";

interface SectionDataProps {
  _id: String;
  section_name: String;
  section_number: Number;
  section_currency: String;
  section_data: {}[];
}

let sections: SectionDataProps[];

sections = [
  {
    _id: "666e58e5acf1e952ba513199",
    section_name: "ORIGIN HANDLING CHARGES",
    section_number: 1,
    section_currency: "NGN",
    section_data: [
      {
        _id: "666e58e5acf1e952ba51319a",
        basis: "Basis 1",
        unit_of_measurement: "Kilogram",
        unit: 10,
        rate: 5,
        amount: 50,
      },
    ],
  },
];

const SectionsBlock: React.FC = ({}) => {
  const [sectionsData, setSectionsData] = React.useState<any>(sections);

  let TABLE_HEAD: String[] = [
    "Basics",
    "Unit of measure",
    "Unit",
    "Rate",
    "Amount",
    "",
  ];

  /**
   *
   * Function to add new data to each section
   */
  const addNewBasis = (data: any) => {
    setSectionsData((prevSectionsData: any) =>
      prevSectionsData.map((section: any) =>
        section._id === data
          ? {
              ...section,
              section_data: [
                ...section.section_data,
                {
                  _id: Math.random(),
                  basis: "",
                  unit_of_measurement: "",
                  unit: 0,
                  rate: 0,
                  amount: 0,
                },
              ],
            }
          : section
      )
    );
  };

  /**
   *
   * @param e
   * @param sectionId
   * @param dataId
   * Function to change measurement value
   */
  const changeMeasurement = (e: any, sectionId: any, dataId: any) => {
    const newMeasurement = e.target.value;
    setSectionsData((prevSectionsData: any) =>
      prevSectionsData.map((section: any) =>
        section._id === sectionId
          ? {
              ...section,
              section_data: section.section_data.map((data: any) =>
                data._id === dataId
                  ? { ...data, unit_of_measurement: newMeasurement }
                  : data
              ),
            }
          : section
      )
    );
  };

  /**
   *
   * @param e
   * @param sectionId
   * @param dataId
   * @param slug
   * Function handles Input Changes for each section basis
   * here the [slug] is the key which we are applying the changes to
   */
  const handleInputChange = (
    e: any,
    sectionId: any,
    dataId: any,
    slug: any
  ) => {
    const newValue = e.target.value;
    setSectionsData((prevSectionsData: any) =>
      prevSectionsData.map((section: any) =>
        section._id === sectionId
          ? {
              ...section,
              section_data: section.section_data.map((data: any) =>
                data._id === dataId ? { ...data, [slug]: newValue } : data
              ),
            }
          : section
      )
    );
  };

  /**
   * Function to add more sections to the Block
   */
  const addMoreSections = () => {
    const newSections = {
      _id: Math.random(),
      section_name: "",
      section_number: 1,
      section_currency: "NGN",
      section_data: [
        {
          _id: Math.random(),
          basis: "",
          unit_of_measurement: "",
          unit: 0,
          rate: 0,
          amount: 0,
        },
      ],
    };
    setSectionsData((prevSectionsData: any) => [
      ...prevSectionsData,
      newSections,
    ]);
  };

  const removeSection = (data: any) => {
    // get sections aside from the removed one
    const filteredSection = sectionsData.filter(
      (section: SectionDataProps) => section._id !== data
    );
    setSectionsData(filteredSection);
  };

  return (
    <>
      {sectionsData.map((section: SectionDataProps, index: number) => (
        <>
          <div className="w-full flex gap-12 mb-7" key={index}>
            <div className="flex flex-col lg:w-3/4 md:w-3/4 w-full">
              <div className="w-full flex justify-between">
                <div className="flex w-max">
                  <input
                    type="text"
                    className={`w-full h-full py-6 lg:px-3 md:px-3 px-1 focus:outline-none ${
                      section.section_name === ""
                        ? "border-boltGreen border"
                        : ""
                    } text-sm`}
                    placeholder="Enter Section Label"
                    value={`${section.section_name}`}
                  />
                </div>
                {/** Remove other sections except the first one */}
                {index > 0 ? (
                  <div className="flex justify-end">
                    <span className="flex flex-col justify-center">
                      <p
                        className="text-desire text-xs font-[400] cursor-pointer"
                        onClick={() => removeSection(section._id)}
                      >
                        Remove Section
                      </p>
                    </span>
                  </div>
                ) : null}
              </div>
              <Card className="h-full w-full overflow-auto rounded-none">
                <table className="lg:w-full md:w-full w-[900px] table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th
                          key={index}
                          className="rounded-t-none bg-maniacGray p-3"
                        >
                          <div className="p-2">
                            <p className="font-normal text-xs leading-none opacity-70">
                              {head}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.section_data.map((contents: any, index) => {
                      const classes = "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Enter Basis"
                              value={`${contents.basis}`}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  section._id,
                                  contents._id,
                                  "basis"
                                )
                              }
                            />
                          </td>
                          <td className={classes}>
                            <div className="lg:w-[200px] w-[160px]">
                              <select
                                className="h-full py-2 px-1 bg-white focus:outline-none text-sm"
                                value={`${contents.unit_of_measurement}`}
                                onChange={(e) =>
                                  changeMeasurement(
                                    e,
                                    section._id,
                                    contents._id
                                  )
                                }
                              >
                                <option value={"Kilogram"}>Per Kilogram</option>
                                <option value={"Gram"}>Per Gram</option>
                              </select>
                            </div>
                          </td>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Enter unit"
                              value={`${contents.unit}`}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  section._id,
                                  contents._id,
                                  "unit"
                                )
                              }
                            />
                          </td>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Enter rate"
                              value={`${contents.rate}`}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  section._id,
                                  contents._id,
                                  "rate"
                                )
                              }
                            />
                          </td>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Amount"
                              value={`${contents.amount}`}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  section._id,
                                  contents._id,
                                  "amount"
                                )
                              }
                            />
                          </td>
                          <td className={classes}>
                            <TrashIcon className="text-desire" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <div
                    className="p-4 flex w-full gap-2 cursor-pointer"
                    onClick={() => addNewBasis(section._id)}
                  >
                    <div className="flex flex-col justify-center">
                      <div className="bg-darkGreen px-1 rounded-sm text-xs text-white">
                        &#43;
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-shinyGreen">Add new basis</p>
                    </div>
                  </div>
                </table>
              </Card>
            </div>
            {/**
             * SECTION CURRENCY BLOCK DESIGN
             */}
            <div className="lg:flex md:flex hidden my-7 flex-col">
              <Card className="p-2 max-w-md shadow-none rounded-md border">
                <div className="py-3 px-2 flex justify-between gap-32">
                  <p className="text-[15px] font-[500] text-shinyBlack">
                    Section Currency
                  </p>
                  <div className="flex flex-col w-[20px] justify-center">
                    <USAIcon />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {index < sectionsData.length - 1 ? (
            <div className="lg:w-3/4 border"></div>
          ) : null}
        </>
      ))}

      <div className="lg:w-3/4 md:w-3/4 w-full flex mb-10">
        <button
          type="submit"
          className="p-4 w-full bg-lightGreen flex gap-2 justify-center"
          onClick={() => addMoreSections()}
        >
          <div className="flex flex-col justify-center mt-[1.5px]">
            <div className="bg-darkGreen px-1 rounded-sm text-xs text-white">
              &#43;
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-shinyGreen">Add new Section</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default SectionsBlock;
