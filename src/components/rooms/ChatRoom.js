import React from "react";
import { Nav } from "rsuite";
import RoomItem from "./RoomItem";

const ChatRoom = ({ aboveElementHeight }) => {
  return (
    <Nav
      apperance="subtitle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100%- ${aboveElementHeight}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoom;
