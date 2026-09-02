import { useState } from "react";

import "./SellerVerificationModal.css";

export default function SellerVerificationModal({ onClose }) {
  const [termsRead, setTermsRead] = useState(false);
  const [privacyRead, setPrivacyRead] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [documentVerified, setDocumentVerified] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleTermsScroll = (event) => {
    const element = event.target;

    const isAtBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5;

    if (isAtBottom) {
      setTermsRead(true);
    }
  };

  const handlePrivacyScroll = (event) => {
    const element = event.target;

    const isAtBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5;

    if (isAtBottom) {
      setPrivacyRead(true);
    }
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    setDocumentNumber("");
    setOtpSent(false);
    setOtp("");
    setDocumentVerified(false);
    setMessage("");
    setMessageType("");
  };

  const handleDocumentNumberChange = (event) => {
    let value = event.target.value;

    if (documentType === "PAN_CARD") {
      value = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10);
    }

    if (documentType === "AADHAAR_CARD") {
      const digits = value.replace(/\D/g, "").slice(0, 12);

      value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    setDocumentNumber(value);

    setOtpSent(false);
    setOtp("");
    setDocumentVerified(false);

    setMessage("");
    setMessageType("");
  };

  const validateDocument = () => {
    if (documentType === "PAN_CARD") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

      return panRegex.test(documentNumber);
    }

    if (documentType === "AADHAAR_CARD") {
      const aadhaarDigits = documentNumber.replace(/\s/g, "");

      return /^\d{12}$/.test(aadhaarDigits);
    }

    return false;
  };

  const handleVerifyNumber = () => {
    if (!termsRead || !privacyRead) {
      setMessage(
        "Please read the Terms & Conditions and Privacy Policy completely.",
      );
      setMessageType("error");
      return;
    }

    if (!accepted) {
      setMessage("Please accept the Terms & Conditions and Privacy Policy.");
      setMessageType("error");
      return;
    }

    if (!documentType) {
      setMessage("Please select a document.");
      setMessageType("error");
      return;
    }

    if (!documentNumber.trim()) {
      setMessage("Please enter your document number.");
      setMessageType("error");
      return;
    }

    if (!validateDocument()) {
      if (documentType === "PAN_CARD") {
        setMessage("Enter a valid PAN number");
      } else {
        setMessage("Enter a valid 12-digit Aadhaar number.");
      }

      setMessageType("error");
      return;
    }

    setOtpSent(true);
    setOtp("");
    setDocumentVerified(false);

    setMessage("OTP has been sent to your registered mobile number.");
    setMessageType("success");

    // Backend OTP API will be connected here.
  };

  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setMessage("Please enter the 6-digit OTP.");
      setMessageType("error");
      return;
    }

    setDocumentVerified(true);
    setOtpSent(false);
    setOtp("");

    setMessage("Document number verified successfully.");
    setMessageType("success");

    // Backend OTP verification API will be connected here.
  };

  const handleVerifyRequest = () => {
    if (!termsRead || !privacyRead) {
      setMessage("Please read all Terms & Conditions and Privacy Policy.");
      setMessageType("error");
      return;
    }

    if (!accepted) {
      setMessage("Please accept the Terms & Conditions and Privacy Policy.");
      setMessageType("error");
      return;
    }

    if (!documentVerified) {
      setMessage("Please verify your PAN Card or Aadhaar number first.");
      setMessageType("error");
      return;
    }

    setMessage("Seller verification request submitted successfully.");
    setMessageType("success");

    // Backend seller verification request API will be connected here.
  };

  const canAcceptTerms = termsRead && privacyRead;

  const canVerifyNumber =
    documentType &&
    documentNumber.trim() &&
    validateDocument() &&
    !otpSent &&
    !documentVerified;

  const canVerifyOtp = otpSent && otp.length === 6;

  const canVerifyRequest = canAcceptTerms && accepted && documentVerified;

  const panCharacterCount =
    documentType === "PAN_CARD" ? documentNumber.length : 0;

  const aadhaarDigitCount =
    documentType === "AADHAAR_CARD"
      ? documentNumber.replace(/\s/g, "").length
      : 0;

  return (
    <div className="seller-modal-overlay">
      <div className="seller-modal">
        <button
          type="button"
          className="seller-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="seller-modal-header">
          <h2>Become A Seller</h2>

          <p>
            Please read and accept the Terms &amp; Conditions and Privacy Policy
            before submitting your seller verification request.
          </p>
        </div>

        <div className="seller-policy-grid">
          <div className="seller-policy-section">
            <h3>Terms &amp; Conditions</h3>

            <textarea
              className="seller-policy-box"
              readOnly
              value={`1. Eligibility

You must provide accurate and complete information while registering as a seller.

2. Seller Responsibilities

You agree to provide genuine information and comply with all applicable laws and marketplace rules.

3. Prohibited Activities

You must not post prohibited, misleading, fraudulent, or illegal products or information.

4. Product Responsibility

The seller is responsible for the accuracy, quality, legality, and authenticity of every product listed.

5. Verification

eAuction may verify the submitted identity information before approving your seller account.

6. Account Responsibility

You are responsible for maintaining the security of your account and the information submitted through it.

7. Seller Agreement

By becoming a seller, you agree to follow the marketplace rules and seller requirements.

8. Policy Changes

eAuction may update these terms when necessary. Continued use of seller services means acceptance of the updated terms.`}
              onScroll={handleTermsScroll}
            />

            <div className={`seller-scroll-status ${termsRead ? "read" : ""}`}>
              {termsRead
                ? "✓ Read all Terms & Conditions"
                : "Scroll to read all terms"}
            </div>
          </div>

          <div className="seller-policy-section">
            <h3>Privacy Policy</h3>

            <textarea
              className="seller-policy-box"
              readOnly
              value={`1. Information We Collect

We may collect information such as your name, contact details, and identity document information for seller verification.

2. How We Use Your Information

Your information is used for identity verification, account management, marketplace security, and providing seller services.

3. Information Security

We take reasonable measures to protect the information submitted through our platform.

4. Information Sharing

Your personal information will not be sold or rented to third parties. Information may be shared where required by law or necessary to provide services.

5. Document Information

Identity document information is collected for verification and compliance purposes.

6. Data Retention

Information may be retained for as long as necessary to meet legal, security, and operational requirements.

7. Your Responsibility

You must provide accurate information and ensure that the submitted document belongs to you.

8. Policy Updates

This privacy policy may be updated from time to time to reflect changes in our services or legal requirements.`}
              onScroll={handlePrivacyScroll}
            />

            <div
              className={`seller-scroll-status ${privacyRead ? "read" : ""}`}
            >
              {privacyRead
                ? "✓ Read all Privacy Policy"
                : "Scroll to read all policy"}
            </div>
          </div>
        </div>

        <label
          className={`seller-agreement ${!canAcceptTerms ? "disabled" : ""}`}
        >
          <input
            type="checkbox"
            checked={accepted}
            disabled={!canAcceptTerms}
            onChange={(event) => setAccepted(event.target.checked)}
          />

          <span>
            I have read, understood and agree to the{" "}
            <strong>Terms &amp; Conditions</strong> and{" "}
            <strong>Privacy Policy</strong>.
          </span>
        </label>

        <div className="seller-document-section">
          <div className="seller-field">
            <label htmlFor="documentType">Select Document</label>

            <select
              id="documentType"
              value={documentType}
              onChange={handleDocumentTypeChange}
            >
              <option value="">Select Document</option>
              <option value="PAN_CARD">PAN Card</option>
              <option value="AADHAAR_CARD">Aadhaar Card</option>
            </select>
          </div>

          <div className="seller-field">
            <label htmlFor="documentNumber">Enter Document Number</label>

            <input
              id="documentNumber"
              type="text"
              value={documentNumber}
              onChange={handleDocumentNumberChange}
              placeholder={
                documentType === "PAN_CARD"
                  ? "Enter the PAN card number"
                  : documentType === "AADHAAR_CARD"
                    ? "Enter the Aadhaar number"
                    : "Select a document"
              }
              disabled={!documentType || documentVerified}
              maxLength={
                documentType === "PAN_CARD"
                  ? 10
                  : documentType === "AADHAAR_CARD"
                    ? 14
                    : undefined
              }
            />

            {documentType === "PAN_CARD" && panCharacterCount < 10 && (
              <p className="seller-document-note">
                PAN Card must contain 10 characters.
              </p>
            )}

            {documentType === "PAN_CARD" &&
              panCharacterCount === 10 &&
              !validateDocument() && (
                <p className="seller-document-note">
                  Enter a valid PAN number, for example ABCDE1234F.
                </p>
              )}

            {documentType === "AADHAAR_CARD" && aadhaarDigitCount < 12 && (
              <p className="seller-document-note">
                Aadhaar must contain 12 digits.
              </p>
            )}
          </div>
        </div>

        {/* Verify button centered across the complete popup */}
        {!documentVerified && (
          <button
            type="button"
            className="verify-number-btn"
            disabled={!canVerifyNumber}
            onClick={handleVerifyNumber}
          >
            Verify
          </button>
        )}

        {documentVerified && <div className="verified-badge">✓ Verified</div>}

        {message && (
          <div className={`seller-verification-message ${messageType}`}>
            {message}
          </div>
        )}

        {otpSent && (
          <div className="seller-otp-section">
            <div className="seller-otp-content">
              <div className="seller-field">
                <label htmlFor="sellerOtp">Enter OTP</label>

                <input
                  id="sellerOtp"
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>

              <button
                type="button"
                className="verify-otp-btn"
                disabled={!canVerifyOtp}
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        <div className="seller-modal-footer">
          <button
            type="button"
            className="verify-request-btn"
            disabled={!canVerifyRequest}
            onClick={handleVerifyRequest}
          >
            Verify Request
          </button>
        </div>
      </div>
    </div>
  );
}
