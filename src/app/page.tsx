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
import { HeroScrollDemo } from "@/components/heroScrollAnimation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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


  // Function to toggle modal visibility


  return (
    <div className="">

      <Dialog defaultOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2 text-primary-300">Note !! The product is currently not working</DialogTitle>
            <DialogDescription>
              Due to AWS and OpenAI API costs, the product is currently not working. If you can provide any AID it would be very helpful (contact me if you can help me out @prash2403 on twitter). We are sorry for the inconvenience.
            <Button className="block mt-4 bg-white border border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white">Help me out</Button>
            </DialogDescription>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Image src={"/bg.svg"} objectFit="cover" height={1500} width={1000} className=" absolute overflow-hidden w-screen h-screen -z-10 opacity-60 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " alt="bg" />
      <div className="bg-transparent border-transparent border-b-2 z-20  py-8 px-24  relative transition-all flex justify-between wrapper w-full">
        <div>
          <a href="/">
            <Image src="/logo.svg" width={180} height={64} alt="logo" />
          </a>
        </div>
        <ul className="p-0 m-0 space-x-5 text-lg flex items-center list-none text-black">
          <li>
            <a
              href="/"
              target="_blank"
            >
              Roadmap
            </a>
          </li>
          <li>
            <a href="/">FAQ</a>
          </li>
          <li>
            <a href="https://twitter.com/prash2403" target="_blank">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="32px" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"></path></svg>
            </a>
          </li>
          <li>
            <a href="https://github.com/prash240303" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                height="32px" width="32px"
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

          <div className="w-3/5 my-8">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="https://square-chipmunk-73.accounts.dev/sign-in">
                <Button className="bg-primary-300 mb-24 mt-6">
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
          <div className="w-full overflow-hidden ">
            <HeroScrollDemo />
          </div>
        </div>
      </div>
      <div className="w-full text-center text-gray-500 border-opacity-20 py-4 border-t border-gray-600">
        © TalkPDF 2024.
      </div>
    </div >
  );
}
