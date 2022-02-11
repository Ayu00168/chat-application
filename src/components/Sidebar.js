import React, { useEffect, useRef, useState } from "react";
import { Divider } from "rsuite";
import DashBoardToggle from "./dashboard/DashBoardToggle";
import CreateRoomBtn from "./dashboard/CreateRoomBtn";
import ChatRoom from "./rooms/ChatRoom";
const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState();

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div>
        <DashBoardToggle />
        <CreateRoomBtn />
        <Divider> Join Conversation </Divider>
      </div>
      <ChatRoom aboveElementHeight={height} />
    </div>
  );
};

export default Sidebar;
