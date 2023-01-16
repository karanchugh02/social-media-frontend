import React, { useEffect, useState } from "react";
import { Api } from "../../utils/api";
import FeedSkeleton from "./feedSkeleton";
import Post from "./post";
import InfiniteScroll from "react-infinite-scroll-component";

function Feed() {
  let [pageNo, setPageNo] = useState(1);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const postDataFetcher = async (hardReload: boolean) => {
    let response = await Api.get(`/feed/get-feed?pageNo=${pageNo}`);
    console.log("response by backend is ", response);
    if (response.status == true) {
      hardReload == false
        ? setPosts([...posts, ...response.data])
        : setPosts([...response.data]);
      setLoading(false);
    }
    return;
  };

  useEffect(() => {
    postDataFetcher(false);
  }, [pageNo]);

  return (
    <div className="text-white bg-black overflow-y-scroll pb-14">
      {!loading && (
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={() => {
            setPageNo(pageNo + 1);
          }}
          hasMore={posts.length < 20 ? false : true}
          loader={<FeedSkeleton />}
          endMessage={
            <p style={{ textAlign: "center" }} className="py-5">
              <b>No More Posts</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={() => {
            postDataFetcher(true);
          }}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {posts.map((post: any) => {
            return (
              <Post
                stringPostId={post.stringPostId}
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
          })}
        </InfiniteScroll>
      )}

      {loading && <FeedSkeleton />}

      {/* {loading ? (
        <FeedSkeleton />
      ) : (
        
      )} */}
    </div>
  );
}

export default Feed;
