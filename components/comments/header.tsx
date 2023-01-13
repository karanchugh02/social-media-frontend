import { useRouter } from "next/router";
import React from "react";

function Header() {
  const router = useRouter();
  return (
    <div className="header flex flex-row justify-between font-bold py-2 border-b-[1px] border-gray-700 bg-black px-4">
      <div className="back">
        <button
          onClick={() => {
            router.back();
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
        <span>Comments</span>
      </div>
      <div></div>
    </div>
  );
}

export default Header;
