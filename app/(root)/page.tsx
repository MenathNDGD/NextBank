import React from "react";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your finances with NextBank. Securely track your accounts, monitor expenses, and gain real-time insights—all in one place."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.58}
          />
        </header>

        {/* TODO: Recent Transactions */}
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[]} />
    </section>
  );
};

export default Home;
