import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Api } from "../../utils/api";
import Footer from "../home/footer";
import Comment from "./comment";
import CommentForm from "./commentForm";
import Header from "./header";

function CommentsMain() {
  const router = useRouter();
  const [submit, changeSubmit] = useState(0);
  const [comments, setComments] = useState([]);

  const setSubmit = () => {
    changeSubmit(submit + 1);
    return;
  };

  const commentDataFetcher = async () => {
    let response = await Api.get(`/feed/get-comment/${router.query.postid}`);
    setComments(response.data);
    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    commentDataFetcher();
  }, [submit, router.isReady]);

  return (
    <div className="h-screen bg-black text-white">
      <Header />
      <CommentForm postId={router.query.postid || ""} setSubmit={setSubmit} />

      <div className="py-5 flex flex-col space-y-4">
        {comments.map((comment: any, index: any) => {
          return (
            <Comment
              commentId={comment._id}
              content={comment.content}
              image={comment.userData.image}
              liked={comment.isLiked}
              likes={comment.likes}
              username={comment.userData.username}
              key={index}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default CommentsMain;
