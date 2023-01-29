import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountsMain from "../../components/accounts";
import { Api } from "../../utils/api";

function Following() {
  const [accounts, setAccounts] = useState([]);

  const router = useRouter();

  const followingDataFetcher = async () => {
    let response = await Api.get(
      `/user/get-following/${router.query.username}`
    );

    setAccounts(response.data || []);

    console.log("response is ", response);
    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    followingDataFetcher();
  }, [router.isReady]);

  return (
    <>
      <AccountsMain accounts={accounts} title={"following"} />
    </>
  );
}

export default Following;
