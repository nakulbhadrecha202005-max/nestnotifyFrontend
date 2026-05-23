import React, { useState, useRef } from "react";

const UserProfileUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedImage) alert("Profile Saved Successfully!");
  };

  return (
    // Main Container - Using the darkest color from your palette as the background
    <div className="min-h-screen bg-[#4B4038] flex items-center justify-center p-6 font-sans">
      {/* Card - Glassmorphism effect using your palette colors */}
      <div className="w-full max-w-sm bg-[#4B4038] border border-[#9A8678] rounded-[2.5rem] p-10 shadow-2xl">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-light tracking-wide text-[#CAAA98] mb-8">
            Account <span className="font-bold text-white">Profile</span>
          </h2>

          {/* Profile Image - High Contrast Border */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-2 border-[#CAAA98] p-2 shadow-inner">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#9A8678]/20 flex items-center justify-center border border-[#9A8678]">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-6xl text-[#9A8678]">
                    account_circle
                  </span>
                )}
              </div>
            </div>

            {/* Upload Button - Accent color to pop against dark bg */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-[#CAAA98] text-[#4B4038] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl border-4 border-[#4B4038]"
            >
              <span className="material-symbols-outlined font-bold">edit</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#CAAA98] text-sm uppercase tracking-widest font-medium">
              Avatar Image
            </p>
            <p className="text-[#9A8678] text-xs mt-2 italic">
              Optimized for 2.0MB uploads
            </p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-12 space-y-4">
          <button
            onClick={handleSave}
            className="w-full bg-[#CAAA98] text-[#4B4038] py-4 rounded-2xl font-bold uppercase tracking-tighter text-sm hover:bg-white transition-all shadow-lg active:translate-y-1"
          >
            Update Profile
          </button>

          <button
            onClick={() => setSelectedImage(null)}
            className="w-full border border-[#9A8678] text-[#9A8678] py-4 rounded-2xl font-bold uppercase tracking-tighter text-sm hover:bg-[#9A8678] hover:text-[#4B4038] transition-all"
          >
            Remove Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileUpload;
