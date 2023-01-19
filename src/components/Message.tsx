import React, { useState } from "react";
import { MessageContainer } from "../styled/HomePage";
import Img from "../assets/avatar.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { messageProps } from "../redux/conversation/types";
import { format } from "timeago.js";
import moreBlack from "../assets/moreBlack.png";
import Dropdown from "react-bootstrap/Dropdown";
import { axiosFetch } from "../utils/axios-utils";
import { removeMessage } from "../redux/conversation/conversationSlice";
import { io } from "socket.io-client";

function Message({ data }: messageProps) {
  const { _id } = data;
  const { user, info } = useAppSelector((state) => state.user);
  const { sender, text, createdAt } = data;
  const { friend } = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();
  const friendImg = friend.profileImageUrl;
  const myImg = info.profileImageUrl;
  const [show, setShow] = useState(false);
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const SOCKET_KEY = import.meta.env.VITE_SOCKET_KEY;
  var SocketRef: any;

  const delData = {
    currentConversation,
    data,
  };

  const handleDelete = async () => {
    SocketRef = io(SOCKET_KEY);
    try {
      await axiosFetch({
        url: `/message/deleteone/${_id}`,
        method: "delete",
      });
      SocketRef.emit("deleteMessage", delData);
      dispatch(removeMessage(_id));
      handleClose();
    } catch (error) {
      handleClose();
      console.log("error while deleting this chat");
    }
  };

  return (
    <MessageContainer className={sender === user._id ? "owner" : ""}>
      <div className="messageInfo">
        <img
          src={
            sender === user._id
              ? myImg
                ? myImg
                : Img
              : friendImg
              ? friendImg
              : Img
          }
          alt=""
          className="profilePic"
        />
        <span>{format(createdAt)}</span>
      </div>
      <div className="messageContent">
        <div className="d-flex gap-0">
          <span className="d-flex p-1">
            {text}
            {sender === user._id && (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <img src={moreBlack} alt="more-icon" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </span>
        </div>
      </div>
    </MessageContainer>
  );
}

export default Message;
