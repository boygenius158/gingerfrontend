import Link from "next/link";
import React from "react";

export default function AdminSideBar() {
  return (
    <div className="fixed bg-blue-50 top-0 left-0 h-full w-64 border-2 text-gray-900 mt-10">
      <h1 className="text-xl font-bold p-4">Admin SideBar</h1>
      <ul>
        <Link href="/admin/manageads">
          <li className="p-4">Advertisement Management</li>
        </Link>
        <Link href="/admin/home">
          <li className="p-4">Home</li>
        </Link>
        <Link href="/admin/premiumusers">
          <li className="p-4">Premium Request</li>
        </Link>
        <Link href="/admin/manageusers">
          <li className="p-4">User Management</li>
        </Link>
        <Link href="/admin/filterpost">
          <li className="p-4">Filter Post</li>
        </Link>
        <li className="p-4">Users</li>
        <li className="p-4">Settings</li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
}
