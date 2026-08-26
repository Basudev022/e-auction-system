import { useState } from "react";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export default function LoginForm({ setActiveTab, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  /* =========================
     TEMPORARY SIGN IN
  ========================= */

  const handleLogin = (event) => {
    event.preventDefault();

    /*
     * TEMPORARY LOGIN
     *
     * No email/password checking.
     * No backend call.
     *
     * Simply tell App.jsx that
     * the user has logged in.
     */

    onLoginSuccess();
  };

  /* =========================
     GOOGLE LOGIN
  ========================= */

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  /* =========================
     FACEBOOK LOGIN
  ========================= */

  const handleFacebookLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  };

  return (
    <div className="auth-form-container">
      {/* =========================
          TITLE
      ========================= */}

      <div className="form-title">
        <h1>Sign in to your account</h1>

        <p>Enter your details to continue</p>
      </div>

      <form onSubmit={handleLogin}>
        {/* =========================
            EMAIL
        ========================= */}

        <div className="input-group">
          <label htmlFor="login-email">Email address</label>

          <div className="input-wrapper">
            <div className="input-icon">
              <Mail size={16} />
            </div>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
        </div>

        {/* =========================
            PASSWORD
        ========================= */}

        <div className="input-group">
          <label htmlFor="login-password">Password</label>

          <div className="input-wrapper">
            <div className="input-icon">
              <LockKeyhole size={15} />
            </div>

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            {/* SHOW / HIDE PASSWORD */}

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* =========================
            REMEMBER / FORGOT
        ========================= */}

        <div className="login-options">
          <label className="remember">
            <input type="checkbox" />

            <span>Remember me</span>
          </label>

          <button type="button" className="forgot-password">
            Forgot password?
          </button>
        </div>

        {/* =========================
            LOGIN BUTTON
        ========================= */}

        <button type="submit" className="primary-button">
          Sign in
        </button>

        {/* =========================
            DIVIDER
        ========================= */}

        <div className="divider">
          <span />

          <p>or continue with</p>

          <span />
        </div>

        {/* =========================
            GOOGLE / FACEBOOK
        ========================= */}

        <div className="social-buttons">
          {/* GOOGLE */}

          <button
            type="button"
            className="social-button"
            onClick={handleGoogleLogin}
          >
            <span className="google-logo">G</span>

            <span>Continue with Google</span>
          </button>

          {/* FACEBOOK */}

          <button
            type="button"
            className="social-button"
            onClick={handleFacebookLogin}
          >
            <span className="facebook-logo">f</span>

            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* =========================
            REGISTER LINK
        ========================= */}

        <div className="switch-account">
          <span>Don't have an account?</span>

          <button type="button" onClick={() => setActiveTab("register")}>
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
