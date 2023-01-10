import { useRouter } from "next/router";
import React from "react";

type Props = { image: string; username: string; name: string };

function SearchItem({ image, username, name }: Props) {
  const router = useRouter();
  return (
    <div className="text-white flex flex-row justify-between items-center">
      <div
        onClick={() => {
          console.log("running");
          router.push(`/${username}`);
        }}
        className="left flex flex-row space-x-2 justify-around items-center"
      >
        <div>
          <img src={image} className="h-12 w-12 rounded-full" />
        </div>
        <div className="text-sm">
          <p className="font-bold">{username}</p>
          <p className="text-gray-400">{name}</p>
        </div>
      </div>
      <div className="name"></div>
    </div>
  );
}

export default SearchItem;
