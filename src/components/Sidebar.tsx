import React from "react";
import Chats from "./Chats";
import Search from "./Search";

function Sidebar() {
  return (
    <div className="sidebar">
      <Search />
      <Chats />
    </div>
  );
}

export default Sidebar;
