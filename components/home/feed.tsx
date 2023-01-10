import React, { useEffect, useState } from "react";
import { Api } from "../../utils/api";
import FeedSkeleton from "./feedSkeleton";
import Post from "./post";

function Feed() {
  let [pageNo, setPageNo] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postDataFetcher = async () => {
    let response = await Api.get(`/feed/get-feed?pageNo=${pageNo}`);
    console.log("response by backend is ", response);
    if (response.status == true) {
      setPosts(response.data);
      setLoading(false);
    }
    return;
  };

  useEffect(() => {
    postDataFetcher();
  }, [pageNo]);

  return (
    <div className="text-white bg-black overflow-y-scroll pb-14">
      {loading ? (
        <FeedSkeleton />
      ) : (
        posts.map((post: any) => {
          return (
            <Post
              postId={post._id}
              liked={post.isLiked}
              caption={post.caption}
              likes={post.numberOfLikes}
              username={post.createdUserData.username}
              postImages={post.imageLink}
              saved={post.isSaved}
              time={post.createdAt}
              userImage={post.createdUserData.image}
              userId={post.createdUserData._id}
              key={post._id}
            />
          );
        })
      )}
    </div>
  );
}

export default Feed;
