import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseIcon, DownloadIcon } from "../components/SvgIcons";
import { formatDateToString } from "../helpers/timeFormat";
import { postQuoteRequest } from "../store/actions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
}

const PreviewQuote: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { quotePayload } = useSelector((state: any) => ({
    quotePayload: state.quotePayload,
  }));

  if (!isOpen) return null;

  const totalUnitOfMeasurement = quotePayload.sections.reduce(
    (total: any, section: any) => {
      return (
        total +
        section.section_data.reduce((sectionTotal: any, item: any) => {
          return sectionTotal + item.unit;
        }, 0)
      );
    },
    0
  );

  const createQuote = () => {
    // first we remove all Id and start, end time used in the payload schema
    const formatPayload = removeUnwantedFields(quotePayload);

    // Create the Quote
    dispatch(postQuoteRequest(formatPayload));
  };

  /**
   *
   * @param data
   * @returns
   *
   * Function to remove all fields that are not needed
   */
  const removeUnwantedFields = (data: any) => {
    const { start_time, end_time, ...rest } = data; // Remove start_time and end_time from the top level
    const cleanedData = { ...rest }; // Copy the remaining data

    if (cleanedData.sections) {
      cleanedData.sections = cleanedData.sections.map((section: any) => {
        const { _id, ...cleanedSection } = section; // Remove _id from section
        if (cleanedSection.section_data) {
          cleanedSection.section_data = cleanedSection.section_data.map(
            (item: any) => {
              const { _id, ...cleanedItem } = item; // Remove _id from each item in section_data
              return cleanedItem;
            }
          );
        }
        return cleanedSection;
      });
    }

    return cleanedData;
  };

  let TABLE_HEAD: String[] = [
    "Basics",
    "Unit of measure",
    "Unit",
    "Rate",
    "Amount",
  ];

  const getTotalAmount = (sectionData: any) => {
    const totalAmount = sectionData.reduce((total: any, item: any) => {
      return Number(total) + Number(item.amount);
    }, 0);

    return totalAmount;
  };

  /**
   *
   * @returns
   *
   * Function to download Quote
   */
  const downloadQuote = async () => {
    // Get the content of the div
    const contentElement = document.getElementById("quote");
    if (!contentElement) {
      console.error("Content element not found");
      return;
    }
    // Use html2canvas to capture the content of the div
    const canvas = await html2canvas(contentElement);

    // Create a PDF document
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate the width and height of the image in PDF
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("content.pdf");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center pt-1 bg-seaGreen bg-opacity-50">
        <div className="bg-white rounded-md shadow-lg lg:w-11/12 md:w-11/12 w-full max-h-full overflow-y-auto">
          <header className="w-full flex lg:p-9 md:p-9 py-6 rounded-t-md px-4 bg-lightGray">
            <div className="w-full flex lg:flex-row flex-col gap-4 lg:justify-between lg:items-center">
              <div className="flex flex-col lg:gap-2 gap-4">
                <div className="flex gap-2">
                  <p className="lg:text-2xl md:text-2xl text-base text-shinyBlack">
                    Quote Detail
                  </p>
                  <p
                    className="lg:text-2xl md:text-2xl text-base"
                    style={{ color: "#9CA3AF" }}
                  >
                    #34920_fe2
                  </p>
                </div>
              </div>
              <div className="lg:flex md:flex w-full lg:w-max md:w-max hidden justify-center gap-4">
                <button
                  type="button"
                  className="py-2 px-4 flex justify-center rounded-md border text-white text-[13px] lg:text-sm"
                  style={{ backgroundColor: "#296FD8" }}
                  onClick={() => createQuote()}
                >
                  Save Quote
                </button>
                <button
                  type="button"
                  className="py-2 px-2 flex justify-center gap-2 rounded-md border bg-white"
                  style={{ color: "#296FD8" }}
                  onClick={() => downloadQuote()}
                >
                  <span className="w-5 h-5">
                    <DownloadIcon />
                  </span>
                </button>
                <button
                  type="button"
                  className="py-2 px-2 flex justify-center gap-2 rounded-md border bg-white"
                  onClick={onClose}
                >
                  <span className="w-5 h-5">
                    <CloseIcon />
                  </span>
                </button>
              </div>
            </div>
          </header>

          <div
            className="flex lg:px-20 md:px-20 w-full flex-col lg:my-8 md:my-8 pt-10"
            id="quote"
          >
            <div className="border rounded-lg w-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-2">
                  <img
                    src="/oneport365_logo.png"
                    alt="oneport_logo"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="text-right">
                  <p>UAC Building Marina</p>
                  <p>Lagos, Nigeria</p>
                  <p>100223</p>
                </div>
              </div>

              <div className="flex justify-between gap-4 flex-wrap lg:my-6 md:my-6 bg-maniacGray p-8">
                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">
                    Attention (Customer Name)
                  </p>
                  <p className="text-base text-shinyBlack">
                    Chukwuemeka Anyanwu
                  </p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">Email Address</p>
                  <p className="text-base text-darkGreen">
                    anyanwue4@gmail.com
                  </p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">Commodity</p>
                  <p className="text-base text-shinyBlack">Electric Goods</p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">Service Type</p>
                  <p className="text-base text-shinyBlack">
                    {quotePayload.quote_title}
                  </p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">
                    Chargeable Weight(KG)
                  </p>
                  <p className="text-base text-shinyBlack">
                    {totalUnitOfMeasurement}
                  </p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">POL(Port of Loading)</p>
                  <p className="text-base text-shinyBlack">Lagos</p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-grayCloud">
                    POL(Port of Destination)
                  </p>
                  <p className="text-base text-shinyBlack">Johannesburg</p>
                </div>

                <div className="flex flex-col mb-4 mt-2 lg:w-1/5 md:w-1/5 w-full gap-1">
                  <p className="text-xs text-desire">Due Date</p>
                  <p className="text-base text-shinyBlack">
                    {formatDateToString(quotePayload.quote_date)}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col lg:my-8 md:my-8 my-8">
                <p className="text-sm text-grayCloud">Quote Breakdown</p>

                <div className="flex flex-col w-full gap-2">
                  {quotePayload.sections.map((section: any, index: number) => (
                    <>
                      <div
                        className="w-full flex lg:flex-row md:flex-row flex-col gap-12 lg:mb-0 md:mb-0 mb-7 my-10"
                        key={index}
                      >
                        <div className="flex flex-col w-full h-full">
                          <div className="w-full flex justify-between">
                            <div className="flex w-max">
                              <div className="w-full h-full my-3">
                                <p className="text-lg text-pencilLead">
                                  {" "}
                                  {section.section_name}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="h-full w-full overflow-auto rounded-none">
                            <table className="lg:w-full md:w-full w-[900px] table-auto text-left">
                              <thead className="border-t-2 border-b-2">
                                <tr>
                                  {TABLE_HEAD.map((head, index) => (
                                    <th
                                      key={index}
                                      className="rounded-t-none p-3"
                                    >
                                      <div className="p-2 border-r-2">
                                        <p className="font-normal text-xs leading-none opacity-70">
                                          {head}
                                        </p>
                                      </div>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.section_data.map(
                                  (contents: any, index: number) => {
                                    const classes = "p-4";

                                    return (
                                      <tr key={contents._id}>
                                        <td className={classes}>
                                          <div className="lg:w-[200px] w-[160px]">
                                            <div className="w-full h-full py-2 px-1 border-r text-sm">
                                              {contents.basis}
                                            </div>
                                          </div>
                                        </td>
                                        <td className={classes}>
                                          <div className="lg:w-[200px] w-[160px]">
                                            <div className="w-full h-full py-2 px-1 border-r text-sm">
                                              {contents.unit_of_measurement}
                                            </div>
                                          </div>
                                        </td>
                                        <td className={classes}>
                                          <div className="lg:w-[200px] w-[160px]">
                                            <div className="w-full h-full py-2 px-1 border-r text-sm">
                                              {contents.unit}
                                            </div>
                                          </div>
                                        </td>
                                        <td className={classes}>
                                          <div className="lg:w-[200px] w-[160px]">
                                            <div className="w-full h-full py-2 px-1 border-r text-sm">
                                              {contents.rate}
                                            </div>
                                          </div>
                                        </td>
                                        <td className={classes}>
                                          <div className="lg:w-[200px] w-[160px]">
                                            <div className="w-full h-full py-2 px-1 border-r text-sm">
                                              {contents.amount}
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td className="text-end p-4">
                                    <div className="w-full h-full py-2 px-1 border-r">
                                      <p className="text-grayCloud textlg mx-3">
                                        Sub Total
                                      </p>
                                    </div>
                                  </td>
                                  <td className="text-end p-4">
                                    <div className="w-full h-full py-2 px-1 border-r">
                                      <p className="text-grayCloud textlg mx-3">
                                        ${getTotalAmount(section.section_data)}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewQuote;
