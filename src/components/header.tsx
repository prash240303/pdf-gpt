"use client";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MenuIcon, SquarePenIcon } from "lucide-react";


interface DashboardHeaderProps {
  desktopSidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setDesktopSidebarOpen: Dispatch<SetStateAction<boolean>>;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  const {
    desktopSidebarOpen,
    setDesktopSidebarOpen,
    setMobileSidebarOpen,
    mobileSidebarOpen,
  } = props;


  return (
    <header
      id="page-header"
      className={`fixed left-0 right-0 top-0 z-30 flex h-[70px] flex-none items-center bg-white shadow-sm dark:bg-gray-800 ${desktopSidebarOpen ? "lg:pl-64" : ""
        }`}
    >
      <div className="mx-auto flex w-full max-w-10xl justify-between px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-2 justify-center">
          {/* Toggle Sidebar on Desktop */}
          <div
            onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
            className="hidden cursor-pointer lg:block text-gray-600 p-2 border w-fit rounded-xl border-gray-200  bg-white hover:border-gray-600 hover:text-gray-900"             >
            <MenuIcon />
          </div>
          {/* END Toggle Sidebar on Desktop */}

          {/* Toggle Sidebar on Mobile */}
          <div
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden text-gray-600 p-2 border w-fit rounded-xl border-gray-200  bg-white hover:border-gray-600 hover:text-gray-900"             >
            <MenuIcon />
          </div>

          <Link href="/" >
            <div className=" text-gray-600 p-2 border w-fit rounded-xl border-gray-200 bg-white hover:border-gray-600 hover:text-gray-900" >
              <SquarePenIcon />
            </div>
          </Link>
          {/* END Toggle Sidebar on Mobile */}

          {/* END Search */}
        </div>
        {/* END Left Section */}

        {/* Center Section */}
        <div className="flex items-center lg:hidden">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          >
            <Image
              src="/logo.svg"
              alt="hello"
              width="64"
              height="64"
            />
          </Link>
        </div>
        {/* END Center Section */}


      </div>
    </header>
  );
}
