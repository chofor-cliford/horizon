import HeaderBox from "@/components/shared/HeaderBox";
import RightSidebar from "@/components/shared/RightSidebar";
import TotalBalanceBox from "@/components/shared/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Axel", lastName: "Foley"};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions with ease."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={10}
            totalCurrentBalance={1271.23}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
      user={loggedIn}
      transactions={[]}
      banks={[{ $id: "1", name: "Bank of America", currentBalance: 1271.23}, { $id: "2", name: "Chase Bank", currentBalance: 1271.23}]}
      />
    </section>
  );
};

export default Home;
