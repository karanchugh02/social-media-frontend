import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
type Props = {};

function ImageView({}: Props) {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    let imagesData = JSON.parse(localStorage.getItem("images") || "");
    setImages(imagesData);
  }, []);
  return (
    <div className="h-screen bg-black text-white font-bold">
      <div className="header flex justify-between px-4 py-2 items-center border-b-[1px] border-gray-700">
        <div className="cross text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div>New photo post</div>
        <Link href={"/post/details"}>
          <div className="text-blue-500 cursor-pointer">Next</div>
        </Link>
      </div>

      <div className="imageSlider">
        <Carousel
          dynamicHeight={true}
          showThumbs={false}
          useKeyboardArrows={true}
        >
          {images.map((image, index) => {
            return (
              <div key={index}>
                <img src={image} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default ImageView;
