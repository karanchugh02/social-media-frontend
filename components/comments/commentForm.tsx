import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Api } from "../../utils/api";
import {
  createToast,
  updateErrorToast,
  updateSuccessToast,
} from "../../utils/notification";

type Props = { postId: any; setSubmit: Function };

function CommentForm({ postId, setSubmit }: Props) {
  console.log("postId is ", postId);

  const session = useSession();
  const [content, setContent] = useState("");
  const createComment = async () => {
    let createCommentToast = createToast("Adding Comment!!");
    let response = await Api.post(`/feed/create-comment/${postId}`, {
      content: content,
    });

    if (response.status == true) {
      updateSuccessToast(createCommentToast, "Added Comment!!");
      setSubmit();
      setContent("");
      return;
    } else {
      updateErrorToast(createCommentToast, "Problem");
      return;
    }
  };
  return (
    <div className="bg-[#262626] border-b-[1px] border-gray-700 flex flex-row items-center py-2 px-2 justify-around">
      <div className="left flex flex-row items-center ">
        <img
          className="h-12 w-12 rounded-full"
          src={session.data?.user?.image || ""}
        ></img>
      </div>
      <div className="right w-full px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createComment();
          }}
        >
          <div className="relative w-full">
            <input
              type="text"
              id="search"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="block bg-black text-white placeholder:text-gray-300 w-full px-6 py-3  text-sm  border border-gray-800 rounded-full  focus:ring-gray-500 focus:border-gray-500 "
              placeholder="Add a comment..."
              required
            />
            <div className="text-blue-200 font-bold absolute top-2.5 right-4 bottom-2.5  text-base  ">
              Post
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
