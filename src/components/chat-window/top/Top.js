import React, { memo } from "react";
import { ButtonToolbar, Icon } from "rsuite";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../../misc/custom-hook";
import RoomInfoBtnModal from "./RoomInfoBtnModal";
import EditRoomModal from "./EditRoomModal";

const Top = () => {
  const name = useCurrentRoom((v) => v.name);

  const isMobile = useMediaQuery();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            size="2x"
            className={
              isMobile
                ? "d-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="white-sapce:no-wrap">
          <EditRoomModal />
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
