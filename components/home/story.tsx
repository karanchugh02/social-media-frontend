import React from "react";

type Props = { name: string; imageLink: string };

function Story({ imageLink, name }: Props) {
  return (
    <div className="w-fit">
      <div className="cont flex flex-col items-center">
        <div className="rounded-full border-2 border-white p-1 hover:animate-pulse">
          <img src={imageLink} className="rounded-full h-12 w-12" />
        </div>
        <div>
          <span className="text-sm">{name}</span>
        </div>
      </div>
    </div>
  );
}

export default Story;
