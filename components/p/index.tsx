import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Api } from "../../utils/api";
import Footer from "../home/footer";
import Post from "../home/post";

function PostMainComponent() {
  const router = useRouter();

  const [postData, setPostData] = useState({
    caption: "",
    liked: false,
    likes: 0,
    postId: "",
    postImage: [],
    saved: false,
    time: "",
    userId: "",
    username: "",
    userImage: "",
    stringPostId: "",
  });

  const [postDataReady, setPostDataReady] = useState(false);

  const postDataFetcher = async () => {
    setPostDataReady(false);
    let response = await Api.get(`/feed/get-post/${router.query.postid}`);

    if (response.status == true) {
      setPostData({
        caption: response.data.caption,
        liked: response.data.isLiked,
        saved: response.data.isSaved,
        likes: response.data.numberOfLikes,
        postId: response.data._id,
        postImage: response.data.imageLink,
        time: response.data.createdAt,
        userId: response.data.createdUserData._id,
        userImage: response.data.createdUserData.image,
        username: response.data.createdUserData.username,
        stringPostId: response.data.stringPostId,
      });
      setPostDataReady(true);
    }

    console.log("post data is ", response);
    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    postDataFetcher();
  }, [router.isReady]);

  return (
    <div className="h-screen bg-black text-white">
      <div className="header flex flex-row justify-between font-bold py-2 border-b-[1px] border-gray-700 bg-black px-4">
        <div className="back">
          <button
            onClick={() => {
              router.back();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div>
          <span>photo</span>
        </div>
        <div></div>
      </div>

      {postDataReady && (
        <div className="pb-14 bg-black">
          <Post
            key={"post"}
            stringPostId={postData.stringPostId}
            caption={postData.caption}
            liked={postData.liked}
            likes={postData.likes}
            postId={postData.postId}
            postImages={postData.postImage}
            saved={postData.saved}
            time={postData.time}
            userId={postData.userId}
            userImage={postData.userImage}
            username={postData.username}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PostMainComponent;
