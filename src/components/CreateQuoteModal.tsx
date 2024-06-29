import React, { useState } from "react";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
}

const CreateQuoteModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-seaGreen bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg lg:w-1/3 md:w-1/3 w-3/4">
        <div className="flex justify-between items-center pt-5 pb-3 px-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold">Create New Quote</h2>
            <h6 className="text-xs text-romanSilver">
              Enter quote name and time
            </h6>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 text-lg hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="w-full border" />
        <form className="p-6">
          <div className="mb-8">
            <label className="block text-xs mb-2">Enter Quote Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter quote title here"
            />
          </div>
          <div className="my-6 flex justify-between">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700 text-xs mb-2">
                Start Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-xs mb-2">
                End Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <button
              type="button"
              className="bg-darkGreen text-white p-3 text-sm rounded-md"
            >
              Create New Quote
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-desire py-2 px-4 hover:text-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuoteModal;
