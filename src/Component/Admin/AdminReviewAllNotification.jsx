import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReviewAllNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Simple Editing States
  const [editingId, setEditingId] = useState(null);
  // ADDED: priority to editFormData
  const [editFormData, setEditFormData] = useState({
    message: "",
    priority: "",
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://notifynest-2.onrender.com/AllNotification",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(res.data);
      if (res.data.message) {
        setError(res.data.message);
      }
      if (res.data.notifications) {
        setNotifications(res.data.notifications);
      } else {
        setError("No Right of Admin.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized Access");
      } else {
        // setError(
        //   "Failed to sync notifications Or Restricted Access You dont have privilage to Access Admin page. Please refresh.",
        // );
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://notifynest-2.onrender.com/AllNotification/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications(notifications.filter((item) => item._id !== deleteId));
      setShowModal(false);
    } catch (err) {
      // console.error(err);
      alert("Unable to remove notification.");
    }
  };

  // UPDATED: Now sets the priority from the item
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditFormData({
      message: item.message,
      priority: item.priority || "Normal",
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = async (id) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const existingItem = notifications.find((item) => item._id === id);

      const updatedPayload = {
        ...existingItem,
        message: editFormData.message,
        priority: editFormData.priority,
        isActive: editFormData.isActive, // ADDED: priority to payload
      };

      await axios.patch(
        `https://notifynest-2.onrender.com/AllNotification/${id}`,
        updatedPayload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNotifications(
        notifications.map((item) => (item._id === id ? updatedPayload : item)),
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query) ||
      item.isActive?.toLowerCase().includes(query)
    );
  });

  const getPriorityStyles = (priority) => {
    switch (priority?.toLowerCase()) {
      case "urgent":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "important":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-teal-500/20 text-teal-300 border-teal-500/40";
    }
  };

  // ... (Keep loading and error JSX the same as your original)

  return (
    <main className="min-h-screen bg-[#161613] text-[#DDFFF7] antialiased selection:bg-[#93E1D8]/20 selection:text-[#DDFFF7]">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
        {/* HEADER CONFIGURATION */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#898952]/20 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#93E1D8] bg-[#93E1D8]/10 border border-[#93E1D8]/20 px-3 py-1 rounded-md">
              System Administrator Hub
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-2">
              Updates & Live Alerts
            </h1>
          </div>

          {/* SEARCH INPUT BAR */}
          <div className="flex items-center gap-3 w-full md:w-auto max-w-sm">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#898952]">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Scan across database streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#20201a] text-white placeholder-[#898952]/60 text-xs rounded-xl pl-10 pr-4 py-3 border border-[#898952]/20 focus:outline-none focus:border-[#93E1D8]/50 transition-colors"
              />
            </div>
          </div>
        </header>

        {/* ERROR SCREEN ALERT ROUTER */}
        {error && (
          <div
            className="mb-6 flex flex-row items-start gap-3 bg-red-950/20 border border-red-900/30 text-red-200 text-xs rounded-xl p-4 shadow-md backdrop-blur-sm"
            role="alert"
          >
            <div className="flex-shrink-0 text-red-400 bg-red-500/10 p-1 rounded-md mt-0.5">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white tracking-wide text-xs sm:text-sm">
                {error}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* DATA CONTAINER AREA */}
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-[#20201a] border border-[#898952]/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[#898952]">
              No entries found matching parameters
            </h3>
          </div>
        ) : (
          /* HIGH EFFICIENCY MASS STREAM CONTENT HOLDER */
          <div className="  p-2 sm:p-4 space-y-2">
            {/* INLINE STREAM ENTRIES */}
            {filteredNotifications.map((item) => (
              <div
                key={item._id}
                className="bg-[#292921] rounded-xl border border-[#898952]/10 p-4 transition-all duration-150 hover:border-[#93E1D8]/30 hover:bg-[#323229] group relative"
              >
                {editingId === item._id ? (
                  /* HIGH DENSITY EXPANDED DATA INLINE EDITOR */
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#898952]/10">
                      <div>
                        <div className="text-[10px] font-bold text-[#93E1D8] uppercase tracking-wider">
                          Modifying Workspace Record
                        </div>
                        <span className="text-xs text-white/80 font-mono select-all">
                          {item._id}
                        </span>
                      </div>

                      {/* COMBINED META CONTROLS (PRIORITY & INSTAGRAM TOGGLE) */}
                      <div className="flex flex-wrap items-center gap-4">
                        {/* INLINE STATUS LEVEL TOGGLES */}
                        <div className="flex items-center gap-1.5 bg-[#161613] p-1 rounded-lg border border-[#898952]/20">
                          {["urgent", "important", "normal"].map((p) => (
                            <label
                              key={p}
                              className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                                editFormData.priority === p
                                  ? "bg-[#B2945B] text-[#161613] shadow-sm"
                                  : "text-[#898952] hover:text-[#DDFFF7]"
                              }`}
                            >
                              <input
                                type="radio"
                                name="priority"
                                value={p}
                                checked={editFormData.priority === p}
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              {p}
                            </label>
                          ))}
                        </div>

                        {/* INSTAGRAM / IOS STYLE TOGGLE SWITCH */}
                        <div className="flex items-center gap-2 bg-[#161613] py-1.5 px-3 rounded-lg border border-[#898952]/20">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#898952]">
                            {editFormData.isActive ? "Active" : "Inactive"}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input
                              type="checkbox"
                              name="isActive"
                              checked={editFormData.isActive}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-[#292921] border border-[#898952]/40 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#898952] after:border-transparent after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#93E1D8] peer-checked:after:bg-[#161613] peer-checked:border-transparent"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* CONTROL LAYER TEXTAREA */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#898952]">
                        System Notification Stream Output
                      </label>
                      <textarea
                        name="message"
                        rows="2"
                        value={editFormData.message}
                        onChange={handleInputChange}
                        className="w-full bg-[#161613] text-white text-xs rounded-lg px-3 py-2 border border-[#898952]/20 focus:outline-none focus:border-[#93E1D8]/40 resize-none"
                      />
                    </div>

                    {/* CONTROL FORMS ACTION STRIP */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 text-xs font-bold text-[#898952] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(item._id)}
                        disabled={isSaving}
                        className="px-4 py-1.5 text-xs font-bold bg-[#93E1D8] text-[#161613] hover:brightness-105 rounded-lg shadow-sm"
                      >
                        {isSaving ? "Syncing..." : "Commit Update"}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STREAM VIEW FOR ADMIN MASS READING */
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* PRIMARY SYSTEM IDENTITY & TEXT FIELDS */}
                    <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 items-center">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-white group-hover:text-[#93E1D8] transition-colors truncate">
                            {item.name}
                          </h2>
                          {/* Priority pill mapped against safe theme colors */}
                          <span
                            className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md border ${
                              item.priority === "urgent"
                                ? "bg-red-500/10 border-red-500/30 text-red-400"
                                : item.priority === "important"
                                  ? "bg-[#B2945B]/10 border-[#B2945B]/30 text-[#B2945B]"
                                  : "bg-[#898952]/10 border-[#898952]/30 text-[#898952]"
                            }`}
                          >
                            {item.priority || "Normal"}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#898952] truncate mt-0.5">
                          {item.email}
                        </p>
                      </div>

                      {/* DATA MESSAGE FIELD */}
                      <div className="lg:col-span-2 min-w-0">
                        <p className="text-[#DDFFF7]/80 text-xs md:text-sm line-clamp-1 leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                    </div>

                    {/* METRICS CONTROL PANEL & ACTIONS */}
                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-2 md:pt-0 border-t border-[#898952]/10 md:border-t-0">
                      {/* DYNAMIC ACTIVE / INACTIVE DATA PREVIEW PILL */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isActive
                              ? "bg-[#93E1D8] shadow-[0_0_8px_#93E1D8] animate-pulse"
                              : "bg-red-500/50"
                          }`}
                        />
                        <span
                          className={`text-[11px] tracking-wide font-semibold uppercase ${
                            item.isActive ? "text-[#93E1D8]" : "text-red-400/70"
                          }`}
                        >
                          {item.isActive ? "Live Feed" : "Inactive"}
                        </span>
                      </div>

                      {/* SYSTEM ACTION ICON GRID */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-2 text-[#898952] hover:text-[#93E1D8] hover:bg-[#161613] rounded-lg transition-colors"
                          title="Modify Entry"
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
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteModal(item._id)}
                          className="p-2 text-[#898952] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Purge Entry"
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
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* MODAL CONFIGURATION PANELS */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <div className="bg-[#20201a] p-6 rounded-2xl w-full max-w-sm shadow-2xl relative z-10 border border-[#898952]/20">
              <h2 className="text-lg font-bold text-white mb-1">
                Dismiss Announcement?
              </h2>
              <p className="text-[#898952] text-xs mb-5">
                Are you sure you want to remove this notification parameters
                permanently from processing streams?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#898952] hover:text-white"
                >
                  Keep Record
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminReviewAllNotification;
