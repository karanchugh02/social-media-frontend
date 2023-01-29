import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountsMain from "../../components/accounts";
import { Api } from "../../utils/api";

function Followers() {
  const [accounts, setAccounts] = useState([]);

  const router = useRouter();

  const followersDataFetcher = async () => {
    let response = await Api.get(
      `/user/get-followers/${router.query.username}`
    );

    setAccounts(response.data || []);

    console.log("response is ", response);
    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    followersDataFetcher();
  }, [router.isReady]);

  return (
    <>
      <AccountsMain accounts={accounts} title={"followers"} />
    </>
  );
}

export default Followers;
