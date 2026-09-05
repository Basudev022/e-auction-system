import { useState } from "react";

import CreateAuction from "../../components/SellerDashboard/CreateAuction";
import SellerDashboardOverview from "../../components/SellerDashboard/SellerDashboardOverview";
import SellerDashboardSidebar from "../../components/SellerDashboard/SellerDashboardSidebar";
import SellerHeader from "../../components/SellerDashboard/SellerHeader";

import "./SellerDashboard.css";

export default function SellerDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("overview");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case "create-auction":
        return <CreateAuction />;

      case "overview":
      default:
        return <SellerDashboardOverview />;
    }
  };

  return (
    <div className="seller-dashboard">
      <SellerHeader onLogout={onLogout} />

      <div className="seller-dashboard-layout">
        <SellerDashboardSidebar
          activePage={activePage}
          onPageChange={handlePageChange}
        />

        <main className="seller-dashboard-main">{renderContent()}</main>
      </div>
    </div>
  );
}
