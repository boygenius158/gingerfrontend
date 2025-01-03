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
                  <Image src={element} alt={index} height={250} width={250} 
                    onError={(e) => (e.target.src = 'https://i.pinimg.com/564x/9a/7e/1b/9a7e1b3cd70aaf7811bd5a0ce01ae305.jpg')} // Add a fallback image path here

                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          {data.imageUrl.length > 1 ? (
            <div>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-700 text-2xl" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-700 text-2xl" />
            </div>
          ) : null}
        </Carousel>
      </div>
    </div>
  );
}
