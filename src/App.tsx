import React from "react";
import Calendar from "./components/Calendar";
import SideBar from "./components/SideBar";

function App() {
  const [open, setOpen] = React.useState<Boolean>(false);

  const handleOpenDrawer = (data: {
    selectedDate: String;
    openModal: Boolean;
  }) => {
    setOpen(data.openModal);
  };

  return (
    <>
      <div className="w-full flex flex-col p-3">
        <Calendar openDrawer={handleOpenDrawer} />
        <SideBar sideBarOpen={open} />
      </div>
    </>
  );
}

export default App;
