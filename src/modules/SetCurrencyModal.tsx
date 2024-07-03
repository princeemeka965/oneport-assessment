import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Option, Checkbox } from "@material-tailwind/react";
import Modal from "../components/Modal";
import { NigeriaIcon, USAIcon } from "../components/SvgIcons";
import { savePayloadSchema } from "../store/actions";

interface SetCurrencyModalProps {
  isOpen: Boolean;
  sectionId: any;
  onClose: () => void;
}

const SetCurrencyModal: React.FC<SetCurrencyModalProps> = ({
  isOpen,
  onClose,
  sectionId,
}) => {
  const dispatch = useDispatch();

  const { quotePayload } = useSelector((state: any) => ({
    quotePayload: state.quotePayload,
  }));

  const [isBaseCurrency, setIsBaseCurrency] = useState(false);
  const [sectionCurrency, setSectionCurrency] = useState("");
  const [customerCurrency, setCustomerCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  useEffect(() => {
    quotePayload.sections.forEach((section: any) => {
      setSectionCurrency(section.section_currency.currency);
      setCustomerCurrency(section.section_currency.customer_currency);
      setExchangeRate(section.section_currency.exchange_rate);
    });
  }, [quotePayload.sections]);

  if (!isOpen) {
    return null;
  }

  let countries: {}[] = [
    {
      id: Math.random(),
      name: "USD",
    },
    {
      id: Math.random(),
      name: "NGN",
    },
  ];

  const changeCustomerCurrency = (data: any) => {
    setCustomerCurrency(data);
  };

  const changeSectionCurrency = (data: any) => {
    setSectionCurrency(data);
  };

  const changeCurrencyRate = (data: any) => {
    setExchangeRate(data.target.value);
  };

  const setSectionCurrencySchema = (): any => {
    const updatedSections = quotePayload.sections.map((section: any) => {
      if (section._id === sectionId) {
        return {
          ...section,
          section_currency: {
            ...section.section_currency,
            currency: sectionCurrency,
            customer_currency: customerCurrency,
            is_base_currency: isBaseCurrency,
            exchange_rate: isBaseCurrency ? "1" : exchangeRate,
          },
        };
      }
      return section;
    });

    const updatedSectionsData = {
      ...quotePayload,
      sections: updatedSections,
    };

    /**
     * send the new payload schema to the store
     * and close the modal
     */
    dispatch(savePayloadSchema(updatedSectionsData));
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      title="Set Section Currency"
      subtitle="Kindly set a currency and rate"
    >
      {() => (
        <>
          <form className="p-6 flex flex-col gap-3">
            <div className="mb-4 flex flex-col gap-2">
              <label className="block text-gray-700 text-xs">
                Select Currency
              </label>
              <Select
                size="lg"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
                value={sectionCurrency}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onChange={(e) => changeSectionCurrency(e)}
              >
                {countries.map((country: any) => (
                  <Option
                    key={country.id}
                    value={country.name}
                    className="flex items-center gap-2"
                  >
                    {country.name === "USD" ? (
                      <span className="w-[24px]">
                        <USAIcon />
                      </span>
                    ) : (
                      <span className="w-[24px]">
                        <NigeriaIcon />
                      </span>
                    )}
                    <span className="flex flex-col justify-center">
                      {country.name}
                    </span>
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <label className="block text-gray-700 text-sm">
                Is this the base currency?
              </label>
              <div className="mt-2 -mx-3">
                <label className="inline-flex items-center mr-4">
                  <Checkbox
                    crossOrigin={null}
                    color="green"
                    checked={isBaseCurrency}
                    onChange={() => [
                      setIsBaseCurrency(true),
                      setCustomerCurrency(sectionCurrency),
                    ]}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                  <span className="text-sm">Yes, it is.</span>
                </label>
                <label className="inline-flex items-center">
                  <Checkbox
                    crossOrigin={null}
                    color="green"
                    checked={!isBaseCurrency}
                    onChange={() => setIsBaseCurrency(false)}
                    className="focus:outline-none"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
              <p className="text-blue-600 mt-2 text-xs">
                <span className="font-bold">Note:</span> Base currency is the
                currency the customer will make payment in.
              </p>
            </div>

            <div className="w-full border my-1" />

            <div className={isBaseCurrency ? "opacity-50" : ""}>
              <div className="mb-4 flex flex-col gap-2">
                <label className="block text-gray-700 text-xs">
                  Customer's Currency
                </label>
                <Select
                  size="lg"
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      disabled: true,
                      className:
                        "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })
                  }
                  value={customerCurrency}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onChange={(e) => changeCustomerCurrency(e)}
                >
                  {countries.map((country: any) => (
                    <Option
                      key={country.id}
                      value={country.name}
                      className="flex items-center gap-2"
                    >
                      {country.name === "USD" ? (
                        <span className="w-[24px]">
                          <USAIcon />
                        </span>
                      ) : (
                        <span className="w-[24px]">
                          <NigeriaIcon />
                        </span>
                      )}
                      <span className="flex flex-col justify-center">
                        {country.name}
                      </span>
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="block text-gray-700 text-xs">
                  Enter Rate
                </label>
                <div className="w-full px-3 flex gap-3 py-2 border border-gray-300 rounded-md">
                  <span className="w-[24px]">
                    {customerCurrency === "USD" ? <USAIcon /> : <NigeriaIcon />}
                  </span>
                  <input
                    type="text"
                    className="w-full px-3 border-none text-sm focus:outline-none"
                    placeholder="Enter quote title here"
                    onChange={(e) => changeCurrencyRate(e)}
                    value={isBaseCurrency ? 1 : exchangeRate}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="w-full border" />

          <div className="p-6 flex w-full justify-center">
            <button
              className="py-2 px-4 w-full flex justify-center text-white rounded-md bg-shinyBlack border text-[13px] lg:text-sm"
              onClick={() => setSectionCurrencySchema()}
            >
              Set section currency
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default SetCurrencyModal;
