import React, { useState, useEffect } from "react";

const IdentitySettings = () => {
  // Store all users returned from the backend array
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch all customer data from admin endpoint on mount
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const storedEmail = localStorage.getItem("logggedInUserEmail");
        const token = localStorage.getItem("token");

        if (!storedEmail) {
          throw new Error("No local email found. Please log in again.");
        }

        const response = await fetch(
          `https://notifynest-2.onrender.com/adminall_users/userSeeProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile settings.");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Save the array of users into state (fallback to empty array if unexpected format)
        setUsers(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  // Update a specific field inside our local state array for dynamic editing
  const handleUserFieldChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  // 2. Handle Update payload for all records
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        "https://notifynest-2.onrender.com/adminall_users/userprofileUpdate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ users }),
        },
      );

      if (!response.ok)
        throw new Error("Could not update profile database updates.");
      alert("Changes saved successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#161613] flex flex-col items-center justify-center p-4 antialiased selection:bg-[#93E1D8] selection:text-[#161613]">
        {/* Load Google Material Symbols stylesheet directly for clean execution */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <div className="w-full max-w-[460px] bg-[#20201a] border border-[#898952]/20 rounded-2xl p-12 text-center shadow-2xl flex flex-col items-center gap-5">
          <div className="w-8 h-8 border-4 border-[#898952]/20 border-t-[#93E1D8] rounded-full animate-spin" />
          <p className="text-[#DDFFF7] text-sm font-bold tracking-wide">
            Retrieving database credentials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DDFFF7] px-4 py-8 text-[#462255]">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Identity Registry</h1>
            <p className="text-sm text-[#898952]">
              Manage user records and permissions
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-[#DDFFF7] px-4 py-3 text-sm font-medium text-[#B2945B]">
            {error}
          </div>
        )}

        {/* Table Header */}
        <div className="hidden grid-cols-5 gap-4 border-b border-[#93E1D8] pb-3 text-sm font-semibold text-[#898952] md:grid">
          <div>Name</div>
          <div>Email</div>
          <div>Status</div>
          <div>Created At</div>
          <div>Updated At</div>
        </div>

        {/* Users */}
        <div className="divide-y divide-[#DDFFF7]">
          {users.map((user, index) => (
            <div
              key={user._id || index}
              className="grid gap-4 py-5 md:grid-cols-5 md:items-center"
            >
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-[#898952] md:hidden">
                  Name
                </label>

                <input
                  type="text"
                  value={user.name || ""}
                  onChange={(e) =>
                    handleUserFieldChange(index, "name", e.target.value)
                  }
                  className="w-full rounded-lg bg-[#DDFFF7] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#B2945B]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium text-[#898952] md:hidden">
                  Email
                </label>

                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="w-full rounded-lg bg-gray-50 px-3 py-2 text-sm text-[#898952] outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-xs font-medium text-[#898952] md:hidden">
                  Status
                </label>

                <span
                  className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${
                    user.agreeTerms
                      ? "bg-[#93E1D8] text-[#462255]"
                      : "bg-[#DDFFF7] text-[#898952]"
                  }`}
                >
                  {user.agreeTerms ? "Accepted" : "Revoked"}
                </span>
              </div>

              {/* Created At */}
              <div>
                <label className="mb-1 block text-xs font-medium text-[#898952] md:hidden">
                  Created At
                </label>

                <p className="text-sm text-[#462255]">
                  {new Date(
                    parseInt(user._id.substring(0, 8), 16) * 1000,
                  ).toLocaleString()}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <label className="mb-1 block text-xs font-medium text-[#898952] md:hidden">
                  Updated At
                </label>

                <p className="text-sm text-[#462255]">
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="flex-1 rounded-xl bg-[#462255] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B2945B]"
          >
            {isUpdating ? "Processing..." : "Save Changes"}
          </button>

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-[#462255] px-5 py-3 text-sm font-semibold text-[#462255] transition hover:bg-[#DDFFF7]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentitySettings;
