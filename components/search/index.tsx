import React from "react";
import Footer from "../home/footer";
import SearchMenu from "./searchMenu";
import SkeletonLoader from "./skeletonLoader";

function SearchPage() {
  return (
    <div className="bg-black h-screen">
      <div className="search fixed top-0 w-screen z-10">
        <SearchMenu />
      </div>

      <div className="mt-12">
        <SkeletonLoader />
      </div>

      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default SearchPage;
