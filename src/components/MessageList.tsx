import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, MessageCircleIcon } from "lucide-react";
import React from "react";
import { IconOpenAI, IconUser } from "./ui/icons";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col my-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              
            })}
          >
            <div
              className={cn(
                " px-3 text-sm w-full h-full py-3 flex gap-2 items-center justify-start",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
            >
              {message.role === "user" ? (<IconOpenAI className="w-6 h-6" />) : <IconUser/>}
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>

  );
};

export default MessageList;