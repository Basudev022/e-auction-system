const messages = [
  {
    id: 1,
    sender: "Luxury Timepieces",
    message: "Regarding your bid on Rolex Submariner Date",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "Art Gallery",
    message: "Your invoice for painting",
    time: "Yesterday",
  },
  {
    id: 3,
    sender: "Support Team",
    message: "Your query has been resolved",
    time: "2 May",
  },
  {
    id: 4,
    sender: "House Of Collectibles",
    message: "Shipping confirmation",
    time: "1 May",
  },
  {
    id: 5,
    sender: "Admin",
    message: "Important update",
    time: "28 Apr",
  },
];

function Messages() {
  return (
    <div className="dashboard-card" id="messages">
      <div className="card-header">
        <h2>Messages</h2>
        <a href="#messages">View All →</a>
      </div>

      <div className="messages-list">
        {messages.map((message) => (
          <div className="message-item" key={message.id}>
            <div className="message-avatar">{message.sender.charAt(0)}</div>

            <div className="message-content">
              <strong>{message.sender}</strong>
              <p>{message.message}</p>
            </div>

            <small>{message.time}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
