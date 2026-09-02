import AccountSummary from "../../components/Dashboard/AccountSummary";
import ActiveBids from "../../components/Dashboard/ActiveBids";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import Messages from "../../components/Dashboard/Messages";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import Watchlist from "../../components/Dashboard/Watchlist";
import WonAuctions from "../../components/Dashboard/WonAuctions";
import Header from "../../components/Header/Header";

import "./Dashboard.css";

function Dashboard({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} dashboardMode />

      <div className="dashboard">
        <DashboardSidebar onLogout={onLogout} />

        <main className="dashboard-main">
          <section className="account-summary-row">
            <AccountSummary />
          </section>

          <DashboardStats />

          <section className="dashboard-columns active-bids-row">
            <ActiveBids />
            <Watchlist />
          </section>

          <section className="dashboard-columns bottom-three-row">
            <WonAuctions />
            <RecentActivity />
            <Messages />
          </section>

          <footer className="dashboard-footer">
            <p className="copyright">© 2026 eAuction. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
