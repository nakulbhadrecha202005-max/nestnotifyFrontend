import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAdd = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [adminUserData, setAdminUserData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/superadmin/add-admin",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      //console.log(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [admins, setAdmins] = useState([]);
  ``;
  const get_all_admins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/allAdminListfetch", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setIsUnauthorized(true); // Trigger the unauthorized state
      } else {
        setMessage(err.response?.data?.message || "Failed to fetch admin data");
      }
    }
  };

  if (isUnauthorized) {
    return (
      <>
        <div className="min-h-screen bg-[#DDFFF7] flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#462255] border border-[#B2945B]/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="bg-[#DDFFF7] w-16 h-16 flex items-center justify-center rounded-xl mx-auto mb-6">
              <span className="material-symbols-outlined text-[#462255] text-4xl">
                lock_person
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#DDFFF7] mb-3">
              Unauthorized Access
            </h2>
            <p className="text-[#DDFFF7]/80 text-sm mb-6">
              You do not have the required permissions to view this dashboard.
            </p>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full py-3 bg-[#B2945B] hover:bg-[#898952] text-[#462255] font-bold rounded-xl transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#93E1D8] flex items-center justify-center px-4 antialiased selection:bg-[#B2945B]/25">
      <div className="w-full max-w-md bg-[#20201a]/75 border border-[#898952]/30 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
        {/* Top Structural Trim */}

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-[#DDFFF7] border border-[#898952]/30 p-4 rounded-xl mb-4 text-[#B2945B]">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z"
              />
            </svg>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#DDFFF7] bg-[#161613] border border-[#898952]/40 px-3 py-1 rounded-md mb-2">
            Access Control Pipeline
          </span>

          <h2 className="text-xl font-black tracking-tight text-[#B2945B]">
            Provision New Admin
          </h2>

          <p className="text-xs text-[#DDFFF7] mt-1.5 max-w-[240px] leading-relaxed">
            Grant secure database privileges via destination email assignment.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#898952]">
              Authorized Routing Email
            </label>

            <div className="flex items-center bg-[#161613] border border-[#898952]/30 rounded-xl px-3.5 py-3 focus-within:border-[#DDFFF7] transition-colors duration-200">
              <span className="text-[#DDFFF7] mr-3 shrink-0">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615m19.5 0A2.25 2.25 0 0018.808 6.5H5.192a2.25 2.25 0 00-1.058.25"
                  />
                </svg>
              </span>

              <input
                type="email"
                placeholder="identity@domain.internal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-xs text-[#DDFFF7] placeholder-[#DDFFF7]/60"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B2945B] hover:bg-[#898952] text-[#161613] hover:text-[#161613] py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200"
          >
            {!loading && (
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}

            {loading ? "Injecting Credentials..." : "Authorize Admin"}
          </button>
        </form>

        {/* Message Terminal Box */}
        {message && (
          <div className="mt-5 bg-[#292921] border border-[#898952]/30 rounded-xl p-3 text-center">
            <p className="text-xs font-medium text-[#B2945B] leading-relaxed">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAdd;
