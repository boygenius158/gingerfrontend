import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import SearchUserModal from "../modals/SearchUserModal";

export default function MobileViewMiniChat({ userSelected, list }) {
  console.log(list);
  console.log(userSelected);
  const [isOpen, setIsOpen] = useState(false);

  function changeStatus() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }
  return (
    <>
      <SearchUserModal
        isOpen={isOpen}
        changeStatus={changeStatus}
        list={list}
        userSelected={userSelected}
      />
      <h1 className="lg:hidden p-4 text-white gap-2  text-2xl  font-extrabold  tracking-tight  flex justify-center items-center ">
        Chat
        <Plus
          onClick={() => setIsOpen(true)}
          className="h-8 w-8 text-white rounded-full bg-purple-600 hover:scale-125 transition-transform duration-300 cursor-pointer "
        />
      </h1>

      <section className="lg:hidden w-full h-20 mt-4  overflow-x-auto items-center ">
        <div className="flex gap-2 mt-2">
          {list.map((element, index) => (
            <div
              key={index}
              onClick={() => userSelected(element)}
              className="w-[60px] h-[60px] rounded-full flex-shrink-0 overflow-hidden"
            >
              <Image
                className="object-cover w-full h-full"
                src={element.profilePicture}
                width={60}
                height={60}
                alt="failed"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
