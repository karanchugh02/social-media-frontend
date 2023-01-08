import React from "react";
import Feed from "./feed";
import Footer from "./footer";
import Navbar from "./navbar";
import Stories from "./stories";

function MainComponent() {
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
