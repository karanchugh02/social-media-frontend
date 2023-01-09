import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Api } from "../../utils/api";
import {
  createToast,
  TopBarProgress,
  updateErrorToast,
  updateSuccessToast,
} from "../../utils/notification";

function DetailComponent() {
  const session = useSession({ required: true });
  const [images, setImages] = useState<Array<string>>([]);
  const [caption, setCaption] = useState("");
  const router = useRouter();
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [imageUrl, setImageUrl] = useState(images[0]);
  const [showTopLoader, setShowTopLoader] = useState(false);

  const postShareHandler = async () => {
    setShowTopLoader(true);
    let postCreateToast = createToast("Creating New Post!!!!");
    let response = await Api.post("/feed/create-post", {
      imageLink: images,
      caption,
    });

    if (response.status == true) {
      updateSuccessToast(postCreateToast, "Post Created Successfully!!!");
      localStorage.removeItem("images");
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } else {
      updateErrorToast(postCreateToast, "Problem in Adding Post!!!!");
    }
    setShowTopLoader(false);
    return;
  };

  useEffect(() => {
    let imagesData = JSON.parse(localStorage.getItem("images") || "");
    setImages(imagesData);
  }, []);

  useEffect(() => {
    let imagesData = JSON.parse(localStorage.getItem("images") || "");
    const interval = setInterval(() => {
      let randomIndex = randomInteger(0, imagesData.length - 1);
      let imageLink = imagesData[randomIndex];
      console.log("Selecting ", imageLink, "with index ", randomIndex);
      setImageUrl(imageLink);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      <div className="header flex justify-between font-bold px-4 py-2 items-center border-b-[1px] border-gray-700">
        <div className="left text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div>New Post</div>
        <div
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            postShareHandler();
          }}
        >
          Share
        </div>
      </div>

      <div className="content flex py-2 px-2">
        <img
          src={session.data?.user?.image || ""}
          alt="image"
          className="h-12 w-12 rounded-full"
        />
        <textarea
          name=""
          className="bg-black text-sm placeholder:text-gray-700 focus:outline-none border-none mt-3"
          id=""
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          placeholder="Enter Caption Here"
          cols={30}
          rows={3}
        ></textarea>

        <div className="slider h-14 w-14 ml-2 mt-4">
          <img src={imageUrl} />
        </div>
      </div>
      {showTopLoader && <TopBarProgress />}
    </div>
  );
}

export default DetailComponent;
