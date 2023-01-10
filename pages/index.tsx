import { getSession } from "next-auth/react";
import MainComponent from "../components/home";
import prisma from "../lib/prisma";

export default function Home() {
  return (
    <>
      <MainComponent />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    let userData = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    if (userData?.isOnboardingDone == false) {
      console.log("redirecting");
      const { res } = context;

      res.writeHead(301, { Location: "/onboarding" });
      res.end();
    }
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
