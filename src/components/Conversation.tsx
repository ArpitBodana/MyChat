import React, { useEffect, useState } from "react";
import Avatar from "../assets/avatar.png";
import { ConvoType } from "../redux/conversation/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UserInfoType } from "../redux/user/types";
import { axiosFetch } from "../utils/axios-utils";
import { format } from "timeago.js";
import { getFriend, getLastMsg } from "../redux/allChat/allChatSlice";
import onlineLogo from "../assets/Online.png";
import { io } from "socket.io-client";

function Conversation({ data }: ConvoType) {
  const [friend, setFriend] = useState<UserInfoType>();
  const { user, onlineUsers } = useAppSelector((state) => state.user);
  const [lastMsg, setLastMsg] = useState("");
  const dispatch = useAppDispatch();
  const { conversation } = useAppSelector((state) => state.allChat);
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const myConvo = conversation.find((item) => item._id === data._id);
  const [unreads, setUnreads] = useState(0);
  const friendId = data.members.find((m) => m !== user._id);

  const unreadMessages = async () => {
    try {
      const res = await axiosFetch({
        url: `/message/unread/${data._id}`,
        method: "get",
      });
      setUnreads(res.data.unread.length);
    } catch (error) {
      console.log(error);
    }
  };
  const readMyMessages = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/message/read/${currentConversation._id}`,
        method: "put",
      });
      // dispatch(getFriendData(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentConversation._id && currentConversation._id === myConvo?._id) {
      readMyMessages();
      setUnreads(0);
    }
  }, [currentConversation, myConvo?.lastMessage]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosFetch({
          url: `/users/search/?userId=${friendId}`,
          method: "get",
        });
        setFriend(data);
        dispatch(getFriend(data));
      } catch (error) {
        console.log(error);
      }
    };
    const getMessages = async () => {
      const mainData = data;
      try {
        const res = await axiosFetch({
          url: `/message/${data._id}`,
          method: "get",
        });
        setLastMsg(res.data[res.data.length - 1].text);
        dispatch(
          getLastMsg({
            _id: mainData._id,
            lastMessage: res.data[res.data.length - 1].text,
            time: res.data[res.data.length - 1].createdAt,
          })
        );
      } catch (error) {
        // console.log(error);
      }
    };
    getMessages();
    getUser();
    unreadMessages();
  }, [user._id, myConvo?.lastMessage]);

  return (
    <div className="userChat">
      <div className="userChatInfo">
        <img
          src={friend?.profileImageUrl ? friend.profileImageUrl : Avatar}
          alt=""
        />
        <div className="online-mark-convo">
          {
            //@ts-ignore
            onlineUsers.includes(friendId) && (
              <img
                src={onlineLogo}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            )
          }
        </div>
        <div className=" ">
          <span>{friend?.name}</span>{" "}
          <div className="d-flex gap-4">
            <p className={`${unreads > 0 && "text-black"}`}>
              {myConvo?.lastMessage.slice(0, 9)}
              {myConvo && myConvo?.lastMessage.length > 10 && "..."}
            </p>
            <p className={`${unreads > 0 && "text-black"}`}>
              {myConvo?.time && format(myConvo.time)} <span> </span>
            </p>
            {unreads > 0 && (
              <p className=" badge bg-danger text-white rounded-circle ">
                {unreads}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
