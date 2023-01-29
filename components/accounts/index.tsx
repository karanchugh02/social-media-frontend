import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../home/footer";
import Account from "./account";
import Header from "./header";

function AccountsMain({
  title,
  accounts,
}: {
  title: string;
  accounts: Array<{ name: string; image: string; username: string }>;
}) {
  const router = useRouter();

  return (
    <div className="h-screen bg-black text-white">
      <Header title={title} />

      <div className="list px-4 py-4 flex-col flex space-y-3">
        {accounts.map((account) => {
          return (
            <Account
              image={account.image}
              name={account.name}
              username={account.username}
              key={account.image}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default AccountsMain;
