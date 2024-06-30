import { Card } from "@material-tailwind/react";
import { TrashIcon, USAIcon } from "./SvgIcons";

interface SectionsBlockProps {
  sectionContents: SectionDataProps[];
  addBasis: (data: any) => void;
}

interface SectionDataProps {
  _id: String;
  section_name: String;
  section_number: Number;
  section_currency: String;
  section_data: {}[];
}

const SectionsBlock: React.FC<SectionsBlockProps> = ({
  sectionContents,
  addBasis,
}) => {
  let TABLE_HEAD: String[] = [
    "Basics",
    "Unit of measure",
    "Unit",
    "Rate",
    "Amount",
    "",
  ];

  const addNewBasis = (data: any) => {
    addBasis(data);
  };

  return (
    <>
      {sectionContents.map((section: SectionDataProps, index: number) => (
        <>
          <div className="w-full flex gap-12 mb-10" key={index}>
            <div className="flex flex-col lg:w-3/4 md:w-3/4 w-full">
              <div className="w-full flex justify-between">
                <div className="flex w-max">
                  <input
                    type="text"
                    className="w-full h-full py-6 px-3 focus:border focus:outline-none focus:border-boltGreen text-sm"
                    placeholder="Enter Section Label"
                    autoFocus
                  />
                </div>
                {/** Remove other sections except the first one */}
                {index > 0 ? (
                  <div className="flex justify-end">
                    <span className="flex flex-col justify-center">
                      <p className="text-desire text-xs font-[400] cursor-pointer">
                        Remove Section
                      </p>
                    </span>
                  </div>
                ) : null}
              </div>
              <Card className="h-full w-full overflow-auto rounded-none">
                <table className="lg:w-full md:w-full w-[800px] table-auto text-left">
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
                    {section.section_data.map((contents, index) => {
                      const classes = "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Enter Basis"
                            />
                          </td>
                          <td className={classes}>
                            <select className="w-full h-full py-2 px-1 bg-white focus:outline-none text-sm">
                              <option>Per Kilogram</option>
                            </select>
                          </td>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Enter unit"
                            />
                          </td>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Enter rate"
                            />
                          </td>
                          <td className={classes}>
                            <input
                              type="text"
                              className="w-full h-full py-2 px-1 focus:outline-none text-sm"
                              placeholder="Amount"
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
            <div className="lg:flex md:flex hidden my-5 flex-col">
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

          {index < sectionContents.length - 1 ? (
            <div className="lg:w-3/4 border"></div>
          ) : null}
        </>
      ))}
    </>
  );
};

export default SectionsBlock;
