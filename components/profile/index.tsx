import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { Api } from "../../utils/api";
import Footer from "../home/footer";
import AccountInfo from "./accountInfo";
import AccountLoader from "./accountLoader";
import Approve from "./approve";
import ProfileHeader from "./header";
import Posts from "./posts";

function ProfileMain() {
  const router = useRouter();

  const [selfAccount, setSelfAccount] = useState(true);
  const [accountStatus, setAccountStatus] = useState({
    currUser: { follow: false, followRequestSent: false },
    checkUser: { follow: false, followRequestSent: false },
  });
  const [imagesLoading, setImagesLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [accountLoading, setAccountLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("posts");
  const [savedPostsLoading, setSavedPostsLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]);
  const [approveModal, setApproveModal] = useState(false);

  const [accountPrivate, setAccountPrivate] = useState(true);

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    image: "",
    postsCount: 0,
    followers: 0,
    userId: "",
    following: 0,
  });

  const followRequestHandler = async () => {
    let response = await Api.get(
      `/user/send-follow-request/${profileData.userId}`
    );

    if (response.status == true) {
      setAccountStatus({
        ...accountStatus,
        currUser: { followRequestSent: true, follow: false },
      });
    }

    return;
  };

  const retainRequestHandler = async () => {
    let response = await Api.get(
      `/user/unsend-follow-request/${profileData.userId}`
    );

    if (response.status == true) {
      setAccountStatus({
        ...accountStatus,
        currUser: { followRequestSent: false, follow: false },
      });
    }

    return;
  };

  const approveRequestHandler = async () => {
    let response = await Api.get(
      `/user/approve-follow-request/${profileData.userId}`
    );

    if (response.status == true) {
      setAccountStatus({
        ...accountStatus,
        checkUser: { follow: true, followRequestSent: false },
      });
      setProfileData({ ...profileData, following: profileData.following + 1 });
      setApproveModal(false);
    }
    return;
  };

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
      setSelfAccount(response.userType == "self" ? true : false);
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

      if (response.userType != "self") {
        setSelfAccount(false);
        setAccountStatus(response.accountDetails);
        setImagesLoading(false);
        if (response.accountDetails.currUser.follow == true) {
          setImages(response.postsData);
          setAccountPrivate(false);
        }
        if (response.accountDetails.checkUser.followRequestSent == true) {
          setApproveModal(true);
          console.log("set approve modal ", approveModal);
        }
      }

      if (response.userType == "self") {
        setImages(response.postsData);
        setImagesLoading(false);
        setAccountPrivate(false);
      }
    }

    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    console.log("rerendering");
    profileDataFetcher();
    savedPostsFetcher();
  }, [router.isReady, router.query.username]);

  return (
    <>
      <div
        className={`text-white z-0 bg-black h-screen ${
          approveModal && "opacity-40"
        }`}
      >
        <ProfileHeader />

        {accountLoading == true && <AccountLoader />}

        {!accountLoading && (
          <AccountInfo
            key={"account"}
            name={profileData.name}
            accountStatus={accountStatus}
            image={profileData.image}
            username={profileData.username}
            selfAccount={selfAccount}
            followers={profileData.followers}
            following={profileData.following}
            postsCount={profileData.postsCount}
            followRequestHandler={followRequestHandler}
            retainRequestHandler={retainRequestHandler}
          />
        )}

        {selfAccount && (
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

        {accountStatus.currUser.follow == true && (
          <Posts posts={images} loading={imagesLoading} />
        )}

        {selfAccount && selectedOption == "posts" && (
          <Posts posts={images} loading={imagesLoading} />
        )}

        {selfAccount && selectedOption == "savedposts" && (
          <Posts posts={savedPosts} loading={savedPostsLoading} />
        )}

        {accountPrivate == true && !imagesLoading && <div>Private</div>}

        <div className="pt-20 bg-black z-10">
          <Footer />
        </div>
      </div>
      {approveModal && (
        <Approve
          username={profileData.username}
          closeModal={() => {
            setApproveModal(false);
          }}
          approveHandler={approveRequestHandler}
        />
      )}
    </>
  );
}

export default ProfileMain;
