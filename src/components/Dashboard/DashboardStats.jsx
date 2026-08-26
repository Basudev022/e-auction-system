function DashboardStats() {
  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">⚒</div>

        <div>
          <p>Active Bids</p>
          <h2>12</h2>
        </div>

        <a href="#active-bids">View All →</a>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🏆</div>

        <div>
          <p>Won Auctions</p>
          <h2>3</h2>
        </div>

        <a href="#won-auctions">View All →</a>
      </div>

      <div className="stat-card">
        <div className="stat-icon heart">♥</div>

        <div>
          <p>Watchlist Items</p>
          <h2>8</h2>
        </div>

        <a href="#watchlist">View All →</a>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✉</div>

        <div>
          <p>Messages</p>
          <h2>2</h2>
        </div>

        <a href="#messages">View All →</a>
      </div>
    </section>
  );
}

export default DashboardStats;
