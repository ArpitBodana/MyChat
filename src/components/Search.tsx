import React, { useEffect, useState } from "react";
import { SearchContainer } from "../styled/HomePage";
import Avatar from "../assets/avatar.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { debounce } from "lodash";
import { UserInfoType } from "../redux/user/types";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getCurrentConversation } from "../redux/conversation/conversationSlice";
import { axiosFetch } from "../utils/axios-utils";
function Search() {
  const { friends } = useAppSelector((state) => state.allChat);
  const [searchData, setSearchData] = useState<UserInfoType | null>(null);
  const SOCKET_KEY = import.meta.env.VITE_SOCKET_KEY;
  var SocketRef: any;
  const [inWidth, setInWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearch = debounce((key: string) => {
    let data = friends.find((item) => item.name === key);
    if (data) {
      setSearchData(data);
    } else {
      setSearchData(null);
    }
  }, 1000);

  const currentChatHandler = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/conversation/${searchData?._id}`,
        method: "get",
      });
      SocketRef = io(SOCKET_KEY);
      dispatch(getCurrentConversation(data));
      SocketRef?.emit("joinChat", data._id);
      localStorage.setItem("currentChatId", data._id);
      if (inWidth < 550) {
        navigate("/messaging");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    function handleResize() {
      setInWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <SearchContainer>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search Chat.."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="userChat" onClick={currentChatHandler}>
        <div className="userChatInfo">
          {searchData === null ? (
            " "
          ) : (
            <>
              <img
                src={
                  searchData.profileImageUrl
                    ? searchData.profileImageUrl
                    : Avatar
                }
                alt=""
              />
              <span>{searchData.name}</span>
            </>
          )}
        </div>
      </div>
    </SearchContainer>
  );
}

export default Search;
