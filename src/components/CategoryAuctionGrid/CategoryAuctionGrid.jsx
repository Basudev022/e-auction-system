import AuctionCard from "../AuctionCard/AuctionCard";
import "./CategoryAuctionGrid.css";

const categories = [
  {
    id: 4,
    title: "Art & Collectibles",
    description: "Find unique artwork, antiques, collectibles, and rare items.",
    theme: "art",
    layout: "half",
    items: [
      { id: 401, title: "Landscape Painting", category: "Art" },
      { id: 402, title: "Antique Clock", category: "Collectibles" },
      { id: 403, title: "Sculpture", category: "Art" },
      { id: 404, title: "Collectible Coin", category: "Collectibles" },
      { id: 405, title: "Vintage Painting", category: "Art" },
      { id: 406, title: "Rare Antique Vase", category: "Collectibles" },
    ],
  },
  {
    id: 6,
    title: "Fashion",
    description:
      "Discover fashion pieces, footwear, handbags, and accessories.",
    theme: "fashion",
    layout: "half",
    items: [
      { id: 601, title: "Designer Handbag", category: "Fashion" },
      { id: 602, title: "Sneakers", category: "Fashion" },
      { id: 603, title: "Sunglasses", category: "Accessories" },
      { id: 604, title: "Fashion Jacket", category: "Fashion" },
      { id: 605, title: "Designer Watch", category: "Accessories" },
      { id: 606, title: "Leather Boots", category: "Fashion" },
    ],
  },
  {
    id: 1,
    title: "Electronics",
    description:
      "Discover laptops, smartphones, cameras, and the latest technology.",
    theme: "electronics",
    layout: "full",
    items: [
      { id: 101, title: "Laptop", category: "Electronics" },
      { id: 102, title: "Smartphone", category: "Electronics" },
      { id: 103, title: "Digital Camera", category: "Electronics" },
      { id: 104, title: "Headphones", category: "Electronics" },
      { id: 105, title: "Gaming Console", category: "Electronics" },
      { id: 106, title: "Smartwatch", category: "Electronics" },
    ],
  },
  {
    id: 5,
    title: "Jewelry & Watches",
    description:
      "Explore watches, rings, necklaces, and statement accessories.",
    theme: "jewelry",
    layout: "full",
    items: [
      { id: 501, title: "Classic Watch", category: "Watches" },
      { id: 502, title: "Gold Ring", category: "Jewelry" },
      { id: 503, title: "Necklace", category: "Jewelry" },
      { id: 504, title: "Bracelet", category: "Jewelry" },
      { id: 505, title: "Diamond Earrings", category: "Jewelry" },
      { id: 506, title: "Luxury Watch", category: "Watches" },
    ],
  },
  {
    id: 2,
    title: "Real Estate",
    description:
      "Explore residential properties, apartments, villas, and commercial spaces.",
    theme: "real-estate",
    layout: "half",
    items: [
      { id: 201, title: "Modern Apartment", category: "Real Estate" },
      { id: 202, title: "Luxury Villa", category: "Real Estate" },
      { id: 203, title: "Commercial Space", category: "Real Estate" },
      { id: 204, title: "Residential Plot", category: "Real Estate" },
      { id: 205, title: "Studio Apartment", category: "Real Estate" },
      { id: 206, title: "Farmhouse", category: "Real Estate" },
    ],
  },
  {
    id: 3,
    title: "Vehicles",
    description:
      "Browse cars, motorcycles, and other vehicles available for bidding.",
    theme: "vehicles",
    layout: "half",
    items: [
      { id: 301, title: "Sedan", category: "Vehicles" },
      { id: 302, title: "Sports Bike", category: "Vehicles" },
      { id: 303, title: "SUV", category: "Vehicles" },
      { id: 304, title: "Electric Scooter", category: "Vehicles" },
      { id: 305, title: "Vintage Car", category: "Vehicles" },
      { id: 306, title: "Electric Car", category: "Vehicles" },
    ],
  },
  {
    id: 7,
    title: "Furniture",
    description:
      "Browse furniture, home décor, lighting, and interior essentials.",
    theme: "furniture",
    layout: "half",
    items: [
      { id: 701, title: "Sofa", category: "Furniture" },
      { id: 702, title: "Dining Table", category: "Furniture" },
      { id: 703, title: "Study Desk", category: "Furniture" },
      { id: 704, title: "Decorative Lamp", category: "Home Decor" },
      { id: 705, title: "Bookshelf", category: "Furniture" },
      { id: 706, title: "Office Chair", category: "Furniture" },
    ],
  },
  {
    id: 11,
    title: "Books & Media",
    description: "Find books, movies, music, and other media items.",
    theme: "books",
    layout: "half",
    items: [
      { id: 1101, title: "Book Collection", category: "Books & Media" },
      { id: 1102, title: "Movie DVD Set", category: "Books & Media" },
      { id: 1103, title: "Music Album", category: "Books & Media" },
      { id: 1104, title: "Rare First Edition", category: "Books & Media" },
      { id: 1105, title: "Vinyl Record", category: "Books & Media" },
      { id: 1106, title: "Comic Book Collection", category: "Books & Media" },
    ],
  },
  {
    id: 12,
    title: "Sports",
    description: "Explore sports equipment, memorabilia, and collectibles.",
    theme: "sports",
    layout: "full",
    items: [
      { id: 1201, title: "Cricket Bat", category: "Sports" },
      { id: 1202, title: "Football Jersey", category: "Sports" },
      { id: 1203, title: "Tennis Racket", category: "Sports" },
      { id: 1204, title: "Signed Cricket Ball", category: "Sports" },
      { id: 1205, title: "Basketball", category: "Sports" },
      { id: 1206, title: "Sports Memorabilia", category: "Sports" },
    ],
  },
];

/* 
   CATEGORY PANEL
 */

function CategoryPanel({ category, onProductDetails, onExploreCategory }) {
  const visibleItems = category.items.slice(
    0,
    category.layout === "half" ? 3 : 6,
  );

  return (
    <section
      className={`category-auction-panel category-theme-${category.theme} category-layout-${category.layout}`}
    >
      <div className="category-panel-info">
        <div className="category-panel-heading">
          <h2 className="category-panel-title">{category.title}</h2>

          <p className="category-panel-description">{category.description}</p>
        </div>

        <button
          type="button"
          className="category-explore-link"
          onClick={() => onExploreCategory?.(category)}
          aria-label={`Explore all ${category.title} auctions`}
        >
          Explore <span aria-hidden="true"></span>
        </button>
      </div>

      <div className="category-auction-cards">
        {visibleItems.map((item) => (
          <div className="category-auction-card" key={item.id}>
            <AuctionCard
              auctionId={item.auctionId ?? item.id}
              productId={item.productId ?? item.id}
              image={item.image}
              title={item.title}
              seller={item.seller ?? "Verified Seller"}
              category={item.category}
              description={item.description ?? ""}
              basePrice={item.basePrice}
              currHighestBid={item.currHighestBid}
              startTime={item.startTime}
              endTime={item.endTime}
              auctionStatus={item.auctionStatus}
              product={item.product}
              imageCount={item.imageCount ?? 5}
              verified={item.verified ?? true}
              onProductClick={onProductDetails}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* 
   CATEGORY AUCTION GRID
 */

export default function CategoryAuctionGrid({
  onProductDetails,
  onExploreCategory,
  start = 0,
  limit,
}) {
  const visibleCategories = categories.slice(
    start,
    limit === undefined ? undefined : start + limit,
  );

  return (
    <div className="category-auctions-container">
      {visibleCategories.map((category) => (
        <div
          className={`category-grid-item category-item-${category.layout}`}
          key={category.id}
        >
          <CategoryPanel
            category={category}
            onProductDetails={onProductDetails}
            onExploreCategory={onExploreCategory}
          />
        </div>
      ))}
    </div>
  );
}
