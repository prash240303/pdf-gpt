import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
// import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Link, SquarePenIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription()


  return (
    <div className="flex h-screen  ">
      {/* chat sidebar */}
      <div className="">
        <ChatSideBar isPro={isPro} chats={_chats} chatId={parseInt(chatId)} />
      </div>
      {/* pdf viewer */}
      <div className=" px-4 flex-[5]">
        <div className="flex gap-4 my-2">
          <a href="/" >
            <div className=" text-gray-600 p-2 border w-fit rounded-xl border-gray-200 mx-2 my-2 bg-white hover:border-gray-600 hover:text-gray-900" >
              <SquarePenIcon />
            </div>
          </a>
          {/* <Image width={500} height={500} src="/logo.svg" alt="logo" className="h-16 ml-4 w-24" /> */}
        </div>
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
      </div>
      {/* chat component */}
      <div className="flex-[3] border-l-4 py-4 border-l-slate-200">
        <ChatComponent chatId={parseInt(chatId)} />
      </div>
    </div>
  );
};

export default ChatPage;