import { useState } from "react";
import axios from "axios";

export default function ReminderForm() {
  const maxLength = 300;
  const [form, setForm] = useState({
    name: localStorage.getItem("logggedInUser") || "N/A",
    email: localStorage.getItem("logggedInUserEmail") || "N/A",
    message: "",
    priority: "normal",
  });

  const restrictedaccess = () => {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-[#DDFFF7] p-6">
          <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 text-center border-t-8 border-[#B2945B]">
            {/* Icon Container */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#93E1D8] p-4 rounded-full">
                <svg
                  className="w-12 h-12 text-[#462255]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* Message */}
            <h2 className="text-3xl font-bold text-[#462255] mb-2">
              Login to access
            </h2>
            <p className="text-[#898952] mb-8">
              This area is strictly for Logged in users. Please return to your
              dashboard or contact support if you believe this is an error.
            </p>

            {/* Action Button */}
            <button
              onClick={() => window.history.back()}
              className="w-full py-3 px-6 bg-[#B2945B] hover:bg-[#898952] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1"
            >
              Return to Previous Page
            </button>
          </div>
        </div>
      </>
    );
  };

  const user = localStorage.getItem("logggedInUser");
  const email = localStorage.getItem("logggedInUserEmail");
  const token = localStorage.getItem("token");

  if (!token || !user || !email) {
    return restrictedaccess();
  }

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("logggedInUserEmail");

    try {
      const tokenforBackend = localStorage.getItem("token");
      const response = await axios.post(
        "https://notifynest-2.onrender.com/AddReminderMain/AddReminders",
        form,
        {
          headers: {
            Authorization: `Bearer ${tokenforBackend}`,
          },
        },
      );
      alert(`Reminder saved for ${form.name}!`);
      setForm({
        name: "",
        email: "",
        message: "",
        priority: "normal",
      });
    } catch (err) {
      alert("Failed to insert data");
    }
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();
  const charWarn = form.message.length > maxLength * 0.8;

  const inputClass =
    "w-full box-border px-[14px] py-[11px] text-[14px] text-[#462255] bg-[#F5EFF8] border-[1.5px] border-transparent rounded-[10px] outline-none transition-all duration-200 placeholder:text-[#9B6BAE] placeholder:font-light focus:bg-white focus:border-[#93E1D8] focus:shadow-[0_0_0_3px_rgba(147,225,216,0.25)] appearance-none font-['DM_Sans',sans-serif]";
  const EmailinputClass =
    "w-full box-border px-[14px] py-[11px] text-[14px] text-[#462255] bg-[#F5EFF8] border-[1.5px] border-transparent rounded-[10px] outline-none transition-all duration-200 placeholder:text-[#9B6BAE] placeholder:font-light focus:bg-white focus:border-[#93E1D8] focus:shadow-[0_0_0_3px_rgba(147,225,216,0.25)] appearance-none font-['DM_Sans',sans-serif]";
  const labelClass =
    "block text-[11px] font-medium tracking-[0.08em] uppercase mb-[6px] text-[#898952]";

  const pillClass = (val) => {
    const base =
      "flex-1 py-[9px] px-[6px] rounded-[10px] text-[12px] font-medium cursor-pointer border-[1.5px] transition-all duration-[180ms] text-center tracking-[0.01em] font-['DM_Sans',sans-serif]";
    if (form.priority !== val)
      return `${base} border-transparent bg-[#F5EFF8] text-[#6B3580] hover:border-[#93E1D8] hover:text-[#462255]`;
    if (val === "normal")
      return `${base} bg-[#93E1D8] border-[#5FBFB4] text-[#462255]`;
    if (val === "important")
      return `${base} bg-[rgba(178,148,91,0.18)] border-[#B2945B] text-[#8C7040]`;
    return `${base} bg-[rgba(70,34,85,0.08)] border-[#462255] text-[#462255]`;
  };

  return (
    <>
      {/* Google Fonts — Required for typography styles */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Outer Wrapper */}
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#DDFFF7] font-['DM_Sans',sans-serif]">
        {/* Card Body */}
        <div className="w-full max-w-[420px] bg-white rounded-[20px] overflow-hidden shadow-[0_8px_40px_rgba(70,34,85,0.14),0_2px_8px_rgba(70,34,85,0.08)]">
          {/* ── Header ── */}
          <div className="relative overflow-hidden px-8 pt-8 pb-[1.6rem] bg-[#462255]">
            {/* Orbs */}
            <div className="absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full bg-[rgba(147,225,216,0.12)] pointer-events-none" />
            <div className="absolute -bottom-5 right-10 w-[70px] h-[70px] rounded-full bg-[rgba(178,148,91,0.15)] pointer-events-none" />

            {/* Notification Icon Frame */}
            <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center mb-4 bg-[rgba(147,225,216,0.2)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#93E1D8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>

            <h2 className="text-[26px] font-semibold text-white mb-1 tracking-[0.01em] leading-[1.2] m-0 font-['Cormorant_Garamond',serif]">
              Add Reminder
            </h2>
            <p className="text-[13px] font-light tracking-[0.02em] m-0 text-[rgba(221,255,247,0.65)]">
              Schedule a notification for someone
            </p>
          </div>

          {/* ── Body ── */}
          <form onSubmit={handleSubmit}>
            <div className="px-8 pt-7 pb-8 flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className={labelClass}>Full name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className={EmailinputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Reminder message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your reminder…"
                  maxLength={maxLength}
                  className={`${inputClass} resize-none h-24 leading-relaxed`}
                />
                <div className="flex justify-end mt-[10px]">
                  <span
                    className={`text-[11px] font-normal transition-colors duration-200 ${charWarn ? "text-[#c0552a]" : "text-[#898952]"}`}
                  >
                    {form.message.length}/{maxLength}
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <span className={labelClass}>Priority</span>
                <div className="flex gap-2">
                  {["normal", "important", "urgent"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={pillClass(p)}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, priority: p }))
                      }
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px -mx-8 bg-gradient-to-r from-transparent via-[rgba(70,34,85,0.1)] to-transparent" />

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-[13px] border-none rounded-[10px] text-[14px] font-medium tracking-[0.04em] transition-all duration-200 font-['DM_Sans',sans-serif] ${
                  isValid
                    ? "text-white bg-[#B2945B] shadow-[0_4px_16px_rgba(178,148,91,0.35)] cursor-pointer hover:bg-[#8C7040] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(178,148,91,0.4)] active:translate-y-0"
                    : "bg-[#e8e4ec] text-[#9B6BAE] cursor-not-allowed"
                }`}
              >
                Save Reminder
              </button>
            </div>
          </form>

          {/* ── Footer ── */}
          <div className="px-8 pb-6 flex items-center gap-[6px]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#93E1D8]" />
            <span className="text-[11px] font-light tracking-[0.02em] text-[#898952]">
              Notifications sent via email
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
