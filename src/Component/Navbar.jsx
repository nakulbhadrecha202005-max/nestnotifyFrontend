import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNotifOpen, setIsMobileNotifOpen] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(true);

  const [sessionUserInfo, setSessionUserInfo] = useState("");
  const [sessionUserEmail, setSessionUserEmail] = useState("");

  useEffect(() => {
    setSessionUserInfo(localStorage.getItem("logggedInUser") || "");
    setSessionUserEmail(localStorage.getItem("logggedInUserEmail") || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("logggedInUser");
    localStorage.removeItem("logggedInUserEmail");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* MAIN TOP NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-[#DDFFF7]/90 backdrop-blur-md border-b border-[#93E1D8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* LEFT AREA: BRAND LOGO & DESKTOP LINKS */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Link
                to="/home"
                className="flex items-center gap-3 shrink-0 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#93E1D8] flex items-center justify-center shadow-sm group-hover:border-[#462255] transition-all duration-300">
                  <span className="material-symbols-outlined text-[#462255] text-xl group-hover:scale-110 transition-transform duration-300">
                    account_balance_wallet
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight text-[#462255] transition-colors duration-300">
                  Never<span className="text-[#B2945B]">Forgot</span>
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7">
                <Link
                  to="/home"
                  className="text-sm font-semibold text-[#462255] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/About"
                  className="text-sm font-medium text-[#462255]/70 hover:text-[#462255] transition-colors"
                >
                  About
                </Link>

                <Link
                  to="/Services"
                  className="text-sm font-medium text-[#462255]/70 hover:text-[#462255] transition-colors"
                >
                  Services
                </Link>
                {/* DESKTOP NOTIFICATIONS DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsNotifDropdownOpen(!isNotifDropdownOpen);
                      setIsProfileOpen(false);
                    }}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none ${
                      isNotifDropdownOpen
                        ? "text-[#462255] font-semibold"
                        : "text-[#462255]/70 hover:text-[#462255]"
                    }`}
                  >
                    Notifications
                    <span
                      className={`material-symbols-outlined text-xs transition-transform duration-200 ${isNotifDropdownOpen ? "rotate-180" : ""}`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isNotifDropdownOpen && (
                    <div className="absolute left-0 mt-4 w-64 bg-white border border-[#93E1D8] shadow-xl rounded-2xl py-2 z-[70] animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() =>
                          setIsNotificationActive(!isNotificationActive)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#462255] hover:bg-[#DDFFF7] transition-all"
                      >
                        <span className="font-medium">Status</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                            isNotificationActive
                              ? "bg-[#93E1D8] text-[#462255] border border-[#93E1D8]"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {isNotificationActive ? "Active" : "Inactive"}
                        </span>
                      </button>
                      <div className="h-px bg-[#93E1D8]/40 my-1" />
                      <Link
                        to="/AddReminders"
                        className="flex items-center px-4 py-2.5 text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-colors"
                      >
                        Add Notification
                      </Link>
                      <Link
                        to="/AdminReviewAllNotification"
                        className="flex items-center px-4 py-2.5 text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-colors"
                      >
                        Admin Review All Notification
                      </Link>
                      <Link
                        to="/UpdateNotification_Form"
                        className="flex items-center px-4 py-2.5 text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-colors"
                      >
                        User Review All Notification
                      </Link>
                      <Link
                        to="/AdminAdd"
                        className="flex items-center px-4 py-2.5 text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-colors"
                      >
                        AdminAdd
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-[#462255]/70 hover:text-[#462255] transition-colors"
                >
                  Signup / Login
                </Link>
              </div>
            </div>

            {/* RIGHT AREA: ACTION BUTTONS & USER SETTINGS */}
            <div className="flex items-center gap-3.5">
              <button className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 bg-[#462255] hover:bg-[#462255]/90 active:scale-95 text-[#DDFFF7] text-sm font-bold rounded-xl transition-all shadow-sm">
                <span className="material-symbols-outlined text-base font-bold">
                  add
                </span>
                <Link to="/addreminders">New Bill</Link>
              </button>

              {/* ACCOUNT MENU DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotifDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 p-1.5 rounded-xl border transition-all focus:outline-none ${
                    isProfileOpen
                      ? "bg-white border-[#462255] text-[#462255]"
                      : "bg-white border-[#93E1D8] hover:bg-[#DDFFF7]/50 text-[#462255]"
                  }`}
                >
                  <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-[#DDFFF7] border border-[#93E1D8] flex items-center justify-center text-[#462255]">
                    <span className="material-symbols-outlined text-lg">
                      person
                    </span>
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full transition-colors duration-300 ${
                        isNotificationActive ? "bg-[#B2945B]" : "bg-[#898952]"
                      }`}
                    />
                  </div>
                  <span
                    className={`material-symbols-outlined text-[#462255]/60 text-base hidden sm:inline transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white border border-[#93E1D8] shadow-xl rounded-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-[#93E1D8]/40">
                      <p className="text-[10px] font-bold text-[#B2945B] uppercase tracking-wider">
                        {sessionUserInfo || "Account"}
                      </p>
                      <p className="text-sm font-medium text-[#462255] truncate mt-0.5">
                        {sessionUserEmail || "No Email Bound"}
                      </p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        to="/Accountsettings"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-all"
                      >
                        <span className="material-symbols-outlined text-[#462255]/50 text-lg">
                          settings
                        </span>
                        Account Settings
                      </Link>
                      <Link
                        to="/AdminSelect_AllUsers"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-all"
                      >
                        <span className="material-symbols-outlined text-[#462255]/50 text-lg">
                          admin_panel_settings
                        </span>
                        Admin Panel
                      </Link>
                      <Link
                        to="/Fetchalladmindatamanage"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#462255]/80 hover:bg-[#DDFFF7] hover:text-[#462255] transition-all"
                      >
                        <span className="material-symbols-outlined text-[#462255]/50 text-lg">
                          list
                        </span>
                        Fetch All Admin Data
                      </Link>
                    </div>
                    <div className="p-1.5 mt-1 border-t border-[#93E1D8]/40">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all font-semibold"
                      >
                        <span className="material-symbols-outlined text-lg">
                          logout
                        </span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MOBILE HAMBURGER BUTTON */}
              <button
                className="md:hidden flex items-center justify-center p-2.5 rounded-xl border border-[#93E1D8] bg-white text-[#462255]/70 hover:text-[#462255] hover:bg-[#DDFFF7] transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="material-symbols-outlined text-xl">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#93E1D8] bg-[#DDFFF7] px-4 py-5 space-y-5 max-h-[calc(100vh-5rem)] overflow-y-auto pb-24 animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Main Links */}
            <div className="space-y-1">
              <Link
                to="/home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-[#462255] hover:bg-white"
              >
                Home
              </Link>
              <Link
                to="/About"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-medium text-[#462255]/80 hover:bg-white/60 hover:text-[#462255]"
              >
                About
              </Link>
              <Link
                to="/Services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-medium text-[#462255]/80 hover:bg-white/60 hover:text-[#462255]"
              >
                Services
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-medium text-[#462255]/80 hover:bg-white/60 hover:text-[#462255]"
              >
                Signup / Login
              </Link>
            </div>

            {/* ACCORDION MOBILE DROPDOWN FOR NOTIFICATIONS */}
            <div className="border-t border-[#93E1D8] pt-4">
              <button
                onClick={() => setIsMobileNotifOpen(!isMobileNotifOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium text-[#462255]/80 hover:bg-white"
              >
                <span>Notifications Panel</span>
                <span
                  className={`material-symbols-outlined text-sm transition-transform duration-200 ${isMobileNotifOpen ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </button>

              {isMobileNotifOpen && (
                <div className="mt-1.5 ml-2 pl-3 border-l border-[#93E1D8] space-y-0.5 bg-white/40 rounded-r-xl py-1.5">
                  <button
                    onClick={() =>
                      setIsNotificationActive(!isNotificationActive)
                    }
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#462255]/90 hover:bg-white rounded-lg"
                  >
                    <span>Toggle Status</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors duration-300 ${
                        isNotificationActive
                          ? "bg-[#93E1D8] text-[#462255] border border-[#93E1D8]"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {isNotificationActive ? "Active" : "Inactive"}
                    </span>
                  </button>
                  <Link
                    to="/AddReminders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[#462255]/70 hover:text-[#462255] rounded-lg hover:bg-white"
                  >
                    Add Notification
                  </Link>
                  <Link
                    to="/AdminReviewAllNotification"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[#462255]/70 hover:text-[#462255] rounded-lg hover:bg-white"
                  >
                    Admin Review All Notification
                  </Link>
                  <Link
                    to="/UpdateNotification_Form"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[#462255]/70 hover:text-[#462255] rounded-lg hover:bg-white"
                  >
                    User Review All Notification
                  </Link>
                  <Link
                    to="/AdminAdd"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[#462255]/70 hover:text-[#462255] rounded-lg hover:bg-white"
                  >
                    AdminAdd
                  </Link>
                  <Link
                    to="/Fetchalladmindatamanage"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-[#462255]/70 hover:text-[#462255] rounded-lg hover:bg-white"
                  >
                    Fetch All Admin Data
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Profile & Session Data Container */}
            <div className="border-t border-[#93E1D8] pt-4">
              <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-white/80 border border-[#93E1D8] rounded-xl">
                <div className="w-9 h-9 rounded-full bg-[#DDFFF7] border border-[#93E1D8] flex items-center justify-center text-[#462255] shrink-0">
                  <span className="material-symbols-outlined text-lg">
                    person
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#462255] truncate">
                    {sessionUserInfo || "User Account"}
                  </p>
                  <p className="text-xs text-[#B2945B] truncate mt-0.5">
                    {sessionUserEmail || "No Email Bound"}
                  </p>
                </div>
              </div>

              <div className="space-y-0.5">
                <Link
                  to="/Accountsettings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#462255]/70 hover:text-[#462255] hover:bg-white"
                >
                  <span className="material-symbols-outlined text-lg text-[#462255]/40">
                    settings
                  </span>
                  Account Settings
                </Link>
                <Link
                  to="/AdminSelect_AllUsers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#462255]/70 hover:text-[#462255] hover:bg-white"
                >
                  <span className="material-symbols-outlined text-lg text-[#462255]/40">
                    admin_panel_settings
                  </span>
                  Admin Panel
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                  Sign Out
                </button>
              </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-1">
              <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#462255] text-[#DDFFF7] font-bold text-base rounded-xl shadow-md">
                <Link to="/AddReminders">
                  <span className="material-symbols-outlined text-base font-black">
                    add
                  </span>
                  New Bill{" "}
                </Link>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* FREQUENTLY USED USER LINKS (Sticky Mobile Bottom Utility Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#DDFFF7]/95 backdrop-blur-lg border-t border-[#93E1D8] px-4 py-2.5 shadow-lg flex justify-around items-center">
        <Link
          to="/home"
          className="flex flex-col items-center gap-0.5 text-[#462255]/60 hover:text-[#462255] transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </Link>

        {/* Payment / PhonePe Simulation Link */}
        <Link
          to="/payments"
          className="flex flex-col items-center gap-0.5 text-[#462255]/60 hover:text-[#462255] transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-xl">
            account_balance
          </span>
          <span className="text-[10px] font-medium tracking-wide">
            Pay Bills
          </span>
        </Link>

        {/* Center Utility Highlight Button */}
        <div className="relative w-12 h-12 flex items-center justify-center mt-0">
          <button className="absolute w-12 h-12 bg-[#462255] rounded-full text-[#DDFFF7] shadow-md active:scale-90 transition-transform flex items-center justify-center">
            <Link to="/AddReminders">
              <span className="material-symbols-outlined text-2xl font-bold">
                add
              </span>
            </Link>
          </button>
        </div>

        <Link
          to="/UpdateNotification_Form"
          className="flex flex-col items-center gap-0.5 text-[#462255]/60 hover:text-[#462255] transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-xl">
            notifications_active
          </span>
          <span className="text-[10px] font-medium tracking-wide">
            Reminders
          </span>
        </Link>

        <Link
          to="/Accountsettings"
          className="flex flex-col items-center gap-0.5 text-[#462255]/60 hover:text-[#462255] transition-colors duration-200"
        >
          <span className="material-symbols-outlined text-xl">
            manage_accounts
          </span>
          <span className="text-[10px] font-medium tracking-wide">Profile</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
