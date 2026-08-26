const wonAuctions = [
  {
    id: 1,
    name: "Vintage Landscape Painting",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=300&q=80",
    price: "₹25,500",
    date: "Won on 12 May 2024",
  },
  {
    id: 2,
    name: "Canon EOS R5 Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
    price: "₹1,25,000",
    date: "Won on 10 May 2024",
  },
  {
    id: 3,
    name: "Diamond Necklace",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80",
    price: "₹3,25,000",
    date: "Won on 05 May 2024",
  },
];

function WonAuctions() {
  return (
    <div className="dashboard-card" id="won-auctions">
      <div className="card-header">
        <h2>Won Auctions</h2>
        <a href="#won-auctions">View All →</a>
      </div>

      <div className="won-list">
        {wonAuctions.map((item) => (
          <div className="won-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WonAuctions;
