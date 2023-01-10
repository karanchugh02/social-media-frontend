import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Api } from "../../utils/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

type props = {
  userId: string;
  username: string;
  userImage: string;
  postImages: string[];
  likes: number;
  saved: boolean;
  caption: string;
  time: string;
  liked: boolean;
  postId: string;
};

function Post(props: props) {
  const [liked, setLiked] = useState(props.liked);
  const [saved, setSaved] = useState(props.saved);
  const [likes, setLikes] = useState(props.likes);

  const likeHandler = async () => {
    if (liked == false) {
      let response = await Api.get(`/feed/like-post/${props.postId}`);
      if (response.status == true) {
        setLikes(likes + 1);
        setLiked(true);
      }
    } else {
      let response = await Api.get(`/feed/unlike-post/${props.postId}`);
      if (response.status == true) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
    return;
  };

  const saveHandler = async () => {
    if (saved == false) {
      let response = await Api.get(`/feed/save-post/${props.postId}`);
      if (response.status == true) {
        setSaved(true);
      }
    } else {
      let response = await Api.get(`/feed/unsave-post/${props.postId}`);
      if (response.status == true) {
        setSaved(false);
      }
    }
    return;
  };

  const [captionOpened, setCaptionOpened] = useState(false);
  return (
    <div className="bg-black py-2">
      <div className="upper flex justify-between items-center px-4 py-2">
        <div className="leftU flex flex-row justify-around items-center space-x-2">
          <div className="image-con">
            <img
              src={props.userImage}
              loading={"lazy"}
              className="h-12 w-12 rounded-full "
            />
          </div>
          <div>
            <span>{props.username}</span>
          </div>
        </div>
        <div className="rightU">
          <button>
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
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="image border-b-[1px] z-0 my-2 border-gray-700">
        <Carousel
          className="z-0"
          showArrows={false}
          dynamicHeight={true}
          showThumbs={false}
          useKeyboardArrows={true}
        >
          {props.postImages.map((image, index) => {
            return <img key={index} src={image} alt="" />;
          })}
        </Carousel>
      </div>
      <div className="bottom flex flex-col space-y-1">
        <div className="functions flex px-4 py-2 justify-between">
          <div className="fleft flex space-x-3">
            {liked ? (
              <button onClick={likeHandler} className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              </button>
            ) : (
              <button onClick={likeHandler} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              </button>
            )}

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="fright">
            {saved == false ? (
              <button onClick={saveHandler}>
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </button>
            ) : (
              <button onClick={saveHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="count px-4">{likes} likes</div>
        <div
          onClick={() => {
            setCaptionOpened(!captionOpened);
          }}
          className={`caption text-white px-4 ${
            captionOpened == false ? "truncate" : ""
          }`}
        >
          <b>{props.username}</b> &nbsp; {props.caption}
        </div>
        <div className="text-gray-500 text-sm px-4">{props.time}</div>
      </div>
    </div>
  );
}

export default Post;
