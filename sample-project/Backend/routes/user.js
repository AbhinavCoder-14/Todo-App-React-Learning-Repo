import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import * as yup from "yup";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- Yup validation schemas (UNCOMMENTED) ---
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const signupSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = async () => {
    try {
      const schema = isLogin ? loginSchema : signupSchema;
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Validation call (UNCOMMENTED) ---
    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);

    if (isLogin) {
      // --- Login Logic ---
      try {
        const { data } = await axios.post(
          `${API_URL}/user/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true, // Necessary for cookies
            headers: { "Content-Type": "application/json" },
          }
        );

        setIsLoading(false);
        console.log("Login successful:", data);

        // --- Redirect on successful login ---
        window.location.href = "/todo";

      } catch (error) {
        setIsLoading(false);
        console.error("Login failed:", error.response?.data?.message || error.message);
        // Optionally, set an error message to display to the user
        setErrors({ form: error.response?.data?.message || "Login failed. Please try again." });
      }
    } else {
      // --- Signup Logic ---
      try {
        const { data } = await axios.post(
          `${API_URL}/user/signup`,
          {
            fullName: formData.name,
            email: formData.email,
            password: formData.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setIsLoading(false);
        console.log("Signup successful:", data);
        
        // --- Switch to login mode on successful signup ---
        setIsLogin(true);
        // Optionally, show a success message before switching

      } catch (error) {
        setIsLoading(false);
        console.error("Signup failed:", error.response?.data?.message || error.message);
        setErrors({ form: error.response?.data?.message || "Signup failed. Please try again." });
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <User style={styles.icon} />
          </div>
          <h2 style={styles.title}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={styles.subtitle}>
            {isLogin ? "Sign in to your account" : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
           {errors.form && <p style={{ ...styles.error, textAlign: 'center' }}>{errors.form}</p>}
          {!isLogin && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputContainer}>
                <User style={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p style={styles.error}>{errors.name}</p>}
            </div>
          )}

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputContainer}>
              <Mail style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <Lock style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
              </button>
            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          {!isLogin && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputContainer}>
                <Lock style={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
                </button>
              </div>
              {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{ ...styles.submitButton, ...(isLoading ? styles.submitButtonDisabled : {}) }}
          >
            {isLoading ? (
              <div style={styles.spinner}></div>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight style={styles.arrowIcon} />
              </>
            )}
          </button>
        </form>

        <div style={styles.toggleSection}>
          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              style={styles.toggleButton}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (no changes needed here) ---
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "32px",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  iconContainer: {
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  icon: {
    width: "32px",
    height: "32px",
    color: "white",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    margin: "0 0 8px",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
  },
  inputContainer: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    color: "rgba(255, 255, 255, 0.6)",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "12px 12px 12px 48px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  eyeButton: {
    position: "absolute",
    right: "0px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "12px",
    color: "rgba(255, 255, 255, 0.6)",
  },
  eyeIcon: {
    width: "20px",
    height: "20px",
  },
  error: {
    color: "#ffcdd2",
    fontSize: "12px",
    margin: "0",
  },
  submitButton: {
    width: "100%",
    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "8px"
  },
  submitButtonDisabled: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  arrowIcon: {
    width: "20px",
    height: "20px",
  },
  toggleSection: {
    marginTop: "24px",
    textAlign: "center",
  },
  toggleText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    margin: "0",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#d8b4fe",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "8px",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(0,0,0,0.1) inset !important;
    -webkit-text-fill-color: white !important;
  }
  input:focus {
    border-color: #a855f7 !important;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.3) !important;
  }
`;
document.head.appendChild(styleSheet);

export default AuthPage;