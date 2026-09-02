const activeBids = [
  {
    id: 1,
    name: "Rolex Submariner Date",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80",
    bid: "₹8,50,000",
    time: "02 : 15 : 30",
    bids: "32 Bids",
  },
  {
    id: 2,
    name: "2022 Tesla Model 3",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=300&q=80",
    bid: "₹2,45,000",
    time: "01 : 45 : 22",
    bids: "18 Bids",
  },
  {
    id: 3,
    name: "Diamond Necklace",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80",
    bid: "₹3,25,000",
    time: "01 : 10 : 05",
    bids: "28 Bids",
  },
  {
    id: 4,
    name: "Vintage Landscape Painting",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=300&q=80",
    bid: "₹25,500",
    time: "00 : 30 : 10",
    bids: "12 Bids",
  },
];

function ActiveBids() {
  return (
    <div className="dashboard-card active-bids-card" id="active-bids">
      <div className="card-header">
        <h2>Registered Auctions</h2>
        <a href="#active-bids">View All →</a>
      </div>

      <div className="bid-list">
        {activeBids.map((item) => (
          <div className="bid-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="bid-info">
              <h3>{item.name}</h3>
              <span>Current Bid</span>
              <strong>{item.bid}</strong>
            </div>

            <div className="bid-time">
              <strong>{item.time}</strong>
              <small>Hrs&nbsp;&nbsp; Mins&nbsp;&nbsp; Sec</small>
            </div>

            <span className="bid-count">{item.bids}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveBids;
