import Link from "next/link";
import React, { useState } from "react";
import { Api } from "../../utils/api";

type Props = {
  image: string;
  liked: boolean;
  likes: number;
  username: string;
  content: string;
  commentId: string;
};

function Comment({ image, liked, likes, username, content, commentId }: Props) {
  const [isLiked, setLiked] = useState(liked);
  const [likesCount, setLikesCount] = useState(likes);

  const commentHandler = async () => {
    if (isLiked == true) {
      let response = await Api.get(`/feed/comment-unlike/${commentId}`);
      if (response.status == true) {
        setLiked(false);
        setLikesCount(likesCount - 1);
        return;
      }
    } else {
      let response = await Api.get(`/feed/comment-like/${commentId}`);
      if (response.status == true) {
        setLiked(true);
        setLikesCount(likesCount + 1);
        return;
      }
    }
  };

  return (
    <div className="flex flex-row justify-around items-center">
      <div className="left">
        <img src={image} alt="" className="h-12 w-12 rounded-full" />
      </div>
      <div className="centre">
        <div className="para flex space-x-2">
          <div>
            <Link href={`/${username}`}>
              <span>{username}</span>
            </Link>
          </div>
          <div>
            <span>{content}</span>
          </div>
        </div>
        <div className="info text-gray-500 text-sm">
          <span>{}</span>
          <span>{likesCount} likes</span>
        </div>
      </div>
      <div className="right">
        {isLiked == false ? (
          <button onClick={commentHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        ) : (
          <button onClick={commentHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
