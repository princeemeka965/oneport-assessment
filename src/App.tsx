import React from "react";
import Calendar from "./modules/Calendar";
import SideBar from "./modules/SideBar";
import CreateQuoteModal from "./modules/CreateQuoteModal";

function App() {
  const [open, setOpen] = React.useState<Boolean>(false);
  const [openQuote, setOpenQuote] = React.useState<Boolean>(false);
  const [singleQuote, setSingleQuote] = React.useState<{}[]>([]);

  const handleOpenDrawer = (data: { quoteObj: any; openModal: Boolean }) => {
    if (Object.keys(data.quoteObj).length > 0) {
      setOpen(data.openModal);
      setSingleQuote(data.quoteObj);
    } else {
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
