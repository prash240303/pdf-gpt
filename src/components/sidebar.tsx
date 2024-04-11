"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  Home,
  LogOut,
  UserCog,
  X,
  MessageSquarePlusIcon,
  MailPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";



import { DrizzleChat } from "@/lib/db/schema";
import { Button } from "./ui/button";
import { ChevronRight, MessageCircle, SquarePenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { SubscriptionButton } from "./subscriptionButton";

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


interface DashboardSidebarProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
  desktopSidebarOpen: boolean;
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
}
export default function DashboardSidebar(props: DashboardSidebarProps) {
  const { mobileSidebarOpen, setMobileSidebarOpen, desktopSidebarOpen, chats, isPro, chatId } = props;


  return (
    <nav
      id="page-sidebar"
      aria-label="Main Sidebar Navigation"
      className={`fixed bottom-0 left-0 top-0 z-50 flex h-full w-full flex-col border-r border-gray-200 bg-white transition-transform duration-500 ease-out lg:w-64 ${desktopSidebarOpen ? "lg:translate-x-0" : "lg:-translate-x-full"
        } ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex h-fit w-full flex-none items-center justify-between px-4  lg:justify-center">
        <Link
          href="/"
          className="flex justify-start  space-x-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600"
        >
          <Image
            src="/logo.svg"
            className="py-2 w-36 h-20 text-white my-1"
            alt="hello"
            width={500}
            height={500}
          />
        </Link>

        <div className="lg:hidden">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none "
          >
            <X className="hi-mini hi-x-mark -mx-0.5 inline-block h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-start items-start gap-2 mt-4 p-2">
        {chats.map((chat) => (
          <Link key={chat.id} className="w-full" href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 place-items-start text-black flex ", {
                "bg-primary-300 w-full text-white": chat.id === chatId,
                "hover:text-black hover:bg-primary-300 hover:bg-opacity-30 w-full  text-gray-600": chat.id !== chatId,
              })}
            >
              {/* <MessageCircle className="mr-2" /> */}
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
        {/* <SubscriptionButton isPro={isPro} /> */}

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
      </div>
    </nav>
  );
}

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