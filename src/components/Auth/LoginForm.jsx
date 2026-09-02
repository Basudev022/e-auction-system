import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { loginUser } from "../../api/auth/authApi";

import {
  clearAuthError,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/slices/authSlice";

export default function LoginForm({ setActiveTab, onLoginSuccess }) {
  const dispatch = useDispatch();

  const { isLoading, error, registeredUser } = useSelector(
    (state) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
   * =========================
   * PREFILL REGISTERED EMAIL
   * =========================
   *
   * After registration, RegisterForm stores
   * the registered user in Redux.
   *
   * We use the registered email here.
   */
  useEffect(() => {
    if (registeredUser?.email) {
      setEmail(registeredUser.email);
    }
  }, [registeredUser]);

  /*
   * =========================
   * LOGIN
   * =========================
   */

  const handleLogin = async (event) => {
    event.preventDefault();

    /*
     * Check required fields
     */
    if (!email.trim() || !password) {
      dispatch(loginFailure("Email and password are required."));
      return;
    }

    /*
     * Start loading
     */
    dispatch(loginStart());

    try {
      /*
       * Login request data
       */
      const loginData = {
        email: email.trim(),
        password: password,
      };

      console.log("========== LOGIN REQUEST ==========");
      console.log("Email:", loginData.email);
      console.log("===================================");

      /*
       * Call Spring Boot login API
       */
      const response = await loginUser(loginData);

      /*
       * Login successful
       */
      console.log("========== LOGIN SUCCESS ==========");
      console.log("Response:", response);
      console.log("===================================");

      /*
       * Save token + user information
       * into Redux and localStorage.
       */
      dispatch(loginSuccess(response));

      /*
       * Tell App.jsx that login succeeded.
       *
       * App.jsx will then display Dashboard.
       */
      onLoginSuccess();
    } catch (error) {
      /*
       * =========================
       * DETAILED LOGIN ERROR
       * =========================
       */

      console.error("========== LOGIN ERROR ==========");
      console.error("Error:", error);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
      console.error("Message:", error.message);
      console.error("=================================");

      /*
       * Default error message
       */
      let errorMessage = "Login failed.";

      /*
       * Get actual backend error
       */
      if (error.response?.data) {
        /*
         * Backend returned plain text
         */
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {

        /*
         * Backend returned:
         * {
         *   "message": "..."
         * }
         */
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {

        /*
         * Backend returned:
         * {
         *   "error": "..."
         * }
         */
          errorMessage = error.response.data.error;
        } else {

        /*
         * Backend returned another JSON object
         */
          errorMessage = JSON.stringify(error.response.data);
        }
      } else if (error.message) {

      /*
       * Network / Axios error
       */
        errorMessage = error.message;
      }

      /*
       * Save error in Redux
       */
      dispatch(loginFailure(errorMessage));
    }
  };

  /*
   * =========================
   * EMAIL CHANGE
   * =========================
   */

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (error) {
      dispatch(clearAuthError());
    }
  };

  /*
   * =========================
   * PASSWORD CHANGE
   * =========================
   */

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (error) {
      dispatch(clearAuthError());
    }
  };

  /*
   * =========================
   * GOOGLE LOGIN
   * =========================
   */

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  /*
   * =========================
   * FACEBOOK LOGIN
   * =========================
   */

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
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
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
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
            />

            {/* SHOW / HIDE PASSWORD */}

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* =========================
            ERROR MESSAGE
        ========================= */}

        {error && <div className="auth-error-message">{error}</div>}

        {/* =========================
            REMEMBER / FORGOT
        ========================= */}

        <div className="login-options">
          <label className="remember">
            <input type="checkbox" disabled={isLoading} />

            <span>Remember me</span>
          </label>

          <button type="button" className="forgot-password">
            Forgot password?
          </button>
        </div>

        {/* =========================
            LOGIN BUTTON
        ========================= */}

        <button type="submit" className="primary-button" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
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
            disabled={isLoading}
          >
            <span className="google-logo">G</span>

            <span>Continue with Google</span>
          </button>

          {/* FACEBOOK */}

          <button
            type="button"
            className="social-button"
            onClick={handleFacebookLogin}
            disabled={isLoading}
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

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            disabled={isLoading}
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
