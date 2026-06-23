import React from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header Gradient */}
        <div className="h-28 bg-linear-to-r from-blue-600 to-purple-600"></div>

        {/* Profile Image */}
        <div className="flex justify-center -mt-14">
          <img
            src={profile?.photo?.url}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-center px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {profile?.name}
          </h2>

          <p className="text-gray-500 mt-1">{profile?.email}</p>

          <p className="text-gray-500 mt-1">{profile?.phone}</p>

          <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
            {profile?.role?.toUpperCase()}
          </span>
        </div>

        {/* Extra Info Cards */}
        <div className="px-6 pb-8 space-y-3">

          <div className="bg-gray-100 rounded-xl p-3 text-center text-gray-600">
            📧 Email Verified User
          </div>

          <div className="bg-gray-100 rounded-xl p-3 text-center text-gray-600">
            👤 Active Member
          </div>

        </div>

      </div>
    </div>
  );
}

export default MyProfile;