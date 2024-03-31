"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, MessageCircle, SquarePenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { SubscriptionButton } from "./subscriptionButton";
// import SubscriptionButton from "./SubscriptionButton";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image";
import { checkSubscription } from "@/lib/subscription";
import DashboardHeader from "./header";
import DashboardSidebar from "./sidebar";


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

type ChatSideBarProps = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
  // children: React.ReactNode;
};

const ChatSideBar = ({ isPro, chats, chatId }: ChatSideBarProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubscription = async () => {
    try {
      setLoading(true)
      const respose = await axios.get('/api/stripe')
      window.location.href = respose.data.url
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  {/* sidebar and header */ }

  {/* layoiyut
    <sidebar
    header 
    pdfveier*/}
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  return (
    <>
      <div
        // id="page-container"
        // className={`mx-auto flex min-h-screen w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100 ${desktopSidebarOpen ? "lg:pl-64" : ""
        //   }`}
      >
        <DashboardSidebar
          chats={chats}
          chatId={chatId}
          isPro={isPro}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          desktopSidebarOpen={desktopSidebarOpen}
        />

        <DashboardHeader
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          desktopSidebarOpen={desktopSidebarOpen}
          setDesktopSidebarOpen={setDesktopSidebarOpen}
        />
      </div>

      {/* <main
        
      >
        {children}
      </main> */}

      {/* or use recoil */}
      {/* <div className="h-screen">
        <Sheet>
          <SheetTrigger className="border absolute left-6 top-1/2 -translate-y-1/2 border-gray-300 bg-white rounded-xl p-1">
            <ChevronRight />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <Link href="/" >
                <Button className="w-full flex text-black bg-white hover:text-white sticky top-0 left-0 items-center  hover:bg-primary-300 py-6 justify-between">
                  <div className="flex gap-2  place-items-center">
                    <div className="size-8 rounded-full flex justify-center items-center bg-white">
                      <MessageCircle className="size-5 text-black" />
                    </div>
                    <p>New Chat</p>
                  </div>
                  <SquarePenIcon className=" size-5" />
                </Button>
              </Link>
            </SheetHeader>

            <div className="flex w-full flex-col justify-start items-start gap-2 mt-4">
              {chats.map((chat) => (
                <Link key={chat.id} className="w-full" href={`/chat/${chat.id}`}>
                  <div
                    className={cn("rounded-lg p-3 place-items-start text-black flex ", {
                      "bg-primary-300 w-full text-white": chat.id === chatId,
                      "hover:text-black hover:bg-primary-300 hover:bg-opacity-30 w-full  text-gray-600": chat.id !== chatId,
                    })}
                  >
                    <p className="w-full overflow-hidden text-sm  truncate normal-case whitespace-nowrap text-ellipsis">
                      {chat.pdfName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className=" absolute bottom-0 mb-3 flex items-start justify-start gap-4 flex-col left-4">
              <div className="flex items-center justify-center gap-4 text-base text-semibold flex-wrap text-slate-600">
                <Link href="/">Home</Link>
                <Link href="/">Source</Link>
              </div>
               <SubscriptionButton isPro={isPro} /> 

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger ><SubscriptionButton isPro={isPro} /></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image src="/next.svg" height={40} width={50} alt="hello" className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div >
          </SheetContent >
        </Sheet >
      </div >


    */}

    </>

  )
};

export default ChatSideBar;


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"