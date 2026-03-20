import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { ChevronLeftIcon } from "../constants";

const NewPasswordPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addNotification } = useAppContext();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = state?.email;
  const otp = state?.otp;

useEffect(() => {
  if (!email || !otp) {
    navigate("/forgot-password");
  }
}, [email, otp, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      addNotification("Password must be at least 6 characters", "error");
      return;
    }

    if (password !== confirmPassword) {
      addNotification("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword: password
      });

      if (res.data?.success) {
        addNotification("Password reset successful", "success");
        navigate("/login", { state: { resetSuccess: true } });
      } else {
        addNotification("Reset failed", "error");
      }

    } catch (err:any) {
      addNotification(err.response?.data?.message || "Error", "error");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background-secondary)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Back Button */}
        <div className="flex justify-start">
          <Link
            to="/verify-email"
            className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-full px-5 py-2.5"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[var(--component-background)] p-8 sm:p-12 rounded-[3rem] border border-[var(--border-primary)] text-center shadow-none">
          
          {/* Heading */}
          <div className="space-y-2 mb-10">
            <h1 className="text-3xl font-extrabold tracking-tighter uppercase text-[var(--text-primary)]">
              Set New Password
            </h1>
            <p className="text-sm text-[var(--text-muted)] font-medium">
              Create a strong password to secure your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            
            {/* New Password */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 px-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="block w-full px-6 py-4 bg-[var(--background-tertiary)] border border-[var(--border-secondary)] rounded-full placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-[var(--text-primary)] transition-all font-medium h-14"
                placeholder="Enter new password"
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 px-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className="block w-full px-6 py-4 bg-[var(--background-tertiary)] border border-[var(--border-secondary)] rounded-full placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-[var(--text-primary)] transition-all font-medium h-14"
                placeholder="Confirm password"
                disabled={isLoading}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-6 button-gradient text-white font-black uppercase tracking-widest text-[10px] rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-50 h-14 items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Reset Password"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;