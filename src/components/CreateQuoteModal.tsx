import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
}

const CreateQuoteModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const moveToNewQuote = () => {
    navigate("/new-quote");
  };

  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      title="Create New Quote"
      subtitle="Enter quote name and time"
    >
      {() => (
        <>
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
            <div className="w-full border" />
            <div className="flex flex-col gap-3 mt-8">
              <button
                type="button"
                className="bg-darkGreen text-white p-3 text-sm rounded-md"
                onClick={() => moveToNewQuote()}
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
        </>
      )}
    </Modal>
  );
};

export default CreateQuoteModal;
