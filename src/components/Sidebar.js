import React from "react";

import DashBoardToggle from "./dashboard/DashBoardToggle";
import CreateRoomBtn from "./dashboard/CreateRoomBtn";

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashBoardToggle />
        <CreateRoomBtn />
      </div>
      Bottom
    </div>
  );
};

export default Sidebar;
