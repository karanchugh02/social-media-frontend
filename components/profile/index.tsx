import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { Api } from "../../utils/api";
import Footer from "../home/footer";
import Posts from "./posts";

function ProfileMain() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("self");
  const [imagesLoading, setImagesLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [accountLoading, setAccountLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("posts");
  const [savedPostsLoading, setSavedPostsLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]);

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    image: "",
    postsCount: 0,
    followers: 0,
    userId: "",
    following: 0,
  });

  const savedPostsFetcher = async () => {
    setSavedPostsLoading(true);
    let response = await Api.get("/user/saved-posts");
    if (response.status == true) {
      setSavedPosts(response.data);
      setSavedPostsLoading(false);
    }
    return;
  };

  const profileDataFetcher = async () => {
    console.log("router details are ", router.query);
    setAccountLoading(true);
    setImagesLoading(true);
    let response = await Api.get(`/user/get-details/${router.query.username}`);

    if (response.status == true) {
      setAccountType(response.userType);
      setProfileData({
        name: response.user.name,
        followers: response.user.followers,
        following: response.user.following,
        image: response.user.image,
        postsCount: response.user.postsCount,
        userId: response.user.userId,
        username: response.user.username,
      });
      setAccountLoading(false);

      if (response.userType != "notadded") {
        setImagesLoading(false);
        setImages(response.postsData);
      }
    }

    return;
  };
  // useEffect(() =>{

  // }, [])
  useEffect(() => {
    if (!router.isReady) return;
    console.log("rerendering");
    profileDataFetcher();
    savedPostsFetcher();
  }, [router.isReady, router.query.username]);

  return (
    <div className="text-white bg-black h-screen">
      <div className="header flex flex-row justify-between font-bold py-2 border-b-[1px] border-gray-700 bg-black px-4">
        <div className="back">
          <button
            onClick={() => {
              router.replace("/");
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
          <span>{router.query.username}</span>
        </div>
        <div></div>
      </div>

      {accountLoading == true && (
        <div className="flex items-center mt-4 space-x-3 px-4 animate-pulse">
          <svg
            className="text-gray-200 w-14 h-14 dark:text-gray-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      )}

      {!accountLoading && (
        <div className="info flex flex-row justify-around px-4  items-center">
          <div className="img flex flex-col justify-around items-center space-y-5">
            <div className="imgContainer">
              <img
                src={profileData.image}
                className="h-20 w-20 rounded-full"
                alt=""
              />
            </div>
            <div className="name font-semibold">{profileData.name}</div>
          </div>
          <div className="flex flex-col justify-around w-3/5  text-left space-y-5">
            <div className="username text-xl font-semibold">
              {profileData.username}
            </div>

            {accountType == "self" && (
              <button className="bg-white w-full  text-black font-bold text-sm px-6 py-2 rounded-md">
                Edit Profile
              </button>
            )}

            {accountType == "added" && (
              <button className="bg-white text-black font-bold text-sm px-6 py-2 rounded-md">
                Unfollow
              </button>
            )}

            {accountType == "notadded" && (
              <button className="bg-blue-800 text-white font-bold text-sm px-6 py-2 rounded-md">
                follow
              </button>
            )}
          </div>
        </div>
      )}

      <div className="counter mt-10 border-y-[1px] border-gray-700 py-4 flex flex-row justify-around text-center">
        <div>
          <span className="font-semibold">{profileData.postsCount}</span>
          <br></br>
          <span className="text-gray-400 text-sm">posts</span>
        </div>
        <div>
          <span className="font-semibold">{profileData.followers}</span>
          <br></br>
          <span className="text-gray-400 text-sm">followers</span>
        </div>
        <div>
          <span className="font-semibold">{profileData.following}</span>
          <br></br>
          <span className="text-gray-400 text-sm">following</span>
        </div>
      </div>

      {accountType == "self" && (
        <div className="sections border-b-[1px] border-gray-700 py-2 flex flex-row justify-around text-center">
          {selectedOption == "posts" ? (
            <button
              onClick={() => {
                setSelectedOption("posts");
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
                  d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedOption("posts");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>
          )}

          {selectedOption == "savedposts" ? (
            <button
              onClick={() => {
                setSelectedOption("savedposts");
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
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedOption("savedposts");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {accountType == "added" && (
        <Posts posts={images} loading={imagesLoading} />
      )}

      {accountType == "self" && selectedOption == "posts" && (
        <Posts posts={images} loading={imagesLoading} />
      )}

      {accountType == "self" && selectedOption == "savedposts" && (
        <Posts posts={savedPosts} loading={savedPostsLoading} />
      )}

      {accountType == "notadded" && <div>Protected</div>}

      <div className="pt-20 bg-black z-10">
        <Footer />
      </div>
    </div>
  );
}

export default ProfileMain;
