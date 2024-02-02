"use client";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Slider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        console.log("====================================");
        console.log(currentIndex);
        console.log("====================================");
      } else if (currentIndex >= images.length - 1) {
        setCurrentIndex(0);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, images.length]);
  const gotoSlice = (idx) => {
    setCurrentIndex(idx);
  };
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex gap-x-3 w-[500px] h-full p-3 relative">
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} fontSize="30" />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <ChevronRight onClick={nextSlide} fontSize="30" />
      </div>
      <div className="h-[80%] flex flex-col gap-3">
        {images?.map((item, slideIndex) => (
          <>
            <div key={slideIndex} onClick={() => gotoSlice(slideIndex)}>
              <Image
                width={90}
                height={90}
                alt="image"
                src={item?.webContentLink}
                objectFit="cover"
              />
            </div>
          </>
        ))}
      </div>
      <div
        className="max-w-[400px] h-[400px] w-full relative rounded-2xl bg-center bg-cover duration-500"
        style={{
          backgroundImage: `url(${images[currentIndex]?.webContentLink})`,
        }}
      />
    </div>
  );
}

export default Slider;
