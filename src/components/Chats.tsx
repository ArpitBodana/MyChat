import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getCurrentConversation } from "../redux/conversation/conversationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { axiosFetch } from "../utils/axios-utils";
import Conversation from "./Conversation";
import Loading from "./Loading";

function Chats() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [conversations, setConversations] = useState([]);
  const SOCKET_KEY = import.meta.env.VITE_SOCKET_KEY;
  var SocketRef: any;
  const [inWidth, setInWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleResize() {
      setInWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const currentChatId = localStorage.getItem("currentChatId");

  useEffect(() => {
    setLoading(true);
    const getConversations = async () => {
      try {
        const { data } = await axiosFetch({
          url: `/conversation/${user._id}`,
          method: "post",
        });
        setConversations(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getConversations();
  }, [user._id, currentChatId]);

  const currentChatHandler = (data: any) => {
    SocketRef = io(SOCKET_KEY);
    dispatch(getCurrentConversation(data));
    SocketRef?.emit("joinChat", data._id);
    localStorage.setItem("currentChatId", data._id);
    if (inWidth < 550) {
      navigate("/messaging");
    }
  };

  return (
    <div className="scrollMe">
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="d-flex p-2 justify-content-between">
            <span className=" mx-2">Friends {conversations.length}</span>
          </div>
          {conversations.length > 0 &&
            conversations.map((convo: any) => (
              <div key={convo._id} onClick={() => currentChatHandler(convo)}>
                <Conversation data={convo} />
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Chats;
