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

  NavigationMenuLink,

} from "@/components/ui/navigation-menu"
import DashboardHeader from "./header";
import DashboardSidebar from "./sidebar";



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
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
  return (
    <>
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