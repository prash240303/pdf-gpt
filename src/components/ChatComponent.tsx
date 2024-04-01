"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, SendHorizonalIcon } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { IconArrowElbow, IconMessage } from "./ui/icons";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });
  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="relative h-full  flex flex-col w-full justify-between " id="message-container"
    >
      {/* header */}
      <div className="sticky z-10 top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
      <div className=" grid items-start overflow-y-scroll relative h-full w-full">
      {/* <div className="sticky pt-8 bottom-0"> */}
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 px-2 pb-4 pt-2  bg-white"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full border border-gray-300"
          />
          <Button className="bg-blue-600 ml-2">
            {/* <Send className="h-4 w-4" /> */}
            <SendHorizonalIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div >
  );
};

export default ChatComponent;