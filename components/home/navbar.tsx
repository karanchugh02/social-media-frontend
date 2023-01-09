import React, { useRef } from "react";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import {
  createToast,
  TopBarProgress,
  updateSuccessToast,
} from "../../utils/notification";
import { useRouter } from "next/router";

function Navbar() {
  let imageUrls: string[] = [];
  let { uploadToS3 } = useS3Upload();
  const inputRef = useRef(null);
  const [showTopLoader, setShowTopLoader] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    //@ts-ignore
    inputRef.current.click();
  };

  const handleFilesChange = async (target: any) => {
    let uploadToast = createToast("Uploading Files!!!!");
    setShowTopLoader(true);
    console.log("target is ", target);
    const files = Array.from(target.target.files);
    console.log("files are ", files);
    for (let index = 0; index < files.length; index++) {
      const file: any = files[index];
      const { url } = await uploadToS3(file);
      console.log("url from s3 is ", url);
      imageUrls.push(url);
    }
    localStorage.setItem("images", JSON.stringify(imageUrls));
    console.log("image urls are ", imageUrls);
    updateSuccessToast(uploadToast, "File Uploaded Successfully!!!");
    setShowTopLoader(false);
    router.push("/post");
    return;
  };
  return (
    <div className="bg-black flex flex-row justify-between px-4 items-center py-3 fixed top-0 w-screen">
      <div className="left">
        <span className="text-white">VrooConnect</span>
      </div>

      <div className="right flex flex-row justify-around items-center space-x-3">
        <input
          type="file"
          name="file"
          ref={inputRef}
          multiple={true}
          className="hidden"
          onChange={handleFilesChange}
        />
        <button className="text-white" onClick={handleClick}>
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button className="text-white">
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
      </div>
      {showTopLoader && <TopBarProgress />}
    </div>
  );
}

export default Navbar;
