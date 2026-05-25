import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const navigation = useNavigate();

  // Form States (Only Email & Password for Login)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // UI States
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [timeLeft, setTimeLeft] = useState(900);

  //set timer for 15 minutes if backend returns error
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing again
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Exact same validation rules as Signup
    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email required.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Min 6 characters required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBackendError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const url = "https://notifynest-2.onrender.com/ auth/login";
      //const url = "https://localhost:5000/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("API RESPONSE:", result);

      if (!response.ok) {
        if (result.error) {
          setBackendError(result.error.map((err) => err.message).join("\n"));
          setTimeLeft(900);
          return;
        } else {
          setBackendError(result.message);
        }

        return;
      }

      const { success, jwttoken, name } = result;

      const email = result.email || result.user?.email || "";

      if (success) {
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("logggedInUser", name);
        localStorage.setItem("logggedInUserEmail", email);

        navigation("/home");
      }
    } catch (err) {
      console.log(err);

      setBackendError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#DDFFF7] flex items-center justify-center p-4 font-sans -mt-20">
      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl shadow-[#462255]/10 overflow-hidden border border-[#93E1D8]">
        {/* --- LEFT SIDE: BRAND & TRUST --- */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#462255] text-white relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-16">
              <div className="w-10 h-10 rounded-xl bg-[#B2945B] flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[#462255] font-bold">
                  account_balance_wallet
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Never<span className="text-[#B2945B]">Forgot</span>
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-[1.2] mb-6">
              Take control of your <br />
              <span className="text-[#93E1D8]">financial future.</span>
            </h2>
            <p className="text-[#DDFFF7]/80 text-lg">
              Insert your bills, get timely reminders, and manage your liquidity
              with our intelligent engine.
            </p>
          </div>

          <div className="relative z-10 p-6 rounded-2xl bg-[#93E1D8]/10 border border-[#B2945B]/30 backdrop-blur-sm">
            <p className="text-sm text-[#B2945B] font-bold mb-2 uppercase tracking-widest">
              Security Note
            </p>
            <p className="text-xs text-[#DDFFF7]/90 leading-relaxed">
              We use bank-grade 256-bit encryption to ensure your bills and
              payment data remain private and secure.
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <div className="p-8 md:p-14 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-[#462255] mb-2">Sign In</h1>
            <p className="text-[#898952]">Welcome back to your dashboard.</p>
          </div>
          {/* --- ERROR MESSAGE BLOCK --- */}
          {Object.keys(errors).length > 0 && (
            <div
              className="flex items-start gap-3 p-4 mb-6 text-sm text-[#462255] bg-[#DDFFF7] border border-[#B2945B]/30 rounded-2xl animate-in fade-in duration-300"
              role="alert"
            >
              <span className="material-symbols-outlined text-[#B2945B]">
                error
              </span>
              <div className="flex-1">
                <span className="font-black block mb-0.5">
                  Registration Error
                </span>
                {errors.email && <p>Email : {errors.email}</p>}
                {errors.password && <p>Password : {errors.password}</p>}
              </div>
              <button
                onClick={() => setErrors("")}
                className="text-[#462255] hover:text-[#B2945B]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}

          {/* backend Errors */}
          {backendError && (
            <div
              className="flex items-start gap-3 p-4 mb-6 text-sm text-[#462255] bg-[#DDFFF7] border border-[#B2945B]/30 rounded-2xl animate-in fade-in duration-300"
              role="alert"
            >
              <span className="material-symbols-outlined text-[#B2945B]">
                error
              </span>
              <div className="flex-1">
                <span className="font-black block mb-0.5">Backend Error</span>
                <p>{backendError}</p>
              </div>
              <button
                onClick={() => setBackendError("")}
                className="text-[#462255] hover:text-[#B2945B]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#462255] ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-[#93E1D8] text-xl">
                  mail
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter currect working email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#DDFFF7] border border-[#93E1D8] rounded-2xl focus:outline-none focus:border-[#B2945B] focus:ring-1 focus:ring-[#B2945B]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-[#462255]">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-[11px] font-bold text-[#898952] hover:text-[#462255]"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative flex items-center">
                {/* Lock Icon */}
                <span className="material-symbols-outlined absolute left-4 text-[#93E1D8] text-xl">
                  lock
                </span>

                {/* Password Input */}
                <input
                  type={showPassword ? "text" : "password"} // Toggles visibility
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#DDFFF7] border border-[#93E1D8] rounded-2xl focus:outline-none focus:border-[#B2945B] focus:ring-1 focus:ring-[#B2945B] "
                />

                {/* Toggle Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#93E1D8] hover:text-[#462255] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#462255] hover:bg-[#B2945B] text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 mt-4"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined text-lg">login</span>
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[#898952] text-sm font-medium">
              New to BillWise?
              <Link
                to="/signup"
                className="text-[#462255] font-bold hover:underline ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
