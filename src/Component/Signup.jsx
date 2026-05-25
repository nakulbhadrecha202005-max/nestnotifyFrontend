import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigation = useNavigate();
  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  // UI States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.name.length < 3) newErrors.name = "Name is too short.";
    else if (formData.name.length > 20)
      newErrors.name = "Name must not exceed 20 characters..";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email required.";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters.";
    else if (formData.password.length > 20) {
      newErrors.password = "Password must not exceed 20 characters.";
    }
    if (!formData.agreeTerms) newErrors.terms = "Please accept terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    try {
      const url = "https://notifynest-2.onrender.com/ auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        //alert("Succcess");
        navigation("/login");
      }
      if (!response.ok) {
        if (errors) {
          setErrors(
            "Error Backend" + errors.map((err) => err.message).join("\n"),
          );
        } else {
          setErrors("Error Backend : " + message);
        }
        return;
      }
      //alert("Signup successful");
      navigation("/login");
      //console.log(result);
    } catch (err) {
      setErrors("Something Went Wrong : " + err);
    }
  };

  return (
    <div className="min-h-screen bg-[#DDFFF7] flex items-center justify-center p-4 font-sans">
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
                Bill<span className="text-[#B2945B]">Wise</span>
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-[1.2] mb-6">
              Start your journey to <br />
              <span className="text-[#93E1D8]">financial freedom.</span>
            </h2>
            <p className="text-[#DDFFF7]/80 text-lg">
              Join thousands of professionals managing their assets with
              absolute clarity and bank-grade security.
            </p>
          </div>

          <div className="relative z-10 p-6 rounded-2xl bg-[#93E1D8]/10 border border-[#B2945B]/30 backdrop-blur-sm">
            <p className="text-sm text-[#B2945B] font-bold mb-2 uppercase tracking-widest">
              Join Today
            </p>
            <p className="text-xs text-[#DDFFF7]/90 leading-relaxed">
              Create your account in seconds and get a free 14-day trial of all
              premium features.
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: SIGNUP FORM --- */}
        <div className="p-8 md:p-14 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-[#462255] mb-2">
              Create Account
            </h1>
            <p className="text-[#898952]">Get started with your dashboard.</p>
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
                {errors.name && <p>Name : {errors.name}</p>}
                {errors.email && <p>Email : {errors.email}</p>}
                {errors.password && <p>Password : {errors.password}</p>}
                {errors.terms && <p>Terms : {errors.terms}</p>}
              </div>
              <button
                onClick={() => setErrors("")}
                className="text-[#462255] hover:text-[#B2945B]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#462255] ml-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-[#93E1D8] text-xl">
                  person
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#DDFFF7] border border-[#93E1D8] rounded-2xl focus:outline-none focus:border-[#B2945B] focus:ring-1 focus:ring-[#B2945B]"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-[#462255]">
                  Email Address
                </label>
                <span className="text-[10px] text-[#898952] font-semibold italic">
                  Use a working email for notifications
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-[#93E1D8] text-xl">
                  mail
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#DDFFF7] border border-[#93E1D8] rounded-2xl focus:outline-none focus:border-[#B2945B] focus:ring-1 focus:ring-[#B2945B]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#462255] ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-[#93E1D8] text-xl">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#DDFFF7] border border-[#93E1D8] rounded-2xl focus:outline-none focus:border-[#B2945B] focus:ring-1 focus:ring-[#B2945B]"
                />
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

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 accent-[#462255] cursor-pointer"
              />
              <span className="text-sm text-[#898952]">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-[#462255] font-bold hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-[#462255] font-bold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#462255] hover:bg-[#B2945B] text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 mt-4"
            >
              <span>Create Account</span>
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[#898952] text-sm font-medium">
              Already have an account?
              <Link
                to="/login"
                className="text-[#462255] font-bold hover:underline ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
