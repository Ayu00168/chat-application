import React, { useEffect, useRef, useState } from "react";
import { Divider } from "rsuite";
import DashBoardToggle from "./dashboard/DashBoardToggle";
import CreateRoomBtn from "./dashboard/CreateRoomBtn";
import ChatRoomList from "./rooms/ChatRoomList";
const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashBoardToggle />
        <CreateRoomBtn />
        <Divider> Join Conversation </Divider>
      </div>
      <ChatRoomList aboveElementHeight={height} />
    </div>
  );
};

export default Sidebar;
