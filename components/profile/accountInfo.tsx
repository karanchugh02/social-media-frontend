import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  name: string;
  username: string;
  selfAccount: boolean;
  accountStatus: {
    currUser: { follow: boolean; followRequestSent: boolean };
    checkUser: { follow: boolean; followRequestSent: boolean };
  };
  postsCount: number;
  followers: number;
  following: number;
  followRequestHandler: Function;
  retainRequestHandler: Function;
};

function AccountInfo(props: Props) {
  console.log("account props ", props);
  return (
    <>
      <div className="info flex flex-row justify-around px-4  items-center">
        <div className="img flex flex-col justify-around items-center space-y-5">
          <div className="imgContainer">
            <img src={props.image} className="h-20 w-20 rounded-full" alt="" />
          </div>
          <div className="name font-semibold">{props.name}</div>
        </div>
        <div className="flex flex-col justify-around w-3/5  text-left space-y-5">
          <div className="username text-xl font-semibold">{props.username}</div>

          {props.selfAccount && (
            <button className="bg-white w-full  text-black font-bold text-sm px-6 py-2 rounded-md">
              Edit Profile
            </button>
          )}

          {props.selfAccount == false &&
            props.accountStatus.currUser.follow == true && (
              <button className="bg-white w-full  text-black font-bold text-sm px-6 py-2 rounded-md">
                following
              </button>
            )}

          {props.selfAccount == false &&
            props.accountStatus.currUser.followRequestSent == true && (
              <button
                onClick={() => {
                  props.retainRequestHandler();
                }}
                className="bg-white w-full  text-black font-bold text-sm px-6 py-2 rounded-md"
              >
                requested
              </button>
            )}

          {props.selfAccount == false &&
            props.accountStatus.currUser.follow == false &&
            props.accountStatus.currUser.followRequestSent == false && (
              <button
                onClick={() => {
                  props.followRequestHandler();
                }}
                className="bg-blue-500 w-full  text-black font-bold text-sm px-6 py-2 rounded-md"
              >
                Follow
              </button>
            )}
        </div>
      </div>
      {/* section for count checks */}
      <div className="counter mt-10 border-y-[1px] border-gray-700 py-4 flex flex-row justify-around text-center">
        <div>
          <span className="font-semibold">{props.postsCount}</span>
          <br></br>
          <span className="text-gray-400 text-sm">posts</span>
        </div>
        <Link href={`/${props.username}/followers`}>
          <div>
            <span className="font-semibold">{props.followers}</span>
            <br></br>
            <span className="text-gray-400 text-sm">followers</span>
          </div>
        </Link>
        <Link href={`/${props.username}/following`}>
          <div>
            <span className="font-semibold">{props.following}</span>
            <br></br>
            <span className="text-gray-400 text-sm">following</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default AccountInfo;
