const watchlistItems = [
  {
    id: 1,
    name: "Modern 3BHK Villa",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
    price: "₹75,00,000",
    time: "05 : 45 : 30",
  },
  {
    id: 2,
    name: "Canon EOS R5 Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
    price: "₹1,25,000",
    time: "02 : 35 : 45",
  },
  {
    id: 3,
    name: "Vintage Landscape Painting",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=300&q=80",
    price: "₹25,500",
    time: "00 : 30 : 10",
  },
  {
    id: 4,
    name: "BMW 5 Series 2021",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=300&q=80",
    price: "₹18,50,000",
    time: "03 : 20 : 15",
  },
];

function Watchlist() {
  return (
    <div className="dashboard-card" id="watchlist">
      <div className="card-header">
        <h2>Watchlist</h2>
        <a href="#watchlist">View All →</a>
      </div>

      <div className="watch-list">
        {watchlistItems.map((item) => (
          <div className="watch-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>

              <strong>{item.price}</strong>

              <p>
                Ends in <span>{item.time}</span>
              </p>
            </div>

            <button
              className="heart-button"
              aria-label={`Remove ${item.name} from watchlist`}
            >
              ♥
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
