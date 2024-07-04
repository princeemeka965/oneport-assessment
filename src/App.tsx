import React from "react";
import Calendar from "./modules/Calendar";
import SideBar from "./modules/SideBar";
import CreateQuoteModal from "./modules/CreateQuoteModal";

function App() {
  const [open, setOpen] = React.useState<Boolean>(false);
  const [openQuote, setOpenQuote] = React.useState<Boolean>(false);
  const [singleQuote, setSingleQuote] = React.useState<{}[]>([]);

  const handleOpenDrawer = (data: { quoteObj: any; openModal: Boolean }) => {
    /**
     * First we check if the selected date has quote Items
     * If true, open the side bar to view
     * If false, open the Create quote modal
     */
    if (data.quoteObj.length > 0 && data.openModal) {
      setOpen(data.openModal);
      setSingleQuote(data.quoteObj);
    } else if (data.quoteObj.length === 0 && data.openModal) {
      setOpenQuote(true);
    }
  };

  const handleOpenQuote = (data: Boolean) => {
    setOpenQuote(data);
  };

  return (
    <>
      <div className="w-full flex flex-col p-3">
        <Calendar openDrawer={handleOpenDrawer} />
        <SideBar
          onClose={() => setOpen(false)}
          sideBarOpen={open}
          quoteData={singleQuote}
          openQuote={handleOpenQuote}
        />
        <CreateQuoteModal
          isOpen={openQuote}
          onClose={() => setOpenQuote(false)}
        />
      </div>
    </>
  );
}

export default App;
