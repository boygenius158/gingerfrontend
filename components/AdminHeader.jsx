import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { CircleUser, Search, Package2, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Link from "next/link";

export default function AdminHeader() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isSheetOpen, setSheetOpen] = useState(false);

 

  function handleLinkClick(tabName) {
    setSelectedTab(tabName);
    setSheetOpen(false);
  }

  return (
    <div>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className={`${
              selectedTab === "dashboard"
                ? "text-foreground font-bold"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
            onClick={() => setSelectedTab("dashboard")}
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <div>Dashboard</div>
            </div>
          </Link>
          <Link
            href="/admin/filterposts"
            className={`${
              selectedTab === "filterpost"
                ? "text-foreground font-bold"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
            onClick={() => setSelectedTab("filterpost")}
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>

              <div>Filter Post</div>
            </div>
          </Link>
          <Link
            href="/admin/manageusers"
            className={`${
              selectedTab === "manageusers"
                ? "text-foreground font-bold"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
            onClick={() => setSelectedTab("manageusers")}
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>

              <div>User Management</div>
            </div>
          </Link>
          {/* <Link
            href="/admin/premium"
            className={`${
              selectedTab === "premium" ? "text-foreground font-bold" : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
            onClick={() => setSelectedTab("premium")}
          >
            Premium Request
          </Link> */}
          <Link
            href="/dashboard"
            className={`${
              selectedTab === "logout"
                ? "text-foreground font-bold"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
            onClick={() => setSelectedTab("logout")}
          >
            <div 
            className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              <div>Switch to User Side</div>
            </div>
          </Link>
        </nav>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => handleLinkClick("acmeinc")}
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="/admin/dashboard"
                className={`${
                  selectedTab === "dashboard"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => handleLinkClick("dashboard")}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/filterposts"
                className={`${
                  selectedTab === "filterpost"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => handleLinkClick("filterpost")}
              >
                Filter Post
              </Link>
              <Link
                href="/admin/manageusers"
                className={`${
                  selectedTab === "manageusers"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => handleLinkClick("manageusers")}
              >
                User Management
              </Link>
              <Link
                href="/admin/premium"
                className={`${
                  selectedTab === "premium"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => handleLinkClick("premium")}
              >
                Premium Request
              </Link>
              <Link
                href="#"
                className={`${
                  selectedTab === "logout"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                } hover:text-foreground`}
                onClick={() => handleLinkClick("logout")}
              >
                Log out
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
