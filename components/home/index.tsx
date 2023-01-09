import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Feed from "./feed";
import Footer from "./footer";
import Navbar from "./navbar";
import Stories from "./stories";

function MainComponent() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/api/auth/signin");
    },
  });
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <Stories />
      <Feed />
      <Footer />
    </div>
  );
}

export default MainComponent;
