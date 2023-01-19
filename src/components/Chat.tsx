import React, { useEffect, useState } from "react";
import { ChatInfoContainer } from "../styled/HomePage";
import More from "../assets/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { axiosFetch } from "../utils/axios-utils";
import {
  getCurrentMessages,
  getFriendData,
  newMessage,
  removeCurrentConversation,
} from "../redux/conversation/conversationSlice";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { getLastMsg, removeLastMsg } from "../redux/allChat/allChatSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Avatar from "../assets/avatar.png";
import onlineLogo from "../assets/Online.png";
import { io, Socket } from "socket.io-client";
import addNotification from "react-push-notification";

function Chat() {
  const { currentConversation, messages, friend } = useAppSelector(
    (state) => state.conversation
  );
  const { user, onlineUsers } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const friendId = currentConversation.members?.find((m) => m !== user._id);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const SOCKET_KEY = import.meta.env.VITE_SOCKET_KEY;
  var SocketRef: Socket;
  const [arrivalMsg, setArrivalMsg] = useState<any | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleDeleteChat = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/conversation/delete`,
        method: "delete",
        data: { id: currentConversation._id },
      });
      dispatch(removeCurrentConversation());
      dispatch(removeLastMsg(currentConversation));
      handleClose();
    } catch (error) {
      handleClose();
    }
  };

  const readMyMessages = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/message/read/${currentConversation._id}`,
        method: "put",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    SocketRef = io(SOCKET_KEY);
    SocketRef.emit("setup", user);
    SocketRef?.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    SocketRef?.on("message recieved", (newMessage: any) => {
      setArrivalMsg(newMessage);
    });

    SocketRef?.on("frndTyping", (data: any) => {
      const id = localStorage.getItem("currentChatId");
      if (!id || id !== data._id) {
      } else {
        if (data.sender !== user._id) {
          setIsTyping(true);
        }
      }
    });

    SocketRef?.on("stopfrndTyping", (data: any) => {
      const id = localStorage.getItem("currentChatId");
      if (!id || id !== data._id) {
      } else {
        if (data.sender !== user._id) {
          setIsTyping(false);
        }
      }
    });
  });

  useEffect(() => {
    const id = localStorage.getItem("currentChatId");
    if (!id || id !== arrivalMsg?.currentConversation._id) {
      //give notification
      if (!arrivalMsg?.currentConversation._id) {
        ///do nothing
      } else if (id !== arrivalMsg?.currentConversation._id) {
        axiosFetch({
          url: `/users/search/?userId=${arrivalMsg?.sender}`,
          method: "get",
        })
          .then((res: any) => {
            dispatch(
              getLastMsg({
                _id: arrivalMsg?.currentConversation._id,
                lastMessage: arrivalMsg?.text,
                time: String(Date.now()),
                newMessage: true,
              })
            );
            addNotification({
              title: `${res.data.name}`,
              subtitle: "Message",
              message: `${arrivalMsg?.text}`,
              native: true,
              duration: 3000,
              icon: `${
                res.data.profileImageUrl ? res.data.profileImageUrl : Avatar
              }`,
            });
            setArrivalMsg(null);
          })
          .catch((err) => console.log(err));
      }
    } else {
      dispatch(newMessage(arrivalMsg));
      dispatch(
        getLastMsg({
          _id: arrivalMsg?.currentConversation._id,
          lastMessage: arrivalMsg?.text,
          time: String(Date.now()),
        })
      );
      readMyMessages();
      setArrivalMsg(null);
    }
  }, [arrivalMsg, currentConversation]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosFetch({
          url: `/message/${currentConversation._id}`,
          method: "get",
        });
        dispatch(getCurrentMessages(data));
      } catch (error) {
        console.log(error);
      }
    };
    const getFriend = async () => {
      if (friendId) {
        try {
          const { data } = await axiosFetch({
            url: `/users/search/?userId=${friendId}`,
            method: "get",
          });
          dispatch(getFriendData(data));
        } catch (error) {
          console.log(error);
        }
      }
    };

    getMessages();
    getFriend();
    readMyMessages();
  }, [currentConversation, user, friendId, dispatch]);

  return (
    <div className="chat">
      {currentConversation._id ? (
        <>
          <ChatInfoContainer>
            <div>
              <img
                src={friend.profileImageUrl ? friend.profileImageUrl : Avatar}
                alt=""
                className="chatHeaderImage"
                onClick={() => navigate(`/profile/${friendId}`)}
              />
              {
                //@ts-ignore
                onlineUsers.includes(friendId) && (
                  <img src={onlineLogo} alt="" className="online-mark" />
                )
              }
              <span>{friend.name} </span>
            </div>
            <div className="chatIcons">
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <img src={More} alt="more-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={handleShow}
                    disabled={messages.length === 0}
                  >
                    Delete Chat
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </ChatInfoContainer>
          <Modal centered show={show} onHide={handleClose}>
            <Modal.Header className="" closeButton>
              <Modal.Title>Delete Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body className=" text-reset">
              By using this option conversation will be deleted from both end.
              Are you sure?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="danger" onClick={handleDeleteChat}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <Messages data={messages} typing={isTyping} />
          <Input />
        </>
      ) : (
        <span className="noChat">Open a conversation to start chat.</span>
      )}
    </div>
  );
}

export default Chat;
