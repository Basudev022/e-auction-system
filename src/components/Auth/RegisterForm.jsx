import { useState } from "react";

import {
  CalendarDays,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

export default function RegisterForm({ setActiveTab }) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [dobError, setDobError] = useState("");

  /* =========================================
     TODAY
  ========================================= */

  const today = new Date();

  const todayString = today.toISOString().split("T")[0];

  /* =========================================
     PASSWORD
  ========================================= */

  const handlePasswordChange = (event) => {
    const value = event.target.value;

    setPassword(value);

    if (confirmPassword && value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  /* =========================================
     CONFIRM PASSWORD
  ========================================= */

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;

    setConfirmPassword(value);

    if (password && password !== value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  /* =========================================
     DATE OF BIRTH VALIDATION
  ========================================= */

  const handleDobChange = (event) => {
    const value = event.target.value;

    setDobError("");

    if (!value) {
      return;
    }

    const parts = value.split("-");

    const year = parts[0];

    /*
      Year must contain exactly 4 digits.
    */

    if (!year || year.length !== 4 || !/^\d{4}$/.test(year)) {
      setDobError("Year must contain exactly 4 digits");

      event.target.value = "";

      return;
    }

    /*
      Year must be between 1900
      and the current year.
    */

    const numericYear = Number(year);

    const currentYear = today.getFullYear();

    if (numericYear < 1900 || numericYear > currentYear) {
      setDobError(`Year must be between 1900 and ${currentYear}`);

      event.target.value = "";

      return;
    }

    /*
      DOB cannot be in the future.
    */

    if (value > todayString) {
      setDobError("Date of birth cannot be in the future");

      event.target.value = "";

      return;
    }
  };

  /* =========================================
     OPEN DATE PICKER
  ========================================= */

  const openDatePicker = () => {
    const dateInput = document.getElementById("register-dob");

    if (!dateInput) {
      return;
    }

    /*
      Modern Chrome / Edge support showPicker().
    */

    if (typeof dateInput.showPicker === "function") {
      try {
        dateInput.showPicker();
        return;
      } catch (error) {
        // Browser may block showPicker.
      }
    }

    /*
      Fallback:
      focus the input.
    */

    dateInput.focus();
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    /* Password validation */

    if (!password) {
      setPasswordError("Password is required");

      return;
    }

    if (!confirmPassword) {
      setPasswordError("Please confirm your password");

      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");

      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");

      return;
    }

    /* DOB validation */

    if (dobError) {
      return;
    }

    /*
      Registration API will be connected here.
    */

    console.log("Registration validation successful");
  };

  return (
    <div className="auth-form-container register-container">
      {/* =========================================
          TITLE
      ========================================= */}

      <div className="form-title">
        <h1>Create your account</h1>

        <p>Join eAuction and start bidding today</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* =========================================
            FULL NAME
        ========================================= */}

        <div className="input-group">
          <label htmlFor="register-name">Full name</label>

          <div className="input-wrapper">
            <div className="input-icon">
              <UserRound size={15} />
            </div>

            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>
        </div>

        {/* =========================================
            MOBILE NUMBER
        ========================================= */}

        <div className="input-group">
          <label htmlFor="register-mobile">Mobile number</label>

          <div className="input-wrapper">
            <div className="input-icon">
              <Phone size={15} />
            </div>

            <input
              id="register-mobile"
              type="tel"
              placeholder="Enter your mobile number"
              maxLength={10}
              autoComplete="tel"
              pattern="[6-9][0-9]{9}"
              required
            />
          </div>
        </div>

        {/* =========================================
            EMAIL
        ========================================= */}

        <div className="input-group">
          <label htmlFor="register-email">Email address</label>

          <div className="input-wrapper">
            <div className="input-icon">
              <Mail size={15} />
            </div>

            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* =========================================
            DOB + GENDER
        ========================================= */}

        <div className="register-two-column">
          {/* =====================================
              DATE OF BIRTH
          ===================================== */}

          <div className="input-group">
            <label htmlFor="register-dob">Date of birth</label>

            <div
              className={`input-wrapper dob-wrapper ${
                dobError ? "input-error" : ""
              }`}
            >
              {/* LEFT CALENDAR BUTTON */}

              <button
                type="button"
                className="dob-calendar-button"
                aria-label="Select date of birth"
                onClick={openDatePicker}
              >
                <CalendarDays size={15} />
              </button>

              {/* DATE INPUT */}

              <input
                id="register-dob"
                type="date"
                min="1900-01-01"
                max={todayString}
                required
                onChange={handleDobChange}
              />
            </div>

            {/* DOB ERROR */}

            {dobError && <div className="password-error">{dobError}</div>}
          </div>

          {/* =====================================
              GENDER
          ===================================== */}

          <div className="input-group">
            <label htmlFor="register-gender">Gender</label>

            <div className="input-wrapper">
              <div className="input-icon">
                <UserRound size={15} />
              </div>

              <select id="register-gender" defaultValue="" required>
                <option value="" disabled>
                  Select
                </option>

                <option value="MALE">Male</option>

                <option value="FEMALE">Female</option>

                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================
            PASSWORD
        ========================================= */}

        <div className="input-group">
          <label htmlFor="register-password">Password</label>

          <div
            className={`input-wrapper ${passwordError ? "input-error" : ""}`}
          >
            <div className="input-icon">
              <LockKeyhole size={15} />
            </div>

            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              minLength={6}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* =========================================
            CONFIRM PASSWORD
        ========================================= */}

        <div className="input-group">
          <label htmlFor="register-confirm">Confirm password</label>

          <div
            className={`input-wrapper ${passwordError ? "input-error" : ""}`}
          >
            <div className="input-icon">
              <LockKeyhole size={15} />
            </div>

            <input
              id="register-confirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              minLength={6}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* PASSWORD ERROR */}

          {passwordError && (
            <div className="password-error">{passwordError}</div>
          )}
        </div>

        {/* =========================================
            TERMS
        ========================================= */}

        <label className="terms">
          <input type="checkbox" required />

          <span>
            I agree to the <button type="button">Terms & Conditions</button> and{" "}
            <button type="button">Privacy Policy</button>
          </span>
        </label>

        {/* =========================================
            CREATE ACCOUNT
        ========================================= */}

        <button
          type="submit"
          className="primary-button"
          disabled={
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            Boolean(dobError)
          }
        >
          Create account
        </button>

        {/* =========================================
            LOGIN
        ========================================= */}

        <div className="switch-account">
          <span>Already have an account?</span>

          <button type="button" onClick={() => setActiveTab("login")}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
