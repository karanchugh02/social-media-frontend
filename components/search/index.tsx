import React, { useEffect, useState } from "react";
import { Api } from "../../utils/api";
import Footer from "../home/footer";
import Results from "./results";
import SearchMenu from "./searchMenu";
import SkeletonLoader from "./skeletonLoader";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const searchDataFetcher = async () => {
    setLoading(true);
    let response = await Api.get(`/user/search?username=${searchTerm}`);
    if (response.status == true) {
      setResults(response.data);
      setLoading(false);
    }
    return;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      // Send Axios request here
      if (searchTerm.length == 0) {
        setResults([]);
      }
      if (searchTerm.length > 0) {
        searchDataFetcher();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <div className="bg-black h-screen">
      <div className="search fixed top-0 w-screen z-10">
        <SearchMenu searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="mt-12">
        {loading ? <SkeletonLoader /> : <Results results={results} />}
      </div>

      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default SearchPage;
