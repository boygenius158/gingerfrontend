import Image from "next/image";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageSection({ data }) {
  console.log(data);
  
  return (
    <div>
      <div>
        <Carousel className="relative w-full h-full">
          <CarouselContent className="flex w-full h-full items-center  ">
            {data.imageUrl.length > 0 &&
              data.imageUrl.map((element, index) => (
                <CarouselItem
                  key={index}
                  className="shrink-0 w-full h-full flex items-center justify-center"
                >
                  <Image src={element} alt={index} height={250} width={250} />
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}
