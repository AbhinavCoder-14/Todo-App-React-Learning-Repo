import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import * as yup from "yup";
import { UNSAFE_ErrorResponseImpl } from "react-router-dom";
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

  // Yup validation schemas
  // const loginSchema = true;
  // const loginSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("Please enter a valid email")
  //     .required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(6, "Password must be at least 6 characters")
  //     .required("Password is required"),
  // });
  const signupSchema =  true;
  // const signupSchema = yup.object().shape({
  //   name: yup
  //     .string()
  //     .min(2, "Name must be at least 2 characters")
  //     .required("Name is required"),
  //   email: yup
  //     .string()
  //     .email("Please enter a valid email")
  //     .required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(6, "Password must be at least 6 characters")
  //     .required("Password is required"),
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref("password"), null], "Passwords must match")
  //     .required("Please confirm your password"),
  // });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing...
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

    const isValid = await validateForm();
    if (!isValid) return console.log("Form validation failed");

    setIsLoading(true);

    // Simulate API call

    if (isLogin) {
      try {
        const { data } = await axios.post(
          `${API_URL}/user/login`,
          {
            email: formData.email.toString(),
            password: formData.password.toString(),
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(data);
        setIsLoading(false);
        console.log("Login success and cookie has been generated");
        if (data.token) {
          window.location.href = "/todo";
        }
      } catch (error) {
        console.log(`login failed ${error}`);
      }
    }

    if (!isLogin) {
      try {
        const { data } = await axios.post(
          `${API_URL}/user/signup`,
          {
            email: formData.email.toString(),
            password: formData.password.toString(),
            fullName: formData.name.toString(),
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(data);
        setIsLoading(false);
        console.log("Login success and cookie has been generated");
        if (data.status == "success") {
          setIsLogin(!isLogin);
        }
      } catch (error) {
        console.log(`login failed ${error}`);
      }
    }
  };
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

const handleLogin = () => {};

return (
  <div style={styles.container}>
    <div style={styles.card}>
      {/* Header */}
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

      {/* Form */}
      <div style={styles.form}>
        {/* Name field (only for signup) */}
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

        {/* Email field */}
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

        {/* Password field */}
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
              {showPassword ? (
                <EyeOff style={styles.eyeIcon} />
              ) : (
                <Eye style={styles.eyeIcon} />
              )}
            </button>
          </div>
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        {/* Confirm Password field (only for signup) */}
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
                {showConfirmPassword ? (
                  <EyeOff style={styles.eyeIcon} />
                ) : (
                  <Eye style={styles.eyeIcon} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p style={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>
        )}

        {/* Forgot Password (only for login) */}
        {isLogin && (
          <div style={styles.forgotPassword}>
            <button type="button" style={styles.forgotButton}>
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            ...styles.submitButton,
            ...(isLoading ? styles.submitButtonDisabled : {}),
          }}
        >
          {isLoading ? (
            <div style={styles.spinner}></div>
          ) : (
            <>
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight style={styles.arrowIcon} />
            </>
          )}
        </button>
      </div>

      {/* Toggle Mode */}
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

      {/* Social Login Options */}
      <div style={styles.socialSection}>
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerText}>
            <span style={styles.dividerSpan}>Or continue with</span>
          </div>
        </div>

        <div style={styles.socialButtons}>
          <button type="button" style={styles.socialButton}>
            <svg style={styles.socialIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button type="button" style={styles.socialButton}>
            <svg
              style={styles.socialIcon}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
);

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
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
    gap: "24px",
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
    display: "flex",
    alignItems: "center",
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
    padding: "12px 48px 12px 48px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.6)",
    transition: "color 0.2s ease",
  },
  eyeIcon: {
    width: "20px",
    height: "20px",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "12px",
    margin: "0",
  },
  forgotPassword: {
    textAlign: "right",
  },
  forgotButton: {
    background: "none",
    border: "none",
    color: "rgba(168, 85, 247, 0.8)",
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.2s ease",
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
    transform: "scale(1)",
  },
  submitButtonDisabled: {
    opacity: "0.5",
    cursor: "not-allowed",
    transform: "scale(1)",
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
    marginTop: "32px",
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
    color: "rgba(168, 85, 247, 0.8)",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "8px",
    transition: "color 0.2s ease",
  },
  socialSection: {
    marginTop: "24px",
  },
  divider: {
    position: "relative",
    marginBottom: "16px",
  },
  dividerLine: {
    position: "absolute",
    top: "50%",
    left: "0",
    right: "0",
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    fontSize: "14px",
  },
  dividerSpan: {
    padding: "0 8px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.8)",
  },
  socialButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "14px",
    gap: "8px",
  },
  socialIcon: {
    width: "20px",
    height: "20px",
  },
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input:focus {
    border-color: #a855f7 !important;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2) !important;
  }
  
  button:hover {
    transform: scale(1.05) !important;
  }
  
  .social-button:hover {
    background-color: rgba(255, 255, 255, 0.05) !important;
  }
  
  .forgot-button:hover {
    color: rgba(168, 85, 247, 1) !important;
  }
  
  .toggle-button:hover {
    color: rgba(168, 85, 247, 1) !important;
  }
  
  .eye-button:hover {
    color: white !important;
  }
`;
document.head.appendChild(styleSheet);

export default AuthPage;
