import React from "react";
import Calendar from "./components/Calendar";
import SideBar from "./components/SideBar";
import CreateQuoteModal from "./components/CreateQuoteModal";

function App() {
  const [open, setOpen] = React.useState<Boolean>(false);
  const [openQuote, setOpenQuote] = React.useState<Boolean>(false);

  const handleOpenDrawer = (data: {
    selectedDate: String;
    openModal: Boolean;
  }) => {
    setOpen(data.openModal);
  };

  const handleOpenQuote = (data: Boolean) => {
    setOpenQuote(data);
  };

  return (
    <>
      <div className="w-full flex flex-col p-3">
        <Calendar openDrawer={handleOpenDrawer} />
        <SideBar sideBarOpen={open} openQuote={handleOpenQuote} />
        <CreateQuoteModal
          isOpen={openQuote}
          onClose={() => setOpenQuote(false)}
        />
      </div>
    </>
  );
}

export default App;
