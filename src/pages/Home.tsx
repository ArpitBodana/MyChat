import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getOnlineUsers, getUserInfo } from "../redux/user/userSlice";
import { HomeContainer } from "../styled/HomePage";
import { axiosFetch } from "../utils/axios-utils";
import { io, Socket } from "socket.io-client";
import {
  newMessage,
  removeCurrentConversation,
  removeMessage,
} from "../redux/conversation/conversationSlice";
import AppBar from "../components/AppBar";
import { getLastMsg } from "../redux/allChat/allChatSlice";
import addNotification from "react-push-notification";
import Avatar from "../assets/avatar.png";

function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [inWidth, setInWidth] = useState(window.innerWidth);
  const SOCKET_KEY = import.meta.env.VITE_SOCKET_KEY;
  var SocketRef: Socket;
  const [socketConnected, setSocketConnected] = useState(false);
  const [arrivalMsg, setArrivalMsg] = useState<any | null>(null);

  useEffect(() => {
    localStorage.removeItem("currentChatId");
    dispatch(removeCurrentConversation());
    SocketRef = io(SOCKET_KEY);
    SocketRef.emit("setup", user);
    SocketRef?.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    SocketRef?.on("message recieved", (newMessages: any) => {
      if (inWidth < 550) {
        setArrivalMsg(newMessages);
      }
    });
  });

  useEffect(() => {
    if (inWidth < 550) {
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
        () => dispatch(newMessage(arrivalMsg));
        dispatch(
          getLastMsg({
            _id: arrivalMsg?.currentConversation._id,
            lastMessage: arrivalMsg?.text,
            time: String(Date.now()),
          })
        );
        setArrivalMsg(null);
      }
    }
  }, [arrivalMsg]);

  useEffect(() => {
    function handleResize() {
      setInWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    SocketRef?.on("message delete", (newMessage: any) => {
      const id = localStorage.getItem("currentChatId");
      if (!id || id !== newMessage?.conversationId) {
        //give notification
      } else {
        dispatch(removeMessage(newMessage._id));
      }
    });
  });

  useEffect(() => {
    SocketRef.emit("addUser", user._id);
  }, [user._id]);

  useEffect(() => {
    SocketRef?.on("getOnlineUsers", (users: any) => {
      let online = users.map((item: any) => item.userId);
      dispatch(getOnlineUsers(online));
    });
  });

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const { data } = await axiosFetch({
          url: `/users/search/?userId=${user._id}`,
          method: "get",
        });
        dispatch(getUserInfo(data));
      } catch (error) {
        console.log(error);
      }
    };
    getMyInfo();
  }, [user._id]);

  return (
    <>
      <AppBar />
      <HomeContainer>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="home-container">
          <Sidebar />
          {inWidth > 550 && <Chat />}
        </div>
      </HomeContainer>
    </>
  );
}

export default Home;
