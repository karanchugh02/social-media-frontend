import React from "react";

function SkeletonLoader() {
  return (
    <div
      role="status"
      className="max-w-md flex flex-col  p-4 space-y-4 border border-gray-200 divide-y z-0 divide-gray-200  shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>{" "}
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>{" "}
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>{" "}
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>{" "}
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>{" "}
      <div className="flex pt-2 items-center justify-between">
        <div className="flex flex-row items-center space-x-4">
          <div>
            <div className="rounded-full h-12 w-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>{" "}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonLoader;
