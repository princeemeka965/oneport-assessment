import React, { useState } from "react";
import { Select, Option, Checkbox } from "@material-tailwind/react";
import Modal from "./Modal";
import { NigeriaIcon, USAIcon } from "./SvgIcons";

interface SetCurrencyModalProps {
  isOpen: Boolean;
  onClose: () => void;
}

const SetCurrencyModal: React.FC<SetCurrencyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isBaseCurrency, setIsBaseCurrency] = useState(false);

  if (!isOpen) return null;

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
                    onChange={() => setIsBaseCurrency(true)}
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
                  value={"NGN"}
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
                    <NigeriaIcon />
                  </span>
                  <p className="flex flex-col justify-center text-sm">
                    &#8358;1,119.53
                  </p>
                </div>
              </div>
            </div>
          </form>

          <div className="w-full border" />

          <div className="p-6 flex w-full justify-center">
            <button className="py-2 px-4 w-full flex justify-center text-white rounded-md bg-shinyBlack border text-[13px] lg:text-sm">
              Set section currency
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default SetCurrencyModal;
