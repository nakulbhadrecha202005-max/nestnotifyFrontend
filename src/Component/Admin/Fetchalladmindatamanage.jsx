import React, { useEffect, useState } from "react";
import axios from "axios";

const Fetchalladmindatamanage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [addAdminMessage, setAddAdminMessage] = useState("");

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchAllAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const res = await axios.get(
        "https://notifynest-2.onrender.com/superadmin/allAdminListfetch",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // console.log(res.data);
      // console.log(res);
      setAdmins(res?.data || []);
    } catch (err) {
      setBackendError(err.response?.data?.message || "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const handleOpenAddModal = () => {
    setNewAdminEmail("");
    setAddAdminMessage("");
    setIsAddOpen(true);
  };

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddAdminLoading(true);
      setAddAdminMessage("");
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://notifynest-2.onrender.com/superadmin/add-admin",
        { email: newAdminEmail },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAddAdminMessage(res.data.message || "Admin added successfully!");
      setNewAdminEmail("");
      fetchAllAdmins();
      setTimeout(() => setIsAddOpen(false), 1500);
    } catch (err) {
      setBackendError(err.response?.data?.message || "Something went wrong");
      setAddAdminMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setAddAdminLoading(false);
    }
  };

  const handleUpdateClick = (admin) => {
    setSelectedAdmin(admin);
    setUpdatedEmail(admin.email);
    setIsUpdateOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAdmin) return;
    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `https://notifynest-2.onrender.com/superadmin/updateAdmin/${selectedAdmin._id}`,
        { email: updatedEmail },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchAllAdmins();
      setIsUpdateOpen(false);
    } catch (err) {
      setBackendError(err.response?.data?.message || "Failed to update admin");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAdmin) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://notifynest-2.onrender.com/superadmin/deleteAdmin/${selectedAdmin._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAdmins(admins.filter((item) => item._id !== selectedAdmin._id));
    } catch (err) {
      console.log(err.response?.data?.message);
      setBackendError(err.response?.data?.message || "Failed to delete admin");
    } finally {
      setIsDeleteOpen(false);
      setSelectedAdmin(null);
    }
  };

  if (!admins || admins.length === 0 || backendError) {
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
  }

  return (
    <div className="min-h-screen w-full bg-[#161613] text-[#DDFFF7] antialiased p-4 sm:p-10 font-sans selection:bg-[#93E1D8] selection:text-[#161613]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-[#898952]/10 max-w-7xl mx-auto">
        <div className="w-full lg:w-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#93E1D8] bg-[#93E1D8]/10 border border-[#93E1D8]/20 px-3 py-1 rounded-md">
            System Security Clearance
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 flex items-center gap-2">
            Admin Management
          </h1>
          <p className="text-[#898952] mt-1 text-xs sm:text-sm font-medium">
            Configure system permissions and control structural registry access
            levels.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="w-full lg:w-auto flex justify-center items-center gap-2 bg-[#93E1D8] text-[#161613] hover:brightness-105 font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          Add New Administrator
        </button>
      </div>

      {/* Error Alert */}
      {backendError && (
        <div className="max-w-7xl mx-auto flex items-center gap-3 bg-red-950/20 border border-red-900/30 text-red-400 p-4 rounded-xl mb-6 text-xs shadow-md">
          <span className="material-icons text-base shrink-0">
            error_outline
          </span>
          <span className="font-medium">{backendError}</span>
        </div>
      )}

      {/* Data Section */}
      <div className="w-full max-w-7xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-[#20201a] rounded-2xl animate-pulse border border-[#898952]/10"
              ></div>
            ))}
          </div>
        ) : admins.length > 0 ? (
          <div className="w-full">
            {/* --- DESKTOP TABLE VIEW --- */}
            <div className="hidden md:block bg-[#20201a] rounded-2xl overflow-hidden border border-[#898952]/10 shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#292921] border-b border-[#898952]/10">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#898952]">
                      Email & ID Matrix
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#898952]">
                      Clearance Level
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#898952]">
                      Registry Date
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#898952] text-right">
                      System Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#898952]/10">
                  {admins.map((admin) => (
                    <tr
                      key={admin._id}
                      className="hover:bg-[#292921]/40 transition-colors group"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-5">
                          <span className="material-icons text-[#898952] group-hover:text-[#93E1D8] transition-colors">
                            mail
                          </span>
                          <div>
                            <p className="font-bold text-white text-sm group-hover:text-[#93E1D8] transition-colors">
                              {admin.email}
                            </p>
                            <p className="text-[10px] text-[#898952] font-mono tracking-tighter mt-0.5 select-all uppercase">
                              ID: {admin._id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="px-3 py-1 bg-[#93E1D8]/10 text-[#93E1D8] border border-[#93E1D8]/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-[#DDFFF7]/80 text-sm font-medium">
                        {new Date(admin.createdAt).toLocaleDateString(
                          undefined,
                          { dateStyle: "medium" },
                        )}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdateClick(admin)}
                            className="p-2 bg-[#292921] hover:text-[#93E1D8] text-[#DDFFF7] rounded-xl border border-[#898952]/20 hover:border-[#93E1D8]/40 transition-all"
                            title="Modify Record"
                          >
                            <span className="material-icons text-base block">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(admin)}
                            className="p-2 bg-red-950/20 hover:bg-red-900/30 text-red-400 rounded-xl border border-red-900/30 transition-all"
                            title="Purge Record"
                          >
                            <span className="material-icons text-base block">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- MOBILE CARD VIEW --- */}
            <div className="md:hidden space-y-4">
              {admins.map((admin) => (
                <div
                  key={admin._id}
                  className="bg-[#20201a] p-5 rounded-2xl border border-[#898952]/10 shadow-lg space-y-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-[#161613] rounded-lg border border-[#898952]/10 text-[#93E1D8] shrink-0">
                        <span className="material-icons text-sm block">
                          alternate_email
                        </span>
                      </div>
                      <p className="text-white font-bold text-base truncate">
                        {admin.email}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#93E1D8]/10 text-[#93E1D8] border border-[#93E1D8]/20 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0">
                      {admin.role}
                    </span>
                  </div>

                  <div className="space-y-2 bg-[#161613] p-3 rounded-xl border border-[#898952]/10 font-mono text-xs">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase text-[#898952] font-bold tracking-widest">
                        Admin ID Block
                      </span>
                      <span className="text-zinc-200 truncate select-all mt-0.5">
                        {admin._id}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase text-[#898952] font-bold tracking-widest">
                        Registry Timestamp
                      </span>
                      <span className="text-zinc-200 truncate mt-0.5">
                        {new Date(admin.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(admin)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-[#292921] text-[#DDFFF7] border border-[#898952]/20 rounded-xl font-bold text-xs transition-colors"
                    >
                      <span className="material-icons text-sm">edit</span>
                      Modify
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(admin)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-red-950/20 text-red-400 border border-red-900/30 rounded-xl font-bold text-xs transition-colors"
                    >
                      <span className="material-icons text-sm">delete</span>
                      Purge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !backendError && (
            <div className="py-20 bg-[#20201a] rounded-2xl border border-dashed border-[#898952]/20 text-center max-w-xl mx-auto mt-6">
              <span className="material-icons text-5xl text-[#898952] mb-2">
                person_off
              </span>
              <p className="text-sm font-bold text-[#898952]">
                No live active credentials recorded inside registry.
              </p>
            </div>
          )
        )}
      </div>

      {/* --- MODALS (ADD, UPDATE, DELETE) --- */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#20201a] rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#898952]/20 relative">
            <div className="mb-5">
              <h3 className="text-base font-bold text-white tracking-wide">
                Create Admin Registry Entry
              </h3>
              <p className="text-xs text-[#898952] mt-1">
                Grant structural core platform access configurations via
                standard address routing paths.
              </p>
            </div>
            <form onSubmit={handleAddAdminSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#898952] mb-1.5">
                  Email Router Destination
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full bg-[#161613] rounded-xl px-3.5 py-2.5 border border-[#898952]/20 focus:outline-none focus:border-[#93E1D8]/40 text-white text-xs placeholder-[#898952]/50 transition-colors font-medium"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#898952] hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAdminLoading}
                  className="px-4 py-2 bg-[#93E1D8] text-[#161613] text-xs font-bold rounded-xl shadow-sm hover:brightness-105 transition disabled:opacity-50"
                >
                  {addAdminLoading ? "Writing State..." : "Confirm Access"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#20201a] rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#898952]/20 relative">
            <div className="mb-5">
              <h3 className="text-base font-bold text-white tracking-wide">
                Update Admin Profile Email Address
              </h3>
              <p className="text-xs text-[#898952] mt-1">
                Modify the existing data profile coordinates targeting this
                administrative entry.
              </p>
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#898952] mb-1.5">
                  Modified Email Identification Target
                </label>
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="w-full bg-[#161613] rounded-xl px-3.5 py-2.5 border border-[#898952]/20 focus:outline-none focus:border-[#93E1D8]/40 text-white text-xs transition-colors font-medium"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#898952] hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="px-4 py-2 bg-[#93E1D8] text-[#161613] text-xs font-bold rounded-xl shadow-sm hover:brightness-105 transition disabled:opacity-50"
                >
                  {updateLoading ? "Synchronizing Record..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#20201a] rounded-2xl w-full max-w-sm p-6 text-center border border-[#898952]/20 shadow-2xl">
            <div className="w-12 h-12 bg-red-950/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20 text-red-400 shadow-sm">
              <span className="material-icons text-2xl">warning</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-wide mb-1">
              Revoke Access Clearances?
            </h3>
            <p className="text-[#898952] text-xs px-2 mb-4 truncate font-mono bg-[#161613] py-1.5 border border-[#898952]/10 rounded-lg select-all text-center">
              {selectedAdmin?.email}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="py-2.5 bg-[#292921] hover:text-white text-[#898952] border border-[#898952]/10 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fetchalladmindatamanage;
