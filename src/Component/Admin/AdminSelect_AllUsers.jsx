import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSelect_AllUsers = () => {
  const navigate = useNavigate();

  // Session & User Data
  const [admins, setAdmins] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [all_users, setAll_users] = useState([]);

  // Interface Flags
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormPanel, setShowFormPanel] = useState(false);
  const [formMode, setFormMode] = useState("INSERT"); // "INSERT" or "UPDATE"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const [handleInsert, sethandleInsert] = useState("");
  // State tracking for tracking password visibility row-by-row
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Operation Routing State
  const [Operation, setOperation] = useState({
    Deleteid: "",
    email: "",
    Updateid: "",
    SelectId: "",
  });

  // Dual-Purpose State Buffer (For Insert & Update workloads including Passwords)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(token);
    if (!token) {
      setAdmins(false);
    }
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("logggedInUser");
    const email = localStorage.getItem("logggedInUserEmail");

    setUserName(name || "Root Admin");
    setUserEmail(email || "admin@system.local");

    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setNetworkError("");
      const token = localStorage.getItem("token");

      if (!token) {
        return restrictedAccess();
      }

      const response = await fetch(
        "https://notifynest-2.onrender.com/adminall_users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401 || response.status === 403) {
        // setAdmins(false);
        return restrictedAccess();
      }
      if (response.status === 404) {
        return restrictedAccess();
      }

      setAdmins(true);
      const result = await response.json();
      setAll_users(result?.usersData || result);
      if (response.status === 200) {
        setAdmins(true);
      }
    } catch (err) {
      if (err.response) {
        // Server responded with error
        if (err.response.status === 403) {
          setError("You are not authorized to add admin.");
        } else {
          setError(err.response.data.message || "Something went wrong");
        }
      } else {
        // Network/server issue
        setError("Server not responding");
      }
      setNetworkError(
        "Failed to fetch down current system users from data pipeline.",
      );
    }
  };

  const handleUpdate = async () => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      const url = `https://notifynest-2.onrender.com/adminall_users/AdminUpdateUsers/${Operation.Updateid}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert("User Updated Successfully");

      setAll_users((prev) =>
        prev.map((user) =>
          user._id === Operation.Updateid ? { ...user, ...formData } : user,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const restrictedAccess = () => {
    return (
      <>
        <div className="min-h-30 flex items-center justify-center bg-[#161613] p-6">
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
              Restricted Access
            </h2>
            <p className="text-[#898952] mb-8">
              This area is strictly for administrators. Please return to your
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

  // Synchronize Form input mutations
  const handleFormInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle Password text mask on individual rows
  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Configure UI workspace for inserting a record
  const handleOpenInsertMode = () => {
    setFormMode("INSERT");
    setFormData({
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    });
    setOperation((prev) => ({ ...prev, Updateid: "" }));
    setShowFormPanel(true);
  };

  // Configure UI workspace for modifying a record
  const handleOpenUpdateMode = (user) => {
    setFormMode("UPDATE");
    setOperation((prev) => ({ ...prev, Updateid: user._id }));
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: user.password || "", // Prefills the existing password context
      agreeTerms: user.agreeTerms || false,
    });
    setShowFormPanel(true);
  };

  // Combined Form Handler routing based on formMode state
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsSubmitting(true);

    try {
      if (formMode === "INSERT") {
        // --- INSERT NEW RECORD PIPELINE WITH PASSWORD ---
        const response = await fetch(
          "https://notifynest-2.onrender.com/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          },
        );

        const result = await response.json();
        if (response.ok) {
          fetchAllUsers();
          setShowFormPanel(false);
          alert("Record inserted successfully.");
        } else {
          alert(result.message || "Failed to commit insertion payload.");
        }
      } else {
        // --- UPDATE TARGET RECORD PIPELINE WITH PASSWORD ---
        if (!Operation.Updateid) return;
        const response = await fetch(
          `https://notifynest-2.onrender.com/adminall_users/${Operation.Updateid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password, // Pass along updated password field string
              agreeTerms: formData.agreeTerms,
            }),
          },
        );

        const data = await response.json();
        if (response.ok) {
          setAll_users((prev) =>
            prev.map((user) =>
              user._id === Operation.Updateid
                ? {
                    ...user,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    agreeTerms: formData.agreeTerms,
                  }
                : user,
            ),
          );
          setShowFormPanel(false);
          alert("Record updated successfully.");
        } else {
          alert(data.message || "Failed to sync updating profile adjustments.");
        }
      }
    } catch (err) {
      console.error("Operational pipeline error:", err);
      alert("Network communication error executing system write.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async () => {
    const token = localStorage.getItem("token");
    if (!Operation.Deleteid) {
      alert("Please Select Users Id / Something Went Wrong.");
      return;
    }

    try {
      const deletedata = await fetch(
        `https://notifynest-2.onrender.com/adminall_users/${Operation.Deleteid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await deletedata.json();
      if (deletedata.ok) {
        setAll_users((prev) =>
          prev.filter((data) => data._id !== Operation.Deleteid),
        );
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error("Failed to connect deletion pipelines:", err);
      alert("Network action failure.");
    }
  };

  const tokenLogin = localStorage.getItem("token");
  if (!tokenLogin) {
    return restrictedAccess();
  }

  return (
    <div className="min-h-screen bg-[#161613] text-[#DDFFF7] antialiased p-4 sm:p-6 lg:p-8">
      {admins ? (
        <>
          {/* HEADER CONTROL CONTAINER */}
          <div className="max-w-6xl mx-auto bg-[#20201a] border border-[#898952]/10 p-5 sm:p-6 rounded-2xl shadow-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#93E1D8] bg-[#93E1D8]/10 border border-[#93E1D8]/20 px-3 py-1 rounded-md">
                  Operational Session
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-[#93E1D8]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Account Control Hub
                </h1>

                <div className="mt-3 space-y-0.5 text-xs text-[#898952]">
                  <p>
                    <span className="font-semibold text-white/70">
                      Administrator:
                    </span>{" "}
                    {userName}
                  </p>
                  <p>
                    <span className="font-semibold text-white/70">
                      Endpoint:
                    </span>{" "}
                    {userEmail}
                  </p>
                </div>
              </div>

              <div className="sm:self-end">
                <button
                  type="button"
                  onClick={handleOpenInsertMode}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#93E1D8] text-[#161613] hover:brightness-105 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create New Target Record
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="max-w-6xl mx-auto mb-4 bg-red-950/20 border border-red-900/30 text-red-400 p-4 rounded-xl text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          )}

          {/* SYSTEM COMMUNICATION NOTIFIER BAR */}
          {networkError && (
            <div className="max-w-6xl mx-auto mb-4 bg-red-950/20 border border-red-900/30 text-red-400 p-4 rounded-xl text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {networkError}
            </div>
          )}

          {/* SPLIT WORKSPACE COMPONENT BODY */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* DATA ENTRIES COL */}
            <div
              className={`space-y-3 lg:col-span-${showFormPanel ? "2" : "3"}`}
            >
              {!admins ? (
                restrictedAccess()
              ) : !Array.isArray(all_users) ? (
                <>
                  <h1>Loading</h1>
                </>
              ) : all_users.length === 0 ? (
                <div className="text-center py-12 text-[#898952] text-xs bg-[#20201a] rounded-2xl border border-[#898952]/10">
                  No live data entries recorded inside registry streams.
                </div>
              ) : (
                all_users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-[#20201a] border border-[#898952]/10 p-4 sm:p-5 rounded-2xl hover:border-[#93E1D8]/30 transition duration-150 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#898952]">
                          <span className="bg-[#161613] px-2 py-0.5 rounded border border-[#898952]/10 select-all">
                            ID: {user._id}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white flex items-center gap-2 truncate group-hover:text-[#93E1D8] transition-colors">
                          {user.name}
                        </h3>

                        <p className="text-xs text-[#DDFFF7]/80 truncate">
                          {user.email}
                        </p>

                        {/* RENDERED REGISTERED PASSWORD VALUE DISPLAY */}
                        <div className="flex items-center gap-2 bg-[#161613] border border-[#898952]/10 px-2 py-1 rounded-lg w-fit max-w-full">
                          <span className="text-[10px] uppercase font-bold text-[#898952] tracking-wider select-none">
                            Pass:
                          </span>
                          <span className="text-xs font-mono text-[#93E1D8] tracking-wide break-all">
                            {visiblePasswords[user._id]
                              ? user.password || "No Key Assigned"
                              : "••••••••"}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user._id)}
                            className="text-[#898952] hover:text-white ml-2 transition focus:outline-none"
                            title={
                              visiblePasswords[user._id]
                                ? "Mask string Value"
                                : "Expose plaintext credentials"
                            }
                          >
                            {visiblePasswords[user._id] ? (
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center gap-2 pt-1 text-xs">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${user?.agreeTerms ? "bg-[#93E1D8]" : "bg-red-500"}`}
                          />
                          <span className="text-[#898952] text-[11px]">
                            Legal Parameters:{" "}
                            <span
                              className={
                                user?.agreeTerms
                                  ? "text-[#93E1D8]"
                                  : "text-red-400"
                              }
                            >
                              {user?.agreeTerms ? "Verified" : "Unsigned"}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* ACTION PANEL STRIP */}
                      <div className="flex sm:flex-col lg:flex-row items-center justify-end gap-2 shrink-0 pt-3 sm:pt-0 border-t border-[#898952]/10 sm:border-t-0">
                        <button
                          type="button"
                          onClick={() => handleOpenUpdateMode(user)}
                          className="flex items-center justify-center gap-1.5 bg-[#292921] border border-[#898952]/20 hover:border-[#93E1D8]/40 hover:text-[#93E1D8] text-[#DDFFF7] font-bold text-xs px-3 py-2 rounded-xl transition w-full sm:w-auto"
                        >
                          Modify
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOperation((prev) => ({
                              ...prev,
                              Deleteid: user._id,
                              email: user.email,
                            }));
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center justify-center gap-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 font-bold text-xs px-3 py-2 rounded-xl transition w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CONFIRM DELETION OVERLAY SCREEN MODAL */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-[#20201a] border border-[#898952]/20 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                <div className="flex items-center gap-3 text-red-400 mb-4">
                  <div className="bg-red-500/10 p-2 rounded-xl border border-red-500/20">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">
                      Destructive System Action
                    </h2>
                  </div>
                </div>

                <div className="bg-[#161613] border border-[#898952]/10 rounded-xl p-3 mb-4 space-y-1 font-mono text-xs">
                  <p className="text-[#898952]">
                    User ID:{" "}
                    <span className="text-white select-all">
                      {Operation?.Deleteid || "N/A"}
                    </span>
                  </p>
                  <p className="text-[#898952]">
                    User Email:{" "}
                    <span className="text-red-400 select-all">
                      {Operation?.email || "N/A"}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#898952] hover:text-white transition"
                  >
                    Abort
                  </button>
                  <button
                    type="button"
                    onClick={deleteUser}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition"
                  >
                    Confirm delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* THE SHARED INSERT/UPDATE MODAL */}
          {showFormPanel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-[#20201a] border border-[#898952]/20 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
                <h2 className="text-lg font-black text-white mb-6">
                  {isEditing
                    ? "Modify Existing Record"
                    : "Create New Target Record"}
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#898952]">
                      Full Name
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#161613] border border-[#898952]/20 rounded-xl p-3 text-sm text-white focus:border-[#93E1D8] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#898952]">
                      Email / Endpoint
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#161613] border border-[#898952]/20 rounded-xl p-3 text-sm text-white focus:border-[#93E1D8] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#898952]">
                      Access Key
                    </label>
                    <input
                      required
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full bg-[#161613] border border-[#898952]/20 rounded-xl p-3 text-sm text-white focus:border-[#93E1D8] outline-none transition"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowFormPanel(false)}
                      className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-[#898952] hover:text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#93E1D8] text-[#161613] font-bold text-xs hover:brightness-105 transition"
                    >
                      {isEditing ? "Commit Changes" : "Deploy Record"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        restrictedAccess()
      )}
    </div>
  );
};

export default AdminSelect_AllUsers;
