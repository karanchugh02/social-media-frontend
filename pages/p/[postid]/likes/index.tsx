import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountsMain from "../../../../components/accounts";
import { Api } from "../../../../utils/api";

function LikesPage() {
  const router = useRouter();

  const [accounts, setAccounts] = useState([]);

  const likesDataFetcher = async () => {
    let response = await Api.get(`/feed/get-likes/${router.query.postid}`);
    console.log("response data is ", response);
    if (response.status == true) {
      setAccounts(response.data);
    }
    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    likesDataFetcher();
  }, [router.isReady]);

  return (
    <>
      <AccountsMain title="likes" accounts={accounts} />
    </>
  );
}

export default LikesPage;
