import React from "react";
import { useLocation } from "react-router-dom";
import { Loader, Nav } from "rsuite";
import RoomItem from "./RoomItem";
import { useRooms } from "../../context/room.context";
import { Link } from "react-router-dom";

const ChatRoomList = ({ aboveElementHeight }) => {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      apperance="subtitle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElementHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => (
          <Nav.Item
            componentClass={Link}
            to={`/chat/${room.id}`}
            key={room.id}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
