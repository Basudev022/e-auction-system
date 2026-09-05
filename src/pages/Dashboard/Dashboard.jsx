import { useState } from "react";

import AccountSummary from "../../components/Dashboard/AccountSummary";
import ActiveBids from "../../components/Dashboard/ActiveBids";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import DashboardStats from "../../components/Dashboard/DashboardStats";
import Messages from "../../components/Dashboard/Messages";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import Watchlist from "../../components/Dashboard/Watchlist";
import WonAuctions from "../../components/Dashboard/WonAuctions";
import Header from "../../components/Header/Header";
import SellerVerificationModal from "../../components/Seller/SellerVerificationModal";

import "./Dashboard.css";

function Dashboard({
  onLogout,
  onSellerVerified,
  isSeller,
  isLoggedIn,
  user,
  onDashboard,
  onHome,
  onViewAllAuctions,
  onHowItWorks,
  activeLink = "",
  onActiveLinkChange,
}) {
  const [showSellerModal, setShowSellerModal] = useState(false);

  const handleBecomeSeller = () => {
    setShowSellerModal(true);
  };

  const handleCloseSellerModal = () => {
    setShowSellerModal(false);
  };

  const handleSellerVerified = () => {
    setShowSellerModal(false);

    if (onSellerVerified) {
      onSellerVerified();
    }
  };

  return (
    <>
      <Header
        onLogout={onLogout}
        onSellerVerified={onSellerVerified}
        dashboardMode
        isSeller={isSeller}
        isLoggedIn={isLoggedIn}
        user={user}
        onDashboard={onDashboard}
        onBecomeSeller={handleBecomeSeller}
        onHome={onHome}
        onViewAllAuctions={onViewAllAuctions}
        onHowItWorks={onHowItWorks}
        activeLink={activeLink}
        onActiveLinkChange={onActiveLinkChange}
      />

      <div className="dashboard">
        <DashboardSidebar
          onLogout={onLogout}
          onBecomeSeller={handleBecomeSeller}
        />

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

      {showSellerModal && (
        <SellerVerificationModal
          onClose={handleCloseSellerModal}
          onSellerVerified={handleSellerVerified}
        />
      )}
    </>
  );
}

export default Dashboard;
