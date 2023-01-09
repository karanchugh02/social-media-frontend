import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Api } from "../../utils/api";
import {
  createToast,
  TopBarProgress,
  updateErrorToast,
  updateSuccessToast,
} from "../../utils/notification";

function OnboardingComponent() {
  const session = useSession({ required: true });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    gender: "male",
  });
  const [validUsername, setValidUsername] = useState(true);
  const [showTopLoader, setShowTopLoader] = useState(false);
  const router = useRouter();

  const usernameValidator = async (username: string) => {
    if (username.length > 0) {
      let response = await Api.get(`/user/check-username/${username}`);
      if (response.status == true) {
        let result = response.result;
        if (result == true) {
          setValidUsername(false);
          return;
        } else {
          setValidUsername(true);
          return;
        }
      }
      return;
    }
  };

  const formSubmitHandler = async () => {
    setShowTopLoader(true);
    let userToast = createToast("Onboarding in process!!!");
    if (!validUsername) {
      updateErrorToast(userToast, "Please Choose Unique UserName!!!");
      setShowTopLoader(false);
      return;
    }
    let response = await Api.post("/user/onboarding", { ...formData });
    if (response.status == true) {
      updateSuccessToast(userToast, "Successfull!!");
      router.replace("/");
    } else {
      updateErrorToast(userToast, "Error in Onboarding!!!");
    }
    setShowTopLoader(false);
    return;
  };

  return (
    <div className="bg-black h-screen flex flex-col justify-evenly">
      <div className="header text-white flex flex-col text-center text-3xl pt-4 space-y-2">
        <div>Welcome</div>
        <div>to</div>
        <div>VrooConnect</div>
      </div>

      <div className="details text-white text-center">
        <span className="text-2xl">Details</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formSubmitHandler();
          }}
          className="flex flex-col justify-around space-y-6 py-4 items-center"
        >
          <div className="w-3/5">
            <div className="relative z-0 text-left w-full">
              <input
                type="text"
                id="floating_standard"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  usernameValidator(e.target.value);
                }}
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>

            {!validUsername && (
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium">Areey Vroo!</span> Ye username to
                taken hai! Koi aur choose karlijiye!!
              </p>
            )}
          </div>
          <div className="relative z-0 text-left w-3/5">
            <input
              type="text"
              id="floating_standard"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-white focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
            <label
              htmlFor="floating_standard"
              className="absolute  text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>

          <div className="text-left w-3/5 pt-1">Gender :</div>
          <div className="w-3/5 flex flex-row items-center space-x-2">
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                checked={formData.gender == "MALE" ? true : false}
                onChange={(e) => {
                  setFormData({ ...formData, gender: "MALE" });
                }}
                value="MALE"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                checked={formData.gender == "FEMALE" ? true : false}
                onChange={(e) => {
                  setFormData({ ...formData, gender: "FEMALE" });
                }}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Female
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={formData.gender == "TRANSGENDER" ? true : false}
                onChange={(e) => {
                  setFormData({ ...formData, gender: "TRANSGENDER" });
                }}
                id="default-radio-3"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-white bg-gray-100 border-gray-300 focus:ring-white dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-3"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Other
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Submit
            </button>
          </div>
        </form>
      </div>
      {showTopLoader && <TopBarProgress />}
    </div>
  );
}

export default OnboardingComponent;
