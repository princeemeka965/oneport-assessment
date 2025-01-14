import React from "react";
import Calendar from "./modules/Calendar";
import SideBar from "./modules/SideBar";
import CreateQuoteModal from "./modules/CreateQuoteModal";

function App() {
  const [open, setOpen] = React.useState<Boolean>(false);
  const [openQuote, setOpenQuote] = React.useState<Boolean>(false);
  const [singleQuote, setSingleQuote] = React.useState<{}[]>([]);

  const handleOpenDrawer = (data: { quoteObj: any; openModal: Boolean }) => {
    setSingleQuote(data.quoteObj);
    /**
     * First we check if the selected date has quote Items, identified by _id
     * If true, open the side bar to view
     * If false, open the Create quote modal
     */
    if (data.quoteObj.length > 0) {
      if (data.quoteObj[0]._id && data.openModal) {
        setOpen(data.openModal);
      } else if (!data.quoteObj[0]._id && data.openModal) {
        setOpenQuote(true);
      }
    } else {
      setOpen(false);
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
          quoteData={singleQuote}
          onClose={() => setOpenQuote(false)}
        />
      </div>
    </>
  );
}

export default App;
