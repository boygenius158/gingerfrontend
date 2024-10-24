"use client";
import React, { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconChartBar,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import DashboardGUI from "@/components/admin/DashboardGUI";
import { useSession } from "next-auth/react";
import FilterGUI from "@/components/admin/FilterGUI";
import PostGUI from "@/components/admin/PostGUI";
import GraphAdmin from "../GraphAdmin";
import { useRouter } from "next/navigation";

// Links for the sidebar
const links = [
  {
    label: "Dashboard",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "User Management",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Posts Management",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Graph",
    icon: (
      <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState("User Management");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/admin/login");
    } else if (session.role !== "admin") {
      router.push("/");
    }
  }, [session, router]);

  const handleTabChange = (label) => {
    setTab(label);
  };

  const renderTabContent = () => {
    switch (tab) {
      case "Dashboard":
        return <DashboardGUI />;
      case "User Management":
        return <FilterGUI />;
      case "Posts Management":
        return <PostGUI />;
      case "Graph":
        return <GraphAdmin />;
      default:
        return <DashboardGUI />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[80vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink
                  key={link.label}
                  link={{ ...link, href: "#" }} // Ensure the link object has href
                  onClick={() => handleTabChange(link.label)}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                href: "#",
                icon: (
                  <Image
                    src={session?.profilePicture}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {renderTabContent()}
    </div>
  );
}

export const Logo = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Ginger Admin
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link
    href="#"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </Link>
);
