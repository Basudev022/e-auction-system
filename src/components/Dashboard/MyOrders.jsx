import "./MyOrders.css";

const orders = [
  {
    id: "ORD00123",
    date: "5 Sept, 2026",
    product: "Rolex Submariner Date",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80",
    seller: "Luxury Watches",
    quantity: 1,
    price: "₹8,50,000",
    status: "Delivered",
    statusClass: "delivered",
    paymentMethod: "Online Payment",
    shippingName: "Yash Kumar",
    shippingAddress: "123, Green Park Lane",
    shippingCity: "Bhubaneswar, Odisha - 751001",
    phone: "+91 98765 43210",
    deliveredDate: "10 Sept, 2026 at 11:45 AM",

    timeline: {
      generated: "5 Sept",
      processing: "6 Sept",
      shipped: "7 Sept",
      delivered: "10 Sept",
    },
  },

  {
    id: "ORD00122",
    date: "2 Sept, 2026",
    product: "2022 Tesla Model 3",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80",
    seller: "Premium Motors",
    quantity: 1,
    price: "₹24,45,000",
    status: "Processing",
    statusClass: "processing",
    paymentMethod: "Online Payment",
    shippingName: "Yash Kumar",
    shippingAddress: "123, Green Park Lane",
    shippingCity: "Bhubaneswar, Odisha - 751001",
    phone: "+91 98765 43210",
    expectedDate: "15 Sept, 2026",

    timeline: {
      generated: "2 Sept",
      processing: "5 Sept",
      shipped: "",
      delivered: "",
    },
  },

  {
    id: "ORD00121",
    date: "28 Aug, 2026",
    product: "Diamond Necklace",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80",
    seller: "Royal Jewellers",
    quantity: 1,
    price: "₹3,25,000",
    status: "Shipped",
    statusClass: "shipped",
    paymentMethod: "Online Payment",
    shippingName: "Yash Kumar",
    shippingAddress: "123, Green Park Lane",
    shippingCity: "Bhubaneswar, Odisha - 751001",
    phone: "+91 98765 43210",
    expectedDate: "13 Sept, 2026",

    timeline: {
      generated: "28 Aug",
      processing: "29 Aug",
      shipped: "1 Sept",
      delivered: "",
    },
  },

  {
    id: "ORD00120",
    date: "25 Aug, 2026",
    product: "Canon EOS R5 Camera",
    image:
      "https://images.unsplash.com/photo-1606986628253-9f4f4e6f0d5c?auto=format&fit=crop&w=500&q=80",
    seller: "Camera World",
    quantity: 1,
    price: "₹1,25,000",
    status: "Order Generated",
    statusClass: "generated",
    paymentMethod: "Online Payment",
    shippingName: "Yash Kumar",
    shippingAddress: "123, Green Park Lane",
    shippingCity: "Bhubaneswar, Odisha - 751001",
    phone: "+91 98765 43210",
    expectedDate: "12 Sept, 2026",

    timeline: {
      generated: "25 Aug",
      processing: "",
      shipped: "",
      delivered: "",
    },
  },
];

function getTimelineSteps(order) {
  const status = order.status;

  const isGenerated =
    status === "Order Generated" ||
    status === "Processing" ||
    status === "Shipped" ||
    status === "Delivered";

  const isProcessing =
    status === "Processing" || status === "Shipped" || status === "Delivered";

  const isShipped = status === "Shipped" || status === "Delivered";

  const isDelivered = status === "Delivered";

  return [
    {
      label: "Order Generated",
      date: order.timeline.generated,
      completed: isGenerated,
      current: status === "Order Generated",
    },
    {
      label: "Processing",
      date: order.timeline.processing,
      completed: isProcessing,
      current: status === "Processing",
    },
    {
      label: "Shipped",
      date: order.timeline.shipped,
      completed: isShipped,
      current: status === "Shipped",
    },
    {
      label: "Delivered",
      date: order.timeline.delivered,
      completed: isDelivered,
      current: status === "Delivered",
    },
  ];
}

function StatusTimeline({ order }) {
  const steps = getTimelineSteps(order);

  return (
    <div className="order-timeline">
      <div className="timeline-line">
        {steps.map((step) => (
          <div className="timeline-step" key={step.label}>
            <div
              className={`timeline-circle ${
                step.completed ? "completed" : ""
              } ${step.current ? "current" : ""}`}
            >
              {step.completed && !step.current ? "✓" : ""}
            </div>

            <div className="timeline-label">{step.label}</div>

            {step.date && <div className="timeline-date">{step.date}</div>}
          </div>
        ))}
      </div>

      <div
        className={`order-status-message ${
          order.status === "Delivered"
            ? "success-message"
            : "processing-message"
        }`}
      >
        <span className="status-message-icon">
          {order.status === "Delivered" ? "✓" : "◷"}
        </span>

        <div>
          <strong>
            {order.status === "Delivered"
              ? "Your order has been delivered."
              : order.status === "Shipped"
                ? "Your order has been shipped."
                : order.status === "Processing"
                  ? "Your order is being processed."
                  : "Your order has been generated successfully."}
          </strong>

          <p>
            {order.status === "Delivered"
              ? `Delivered on ${order.deliveredDate}`
              : order.status === "Shipped"
                ? `Expected delivery by ${order.expectedDate}`
                : order.status === "Processing"
                  ? `Expected delivery by ${order.expectedDate}`
                  : `Expected delivery by ${order.expectedDate}`}
          </p>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <article className="my-order-card">
      <div className="order-card-header">
        <div>
          <span>Order ID:</span> <strong>{order.id}</strong>
        </div>

        <div>
          <span>Placed on:</span> <strong>{order.date}</strong>
        </div>

        <div>
          <span>Total:</span> <strong>{order.price}</strong>
        </div>

        <span className={`order-status ${order.statusClass}`}>
          <span className="status-dot"></span>
          {order.status}
        </span>

        <button type="button" className="invoice-button">
          ▣ View Invoice
        </button>
      </div>

      <div className="order-card-body">
        {/* PRODUCT */}
        <div className="order-product-section">
          <img
            src={order.image}
            alt={order.product}
            className="order-product-image"
          />

          <div className="order-product-details">
            <h3>{order.product}</h3>

            <p>
              <span>Seller:</span> {order.seller}
            </p>

            <p>
              <span>Quantity:</span> {order.quantity}
            </p>

            <strong className="order-product-price">{order.price}</strong>

            <div className="order-product-actions">
              <button type="button" className="outline-order-button">
                View Product
              </button>

              {order.status === "Delivered" ? (
                <button type="button" className="primary-order-button">
                  Contact Seller
                </button>
              ) : (
                <button type="button" className="primary-order-button">
                  Contact Seller
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ORDER TRACKING */}
        <div className="order-tracking-section">
          <StatusTimeline order={order} />
        </div>

        {/* SHIPPING ADDRESS */}
        <div className="order-address-section">
          <h4>
            <span className="address-icon">⌖</span>
            Shipping Address
          </h4>

          <div className="shipping-details">
            <strong>{order.shippingName}</strong>

            <p>{order.shippingAddress}</p>

            <p>{order.shippingCity}</p>

            <p>India</p>

            <p>Phone: {order.phone}</p>
          </div>

          <div className="payment-details">
            <span>Payment:</span>
            <strong>{order.paymentMethod}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MyOrders() {
  return (
    <section className="my-orders-page">
      <div className="my-orders-header">
        <div>
          <h1>My Orders</h1>

          <p>View and manage your orders from won auctions and purchases.</p>
        </div>

        <select className="order-sort" defaultValue="latest">
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      <div className="order-tabs">
        <button className="active" type="button">
          All Orders
        </button>

        <button type="button">Order Generated</button>

        <button type="button">Processing</button>

        <button type="button">Shipped</button>

        <button type="button">Delivered</button>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
