import Image from "next/image";
import React from "react";

export default function MobileViewMiniChat({ userSelected, list }) {
  console.log(list);
  console.log(userSelected);

  return (
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
  );
}
