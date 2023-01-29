import Link from "next/link";
import React from "react";

type Props = { image: string; username: string; name: string };

function Account({ image, username, name }: Props) {
  return (
    <Link href={`/${username}`}>
      <div className="flex flex-row justify-between items-center">
        <div className="wrapleft flex flex-row items-center space-x-3">
          <div className="image">
            <img src={image} alt="" className="h-12 w-12 rounded-full" />
          </div>
          <div className="userinfo">
            <div className="text-white font-semibold">{username}</div>
            <div className="text-gray-400 text-sm">{name}</div>
          </div>
        </div>
        <div className="blankSpace"></div>
      </div>
    </Link>
  );
}

export default Account;
