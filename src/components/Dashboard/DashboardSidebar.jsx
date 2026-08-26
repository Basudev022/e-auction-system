function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="brand">
        <div className="brand-icon">⚒</div>

        <div>
          <h2>eAuction</h2>
          <span>Bid More, Win More</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <span>⌂</span>
          Overview
        </button>

        <button className="nav-item">
          <span>◉</span>
          My Bids
        </button>

        <button className="nav-item">
          <span>♡</span>
          Watchlist
        </button>

        <button className="nav-item">
          <span>🏆</span>
          Won Auctions
        </button>

        <button className="nav-item">
          <span>✉</span>
          Messages
          <span className="message-count">2</span>
        </button>

        <button className="nav-item">
          <span>⚙</span>
          Account Settings
        </button>

        <button className="nav-item">
          <span>▣</span>
          Payment Methods
        </button>

        <button className="nav-item">
          <span>⌖</span>
          My Address
        </button>

        <button className="nav-item logout">
          <span>↪</span>
          Log Out
        </button>
      </nav>

      <div className="help-card">
        <h4>Need Help?</h4>

        <p>We're here to help you with anything you need.</p>

        <button>☎ &nbsp; Contact Support</button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
