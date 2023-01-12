import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MainComponent from "../components/home";
import prisma from "../lib/prisma";
import { Api } from "../utils/api";

export default function Home() {
  const router = useRouter();
  const userDataChecker = async () => {
    let response = await Api.get("/user/check-onboarding");
    if (response.status == true) {
      if (response.result == false) {
        router.push("/onboarding");
      }
    }
  };

  useEffect(() => {
    userDataChecker();
  }, []);

  return (
    <>
      <MainComponent />
    </>
  );
}
