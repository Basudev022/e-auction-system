function AccountSummary() {
  return (
    <div className="dashboard-card account-card">
      {/* =========================
          HEADER
      ========================= */}

      <div className="card-header">
        <h2>Account Details</h2>

        <button type="button" className="edit-profile-button">
          Edit Profile
        </button>
      </div>

      {/* =========================
          ACCOUNT DETAILS
      ========================= */}

      <div className="account-row">
        {/* FULL NAME */}

        <div className="account-item">
          <span>Full Name</span>

          <strong>Basudev Naik</strong>
        </div>

        {/* EMAIL */}

        <div className="account-item">
          <span>Email Address</span>

          <strong>basudev@example.com</strong>
        </div>

        {/* MEMBER SINCE */}

        <div className="account-item">
          <span>Member Since</span>

          <strong>12 April 2024</strong>
        </div>

        {/* PHONE */}

        <div className="account-item">
          <span>Phone Number</span>

          <strong>+91 98765 43210</strong>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
