import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { ClipboardIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { IconOpenAI, IconUser } from "./ui/icons";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);

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
                "px-3 text-sm w-full h-full py-3 flex flex-col gap-2 items-start justify-center",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
              onMouseEnter={() => setHoveredMessage(message.id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              <div className="w-fit flex justify-center items-center gap-2 h-6">
                {message.role === "user" ? (< IconUser className="w-6 h-6" />) : <IconOpenAI className="w-6 h-6" />}
                {message.role === "user" ? <p className="font-semibold">User</p> : <p className="font-semibold">AI</p>}
              </div>
              <p className="pl-8">{message.content}</p>
              {/* Show clipboard icon only on hover */}
              {(message.role === "system" && hoveredMessage === message.id) ? (
                <div className="pl-8">
                  <ClipboardIcon className="w-4 h-4 cursor-pointer text-slate-400" />
                </div>
              ):<div className="h-4"></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
