import AccountSummary from "../../components/Dashboard/AccountSummary";
import ActiveBids from "../../components/Dashboard/ActiveBids";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import Messages from "../../components/Dashboard/Messages";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import Watchlist from "../../components/Dashboard/Watchlist";
import WonAuctions from "../../components/Dashboard/WonAuctions";

import "./Dashboard.css";

function Dashboard({ onLogout }) {
  return (
    <div className="dashboard">
      {/* =========================
          SIDEBAR
      ========================= */}

      <DashboardSidebar onLogout={onLogout} />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="dashboard-main">
        {/* =========================
            WELCOME HEADER
        ========================= */}

        <DashboardHeader />

        {/* =========================
            ACCOUNT SUMMARY
            DIRECTLY BELOW HEADER
        ========================= */}

        <section className="account-summary-row">
          <AccountSummary />
        </section>

        {/* =========================
            STATISTICS
        ========================= */}

        <DashboardStats />

        {/* =========================
            ACTIVE BIDS + WATCHLIST
            SAME ROW
        ========================= */}

        <section className="dashboard-columns active-bids-row">
          <ActiveBids />
          <Watchlist />
        </section>

        {/* =========================
            WON AUCTIONS +
            RECENT ACTIVITY +
            MESSAGES
            SAME ROW
        ========================= */}

        <section className="dashboard-columns bottom-three-row">
          <WonAuctions />
          <RecentActivity />
          <Messages />
        </section>

        {/* =========================
            COPYRIGHT
        ========================= */}

        <footer className="dashboard-footer">
          <p className="copyright">© 2026 eAuction. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
