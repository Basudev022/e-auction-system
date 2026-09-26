import { useState } from "react";
import "./MyAddress.css";

function MyAddress() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      label: "Home",
      address: "123 Oak Street",
      city: "London, SW1A 1AA",
      country: "United Kingdom",
      phone: "+44 7123 456789",
      isDefault: true,
      icon: "home",
    },
    {
      id: 2,
      name: "John Doe (Office)",
      label: "Office",
      address: "456 Business Road",
      city: "Manchester, M1 2AB",
      country: "United Kingdom",
      phone: "+44 7987 654321",
      isDefault: false,
      icon: "office",
    },
    {
      id: 3,
      name: "Holiday Home",
      label: "Other",
      address: "789 Coastal Drive",
      city: "Brighton, BN1 3CD",
      country: "United Kingdom",
      phone: "+44 7766 112233",
      isDefault: false,
      icon: "location",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleSetDefault = (id) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  return (
    <div className="my-address-page">
      {/* PAGE HEADER */}
      <div className="my-address-header">
        <div>
          <h1>My Addresses</h1>
          <p>
            Manage your shipping addresses for a faster and easier checkout
            experience.
          </p>
        </div>

        <button
          type="button"
          className="add-address-btn"
          onClick={() => setShowForm(true)}
        >
          <span>+</span>
          Add New Address
        </button>
      </div>

      {/* ADD ADDRESS FORM */}
      {showForm && (
        <div className="address-form-card">
          <div className="address-form-header">
            <div>
              <h2>Add New Address</h2>
              <p>Enter your shipping address details.</p>
            </div>

            <button
              type="button"
              className="address-close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
          </div>

          <form
            className="address-form"
            onSubmit={(event) => {
              event.preventDefault();
              setShowForm(false);
            }}
          >
            <div className="address-form-grid">
              <div className="address-field">
                <label>Address Name</label>
                <input type="text" placeholder="e.g. Home, Office" />
              </div>

              <div className="address-field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>

              <div className="address-field address-field-full">
                <label>Street Address</label>
                <input type="text" placeholder="Enter street address" />
              </div>

              <div className="address-field">
                <label>City</label>
                <input type="text" placeholder="Enter city" />
              </div>

              <div className="address-field">
                <label>Postal Code</label>
                <input type="text" placeholder="Enter postal code" />
              </div>

              <div className="address-field">
                <label>Country</label>
                <input type="text" placeholder="Enter country" />
              </div>

              <div className="address-field">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" />
              </div>
            </div>

            <div className="address-form-actions">
              <button
                type="button"
                className="address-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="address-save-btn">
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADDRESS LIST */}
      <div className="address-list">
        {addresses.map((address) => (
          <div
            className={`address-card ${
              address.isDefault ? "default-address" : ""
            }`}
            key={address.id}
          >
            {/* ADDRESS ICON */}
            <div className="address-icon">
              {address.icon === "home" && (
                <svg
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5 9.5V21h14V9.5" />
                  <path d="M9 21v-7h6v7" />
                </svg>
              )}

              {address.icon === "office" && (
                <svg
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
                  <path d="M2 21h20" />
                  <path d="M8 7h2" />
                  <path d="M8 11h2" />
                  <path d="M8 15h2" />
                  <path d="M13 7h1" />
                  <path d="M13 11h1" />
                  <path d="M13 15h1" />
                  <path d="M17 10h3a1 1 0 0 1 1 1v10" />
                </svg>
              )}

              {address.icon === "location" && (
                <svg
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              )}
            </div>

            {/* ADDRESS DETAILS */}
            <div className="address-details">
              <div className="address-name-row">
                <h2>{address.name}</h2>

                {address.isDefault && (
                  <span className="default-address-badge">Default</span>
                )}
              </div>

              <p>{address.address}</p>
              <p>{address.city}</p>
              <p>{address.country}</p>
              <p className="address-phone">{address.phone}</p>
            </div>

            {/* ADDRESS ACTIONS */}
            <div className="address-actions">
              <button
                type="button"
                className="edit-address-btn"
                onClick={() => {}}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                </svg>
                Edit
              </button>

              <button
                type="button"
                className="address-more-btn"
                onClick={() => {
                  if (!address.isDefault) {
                    handleSetDefault(address.id);
                  }
                }}
                aria-label={
                  address.isDefault
                    ? "Default address"
                    : "Set as default address"
                }
              >
                •••
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <p className="copyright">© 2026 eAuction. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MyAddress;
