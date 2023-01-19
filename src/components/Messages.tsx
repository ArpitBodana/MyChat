import React, { useEffect, useRef } from "react";
import Lottie2 from "react-lottie";
import { MessageData } from "../redux/conversation/types";
import { MessagesContainer } from "../styled/HomePage";
import Message from "./Message";
import animationData from "../animations/typing2.json";

function Messages({ data, typing }: MessageData) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  });

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <MessagesContainer>
      {data.map((msg, index) => (
        <div ref={scrollRef} key={index}>
          <Message data={msg} />
        </div>
      ))}

      {typing && (
        <span ref={scrollRef}>
          <Lottie2
            options={lottieOptions}
            width={100}
            height={40}
            style={{ marginTop: 2, marginBottom: 10, marginLeft: 0 }}
          />
        </span>
      )}
    </MessagesContainer>
  );
}

export default Messages;
