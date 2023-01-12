import { useRouter } from "next/router";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Posts(props: { posts: any; loading: boolean }) {
  console.log("props are ", props);
  const router = useRouter();
  return (
    <>
      {props.loading ? (
        <div className="grid-cols-3 grid">
          <div
            role="status"
            className="space-y-6 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex items-center justify-center  h-32 bg-gray-300 sm:w-96 dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>

          <div
            role="status"
            className="space-y-6 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex items-center justify-center  h-32 bg-gray-300  sm:w-96 dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>

          <div
            role="status"
            className="space-y-6 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex items-center justify-center  h-32 bg-gray-300  sm:w-96 dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 bg-black z-0">
          {props.posts.map((post: any) => {
            return (
              <Carousel
                onClickItem={() => {
                  router.push(`/p/${post.postId}`);
                }}
                key={post._id}
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
              >
                {post.imageLink.map((link: string, index: number) => {
                  return (
                    <div key={index}>
                      <img src={link} />
                    </div>
                  );
                })}
              </Carousel>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Posts;
