import { useRef, useState } from "react";

import "./CreateAuction.css";

export default function CreateAuction() {
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const auctionStartTimeRef = useRef(null);
  const auctionEndTimeRef = useRef(null);

  const [product, setProduct] = useState({
    productId: null,
    productName: "",
    category: "",
    basePrice: "",
    description: "",
  });

  const [auction, setAuction] = useState({
    title: "",
    startTime: "",
    endTime: "",
    bidIncrement: "",
  });

  const handleCategoryToggle = () => {
    setUseCustomCategory((previous) => !previous);
    setCategory("");
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length < 5) {
      alert("Please select at least 5 product photos.");
      setProductImages([]);
      return;
    }

    const validFiles = files.filter((file) => {
      const validType = ["image/jpeg", "image/jpg", "image/png"].includes(
        file.type,
      );
      const validSize = file.size <= 5 * 1024 * 1024;
      return validType && validSize;
    });

    if (validFiles.length < 5) {
      alert(
        "Please select at least 5 valid JPG, JPEG, or PNG photos. Each photo must be below 5MB.",
      );
      setProductImages([]);
      return;
    }

    setProductImages(validFiles);
  };

  const handleAddProduct = () => {
    if (!product.productName.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!category.trim()) {
      alert("Please select or create a category.");
      return;
    }

    if (!product.basePrice || Number(product.basePrice) <= 0) {
      alert("Please enter a valid base price.");
      return;
    }

    if (!product.description.trim()) {
      alert("Please enter product description.");
      return;
    }

    if (productImages.length < 5) {
      alert("At least 5 product photos are required.");
      return;
    }

    const newProduct = {
      productId: null,
      productName: product.productName.trim(),
      category: category.trim(),
      basePrice: product.basePrice,
      description: product.description.trim(),
      images: [...productImages],
      verificationStatus: "Pending",
      verifiedBy: null,
      verifiedAt: null,
      remarks: "Product is waiting for admin verification.",
    };

    setProducts((previous) => [...previous, newProduct]);

    setProduct({
      productId: null,
      productName: "",
      category: "",
      basePrice: "",
      description: "",
    });
    setCategory("");
    setUseCustomCategory(false);
    setProductImages([]);
  };

  const verifiedProducts = products.filter(
    (item) => item.verificationStatus === "Verified",
  );

  const selectedProduct = products.find(
    (item) => String(item.productId) === String(selectedProductId),
  );

  const auctionEnabled = Boolean(selectedProduct);

  // Frontend-only progress state.
  // Backend/admin verification will update verificationStatus later.
  const currentFlowStep =
    products.length === 0 ? 1 : verifiedProducts.length > 0 ? 4 : 2;

  const formatPrice = (price) => {
    if (!price) return "₹0";
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  return (
    <div className="create-auction-page">
      {/* PAGE HEADING */}
      <div className="create-auction-heading">
        <div>
          <h1>Create New Auction</h1>
          <p>
            Add your product details first. After admin verification, you can
            create the auction.
          </p>
        </div>
      </div>

      {/* ONLY THE TWO FORMS USE THIS GRID */}
      <div className="create-auction-content">
        {/* =====================================================
            LEFT FORM - ADD PRODUCT
        ====================================================== */}
        <section className="create-product-card">
          <div className="create-section-header">
            <div className="create-section-number product-step-number">1</div>
            <div>
              <h2>Add Product Details</h2>
              <p>Provide accurate information about your product.</p>
            </div>
          </div>

          <div className="create-product-form">
            {/* PRODUCT NAME */}
            <div className="create-form-group">
              <label htmlFor="productName">
                Product Name <span>*</span>
              </label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={product.productName}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    productName: event.target.value,
                  })
                }
              />
            </div>

            {/* CATEGORY */}
            <div className="create-form-group">
              <label htmlFor="productCategory">
                Category <span>*</span>
              </label>

              <div className="category-input-row">
                {useCustomCategory ? (
                  <input
                    id="productCategory"
                    type="text"
                    placeholder="Write category here"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                ) : (
                  <select
                    id="productCategory"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Art & Collectibles">
                      Art & Collectibles
                    </option>
                    <option value="Jewelry & Watches">Jewelry & Watches</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Sports">Sports</option>
                    <option value="Books & Media">Books & Media</option>
                  </select>
                )}

                <button
                  type="button"
                  className="create-category-button"
                  onClick={handleCategoryToggle}
                >
                  <span>+</span>
                  {useCustomCategory ? "Select Category" : "Create Category"}
                </button>
              </div>
            </div>

            {/* BASE PRICE */}
            <div className="create-form-group">
              <label htmlFor="basePrice">
                Base Price <span>*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">₹</span>
                <input
                  id="basePrice"
                  type="number"
                  min="0"
                  placeholder="Enter base price"
                  value={product.basePrice}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      basePrice: event.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="create-form-group">
              <label htmlFor="productDescription">
                Description <span>*</span>
              </label>
              <textarea
                id="productDescription"
                rows="5"
                placeholder="Provide a detailed description of your product..."
                value={product.description}
                onChange={(event) =>
                  setProduct({
                    ...product,
                    description: event.target.value,
                  })
                }
              />
            </div>

            {/* PRODUCT PHOTOS */}
            <div className="create-form-group">
              <label htmlFor="productImages">
                Product Photos <span>*</span>
              </label>

              <div className="product-image-upload">
                <label htmlFor="productImages" className="upload-placeholder">
                  <div className="upload-icon">↥</div>
                  <strong>Click to upload product photos</strong>
                  <span>Select at least 5 photos</span>
                  <small>JPG, PNG, JPEG • Maximum 5MB per image</small>
                </label>

                <input
                  id="productImages"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </div>

              {productImages.length > 0 && (
                <div
                  className={`photo-count ${
                    productImages.length >= 5 ? "photo-count-valid" : ""
                  }`}
                >
                  {productImages.length} photos selected
                  {productImages.length >= 5
                    ? " ✓ Minimum requirement satisfied"
                    : " — At least 5 required"}
                </div>
              )}

              {productImages.length > 0 && (
                <div className="product-upload-previews">
                  {productImages.map((file, index) => (
                    <div
                      className="product-upload-preview"
                      key={`${file.name}-${index}`}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Product ${index + 1}`}
                      />
                      <span>{index + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="add-product-button"
              onClick={handleAddProduct}
            >
              <span>+</span>
              Add Product
            </button>
          </div>

          <div className="product-verification-notice">
            <div className="verification-notice-icon">◷</div>
            <div>
              <strong>Product will be reviewed by admin</strong>
              <p>
                After adding the product, it will go through admin verification.
                You will be notified once it is verified, and then you can
                create the auction.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT FORM - AUCTION
        ====================================================== */}
        <section className="create-auction-card">
          <div className="flow-card">
            <h2>Product to Auction Flow</h2>

            <div className="product-auction-flow">
              <div className="flow-line" />

              <div
                className={`flow-step ${
                  currentFlowStep >= 1 ? "completed" : ""
                } ${currentFlowStep === 1 ? "current" : ""}`}
              >
                <div className="flow-step-number">1</div>
                <strong>Add Product</strong>
                <span>(by Seller)</span>
              </div>

              <div
                className={`flow-step ${
                  currentFlowStep >= 2 ? "completed" : ""
                } ${currentFlowStep === 2 ? "current" : ""}`}
              >
                <div className="flow-step-number">2</div>
                <strong>Under Verification</strong>
                <span>(by Admin)</span>
              </div>

              <div
                className={`flow-step ${
                  currentFlowStep >= 3 ? "completed" : ""
                } ${currentFlowStep === 3 ? "current" : ""}`}
              >
                <div className="flow-step-number">3</div>
                <strong>Get Notified</strong>
                <span>(when Verified)</span>
              </div>

              <div
                className={`flow-step ${
                  currentFlowStep >= 4 ? "completed" : ""
                } ${currentFlowStep === 4 ? "current" : ""}`}
              >
                <div className="flow-step-number">4</div>
                <strong>Create Auction</strong>
                <span>(for Verified Product)</span>
              </div>
            </div>
          </div>

          <div className="auction-form-panel">
            <div className="create-section-header auction-section-header">
              <div className="create-section-number auction-step-number">2</div>
              <div>
                <h2>Create Auction (After Product Verification)</h2>
                <p>
                  Once your product is verified by admin, you can create the
                  auction.
                </p>
              </div>
            </div>

            <div className="auction-verification-message">
              <div className="auction-message-icon">
                {auctionEnabled ? "✓" : "!"}
              </div>
              <span>
                {auctionEnabled
                  ? "This product is verified and ready for auction!"
                  : "Product verification is required before creating an auction."}
              </span>
            </div>

            <div className="verified-product-selector">
              <label htmlFor="verifiedProduct">
                Verified Product <span>*</span>
              </label>
              <select
                id="verifiedProduct"
                value={selectedProductId}
                onChange={(event) => setSelectedProductId(event.target.value)}
                disabled={verifiedProducts.length === 0}
              >
                <option value="">
                  {verifiedProducts.length === 0
                    ? "No verified product available yet"
                    : "Select a verified product"}
                </option>
                {verifiedProducts.map((item, index) => (
                  <option
                    key={`${item.productName}-${index}`}
                    value={String(item.productId)}
                  >
                    {item.productName} — {item.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="selected-product-card">
              <div className="selected-product-image">
                {selectedProduct?.images?.[0] ? (
                  <img
                    src={URL.createObjectURL(selectedProduct.images[0])}
                    alt={selectedProduct.productName}
                  />
                ) : (
                  <span>Product Image</span>
                )}
              </div>

              <div className="selected-product-details">
                <h3>
                  {selectedProduct?.productName || "Product will appear here"}
                </h3>
                <p>
                  {selectedProduct
                    ? `Category: ${selectedProduct.category}`
                    : "Select a verified product to create an auction."}
                </p>
              </div>

              <div className="selected-product-id">
                <span>Product ID</span>
                <strong>
                  {selectedProduct?.productId ?? "Auto Generated"}
                </strong>
              </div>

              <div
                className={`product-status ${
                  selectedProduct ? "product-status-verified" : ""
                }`}
              >
                {selectedProduct ? "✓ Verified" : "Waiting"}
              </div>
            </div>

            <div className="auction-form">
              {/* TITLE */}
              <div className="create-form-group auction-title-group">
                <label htmlFor="auctionTitle">Auction Title</label>
                <input
                  id="auctionTitle"
                  type="text"
                  placeholder="Enter auction title"
                  value={auction.title}
                  disabled={!auctionEnabled}
                  onChange={(event) =>
                    setAuction({ ...auction, title: event.target.value })
                  }
                />
                <small>If left empty, the product name will be used.</small>
              </div>

              {/* BID INCREMENT */}
              <div className="create-form-group bid-increment-group">
                <label htmlFor="bidIncrement">
                  Bid Increment <span>*</span>
                </label>
                <input
                  id="bidIncrement"
                  type="number"
                  min="0"
                  placeholder="Enter bid increment amount"
                  value={auction.bidIncrement}
                  disabled={!auctionEnabled}
                  onChange={(event) =>
                    setAuction({ ...auction, bidIncrement: event.target.value })
                  }
                />
              </div>

              {/* START TIME */}
              <div className="create-form-group auction-start-group">
                <label htmlFor="auctionStartTime">
                  Auction Start Time <span>*</span>
                </label>
                <div
                  className="datetime-input-wrapper"
                  onClick={() => auctionStartTimeRef.current?.showPicker?.()}
                >
                  <span className="datetime-icon" aria-hidden="true">
                    📅
                  </span>
                  <input
                    ref={auctionStartTimeRef}
                    id="auctionStartTime"
                    type="datetime-local"
                    value={auction.startTime}
                    disabled={!auctionEnabled}
                    onChange={(event) =>
                      setAuction({ ...auction, startTime: event.target.value })
                    }
                  />
                </div>
              </div>

              {/* END TIME */}
              <div className="create-form-group auction-end-group">
                <label htmlFor="auctionEndTime">
                  Auction End Time <span>*</span>
                </label>
                <div
                  className="datetime-input-wrapper"
                  onClick={() => auctionEndTimeRef.current?.showPicker?.()}
                >
                  <span className="datetime-icon" aria-hidden="true">
                    📅
                  </span>
                  <input
                    ref={auctionEndTimeRef}
                    id="auctionEndTime"
                    type="datetime-local"
                    value={auction.endTime}
                    disabled={!auctionEnabled}
                    onChange={(event) =>
                      setAuction({ ...auction, endTime: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="create-auction-button"
              disabled={!auctionEnabled}
            >
              <span>⚒</span>
              Create Auction
            </button>
          </div>
        </section>
      </div>

      {/* =====================================================
          ADDED PRODUCTS - FULL WIDTH, OUTSIDE THE GRID
      ====================================================== */}
      {products.length > 0 && (
        <section className="added-products-section">
          <div className="added-products-heading">
            <div>
              <h2>Added Products</h2>
              <p>Products submitted to the system for admin verification.</p>
            </div>
            <span>
              {products.length} Product{products.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="added-products-list">
            {products.map((item, index) => (
              <article
                className="added-product-details"
                key={`${item.productName}-${index}`}
              >
                <div className="added-product-details-header">
                  <div className="product-title-block">
                    <div className="product-details-number">{index + 1}</div>
                    <div>
                      <h3>PRODUCT DETAILS</h3>
                      <p>
                        Your product has been submitted for admin verification.
                      </p>
                    </div>
                  </div>

                  <span
                    className={`product-verification-badge ${
                      item.verificationStatus === "Verified"
                        ? "product-verification-badge-verified"
                        : "product-verification-badge-pending"
                    }`}
                  >
                    {item.verificationStatus === "Verified"
                      ? "✓ Verified"
                      : "◷ Pending Verification"}
                  </span>
                </div>

                <div className="product-details-main">
                  <div className="product-details-photo-grid">
                    {item.images.map((file, photoIndex) => (
                      <div
                        className="product-detail-photo"
                        key={`${file.name}-${photoIndex}`}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`${item.productName} ${photoIndex + 1}`}
                        />
                        <span>{photoIndex + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="product-details-grid">
                    <div>
                      <span className="product-detail-label">Product ID</span>
                      <strong className="product-detail-value">
                        {item.productId ?? "Auto Generated"}
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">Product Name</span>
                      <strong className="product-detail-value">
                        {item.productName}
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">Category</span>
                      <strong className="product-detail-value">
                        {item.category}
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">Base Price</span>
                      <strong className="product-detail-value">
                        {formatPrice(item.basePrice)}
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">
                        Product Photos
                      </span>
                      <strong className="product-detail-value product-photo-count">
                        {item.images.length} Photos
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">
                        Verification Status
                      </span>
                      <strong
                        className={`product-detail-value ${
                          item.verificationStatus === "Verified"
                            ? "verified-text"
                            : "pending-text"
                        }`}
                      >
                        {item.verificationStatus}
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">Verified By</span>
                      <strong className="product-detail-value">
                        {item.verifiedBy ?? "Not Verified Yet"}
                      </strong>
                    </div>

                    <div>
                      <span className="product-detail-label">Remarks</span>
                      <strong className="product-detail-value remarks-value">
                        {item.remarks}
                      </strong>
                    </div>
                  </div>

                  <div className="product-description-details">
                    <span className="product-detail-label">Description</span>
                    <p>{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
