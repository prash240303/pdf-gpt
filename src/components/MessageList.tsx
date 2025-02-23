import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { ClipboardIcon, Loader2, Volume2Icon, ThumbsDown } from "lucide-react";
import React, { useState } from "react";
import { IconOpenAI, IconUser } from "./ui/icons";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [ThumbsDownFlag, setThumbsDownFlag] = useState<boolean>(false);
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        console.log("Copied to clipboard successfully!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };


  const readAloud = (content: string) => {
    const utterance = new SpeechSynthesisUtterance(content);
    speechSynthesis.speak(utterance);
  };

  const handleThumbsDown = () => {
    if (ThumbsDownFlag) {
      setThumbsDownFlag(false);
      return;
    }
    setThumbsDownFlag(true);

  }


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
            className={cn("flex", {})}
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
                {message.role === "user" ? (<IconUser className="w-6 h-6" />) : <IconOpenAI className="w-6 h-6" />}
                {message.role === "user" ? <p className="font-semibold">User</p> : <p className="font-semibold">AI</p>}
              </div>
              <p className="pl-8">{message.content}</p>
              {/* Show clipboard icon only on hover */}
              {hoveredMessage === message.id && (
                <div className="pl-8 flex gap-3">
                  <ClipboardIcon
                    className={`w-4 ${message.role === "user" ? "stroke-white" : "stroke-slate-500"} h-4 cursor-pointer`}
                    onClick={() => copyToClipboard(message.content)}
                  />
                  <Volume2Icon
                    className={`w-4 ${message.role === "user" ? "stroke-white" : "stroke-slate-500"} h-4 cursor-pointer`}
                    onClick={() => readAloud(message.content)}
                  />
                  <ThumbsDown
                    onClick={handleThumbsDown}
                    className={`w-4 ${message.role === "user" ? "stroke-white hidden" : " visible stroke-slate-500"} ${ThumbsDownFlag ? "fill-slate-700" : "fill-none"} h-4 cursor-pointer`}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
