import { useSession } from "next-auth/react";
import React from "react";
import PostMainComponent from "../../../components/p";

function PostMain() {
  const session = useSession({ required: true });
  return (
    <>
      <PostMainComponent />
    </>
  );
}

export default PostMain;
