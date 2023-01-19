import React, { useEffect, useRef, useState } from "react";
import { InputContainer } from "../styled/HomePage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { axiosFetch } from "../utils/axios-utils";
import { newMessage } from "../redux/conversation/conversationSlice";
import { io, Socket } from "socket.io-client";
import Send from "../assets/sendButton.png";
import { getLastMsg } from "../redux/allChat/allChatSlice";

function Input() {
  const [myNewMessage, setMyNewMessage] = useState("");
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const SOCKET_KEY = import.meta.env.VITE_SOCKET_KEY;
  const friendId = currentConversation.members?.find(
    (member) => member !== user._id
  );
  let SocketRef: Socket;
  const [typing, setTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    SocketRef = io(SOCKET_KEY);
    const message = {
      text: myNewMessage,
    };
    try {
      if (myNewMessage !== "") {
        const { data } = await axiosFetch({
          url: `message/${currentConversation._id}`,
          method: "post",
          data: message,
        });
        SocketRef.emit("newMessage", { ...data, currentConversation });
        dispatch(newMessage(data));
        dispatch(
          getLastMsg({
            _id: currentConversation._id,
            lastMessage: myNewMessage,
            time: String(Date.now()),
          })
        );
        setMyNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const typingHandler = async (e: any) => {
    SocketRef = io(SOCKET_KEY);
    setMyNewMessage(e?.target.value);
    if (!typing) {
      setTyping(true);
      SocketRef?.emit("typing", { ...currentConversation, sender: user._id });
    }
    var lastTypingTime = new Date().getTime();
    var timeLength = 1800;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff > timeLength && typing) {
        SocketRef?.emit("stop typing", {
          ...currentConversation,
          sender: user._id,
        });
        setTyping(false);
      }
    }, timeLength);
  };

  const scrollRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  });
  useEffect(() => {
    setMyNewMessage("");
  }, [currentConversation]);

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          placeholder="Message..."
          onChange={typingHandler}
          value={myNewMessage}
          required
          ref={scrollRef}
        />
        <div className="send">
          <button type="submit" disabled={!myNewMessage}>
            <img src={Send} />
          </button>
        </div>
      </form>
    </InputContainer>
  );
}

export default Input;
