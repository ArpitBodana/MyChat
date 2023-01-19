import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import { HomeContainer } from "../styled/HomePage";

import Chat from "../components/Chat";


function Messaging() {
  const [inWidth, setInWidth] = useState(window.innerWidth);
  const navigate = useNavigate();


  useEffect(() => {
    function handleResize() {
      setInWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    if (inWidth > 550) {
      navigate("/");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <AppBar />
      <HomeContainer>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="home-container">
          <Chat />
        </div>
      </HomeContainer>
    </>
  );
}

export default Messaging;
