"use client"

// import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import AdminSideBar from "@/components/AdminSideBar";
import AdminSessionHandler from "@/components/AdminSessionHandler";
import AdminHeader from "@/components/AdminHeader";

const Page = ({ children }) => {


  return (
    <>
      <AdminSessionHandler>
        {/* <AdminHeader/> */}
        {/* <div className="flex"> */}
          {/* <AdminSideBar /> */}
          <main className="">{children}</main>
        {/* </div> */}
      </AdminSessionHandler>
    </>
  );
};

export default Page;
