import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <Image src={"/bg.svg"} objectFit="cover" height={1500} width={1000} className=" absolute overflow-hidden w-screen h-screen -z-10 opacity-60 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " alt="bg" />
      {/* <div className="w-screen min-h-screen bg-gradient-radial bg-center from-[#B5DBFF] via-[#E0EDFF] to-white"> */}
      <div className="bg-transparent border-transparent border-b-2 z-20  py-8 px-24  relative transition-all flex justify-between wrapper w-full">
        <div>
          <a href="/">
            <Image src="/logo.svg" width={100} height={40} alt="logo" />
          </a>
        </div>
        <ul className="p-0 m-0 space-x-5 text-lg flex items-center list-none text-black">
          <li>
            <a
              href="https://capso.notion.site/7aac740edeee49b5a23be901a7cb734e?v=7c1f56484be4497aae03e1aa5fba0f34"
              target="_blank"
            >
              Roadmap
            </a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li>
            <a href="https://discord.gg/y8gdQ3WRN3" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6 md:w-7"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://github.com/CapSoftware/cap" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
            </a>
          </li>
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>
      </div>
      <div className="w-3/5 flex flex-col gap-6 justify-center items-center mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-6xl leading-tight tracking-tight font-bold">Your Brilliant AI-Powered Research Companion</h1>
          </div>

          <div className="flex my-6">
            {isAuth && firstChat && (
              <div className="flex gap-4">
                <Link href={`/chat/${firstChat.id}`}>
                  <Button className="bg-primary-200 font-semibold hover:bg-primary-300">
                    Go to Chats <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </div>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-900">
            Unlock the Power of AI: Seamlessly Interact with PDFs to Gain Instant Understanding and Answers
          </p>

          <div className="w-3/5 mt-6">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="https://square-chipmunk-73.accounts.dev/sign-in">
                <Button className="bg-primary-300 ">
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
