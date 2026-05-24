import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  LogOut,
  Trash2,
  Save,
  X,
  UserRound,
} from 'lucide-react';
import { logoutUser,deleteUserAccount, updateUserProfile } from '../store/auth/authThunk';


function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    profileImage: currentUser?.profileImage || '',
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [imagePreview, setImagePreview] = useState(currentUser?.profileImage || '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call to update user profile
    dispatch(updateUserProfile(formData))
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      profileImage: currentUser?.profileImage || '',
    });
    setImagePreview(currentUser?.profileImage || '');
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    setShowLogoutModal(false);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement API call to delete user account
    // After deletion, logout and redirect
    dispatch(deleteUserAccount());
    navigate('/login');
    setShowDeleteModal(false);
  };

  const handleChangePassword = () => {

  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = () => {
    if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordFormData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // TODO: Call API to change password
    console.log('Changing password:', passwordFormData);
    
    // Reset form and close modal
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordModal(false);
  };

  const handlePasswordCancel = () => {
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-ig-black">
      {/* Left Sidebar - Profile */}
      <div className="w-full md:w-[350px] h-auto md:h-full flex flex-col border-b md:border-b-0 md:border-r border-ig-border">
        {/* Header */}
        <div className="h-[75px] px-5 flex items-center justify-between border-b border-ig-border shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold text-lg">Profile</h1>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>

        {/* Profile Sidebar Content */}
        <div className="overflow-y-auto md:flex-1 p-4 md:p-6 space-y-6">
          {/* Profile Picture Section */}
          <div className="flex justify-center">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={currentUser?.name}
                  className="w-24 md:w-32 h-24 md:h-32 rounded-full object-cover border-4 border-ig-border"
                />
              ) : (
                <div className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-ig-hover flex items-center justify-center border-4 border-ig-border">
                  <UserRound className="w-12 md:w-16 h-12 md:h-16 text-ig-text-gray" />
                </div>
              )}

              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-ig-blue hover:bg-blue-600 text-white p-2 md:p-3 rounded-full cursor-pointer transition-colors shadow-lg">
                  <Camera className="w-4 md:w-5 h-4 md:h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="space-y-3 md:space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-ig-text-gray text-xs md:text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 mt-1 md:px-4 py-2 md:py-3 rounded-lg text-white text-sm focus:outline-none transition-all ${
                  isEditing
                    ? 'bg-ig-dark-gray border border-ig-border focus:border-ig-blue'
                    : 'bg-ig-hover border border-ig-border cursor-not-allowed opacity-75'
                }`}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-ig-text-gray text-xs md:text-sm font-medium ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 mt-1 md:px-4 py-2 md:py-3 rounded-lg text-white text-sm focus:outline-none transition-all ${
                  isEditing
                    ? 'bg-ig-dark-gray border border-ig-border focus:border-ig-blue'
                    : 'bg-ig-hover border border-ig-border cursor-not-allowed opacity-75'
                }`}
              />
            </div>

            {/* Member Since - Desktop only */}
            <div className="space-y-2">
              <label className="text-ig-text-gray text-xs md:text-sm font-medium">Member Since</label>
              <div className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-ig-text-gray text-sm bg-ig-hover border border-ig-border">
                {currentUser?.createdAt
                  ? new Date(currentUser.createdAt).toLocaleDateString()
                  : 'N/A'}
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile Only */}
          <div className="space-y-2 md:space-y-3 pt-3 md:pt-4">
            {isEditing ? (
              <>
                {/* Save Button */}
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-ig-blue hover:bg-blue-600 text-white font-semibold py-2 mb-2 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group text-sm cursor-pointer md:text-base"
                >
                  <Save className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
                  Save Changes
                </button>

                {/* Cancel Button */}
                <button
                  onClick={handleCancel}
                  className="w-full bg-ig-dark-gray hover:bg-ig-hover text-white font-semibold py-2 md:py-3 rounded-lg border border-ig-border transition-colors flex items-center justify-center gap-2 group text-sm cursor-pointer md:text-base"
                >
                  <X className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Edit Profile Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-ig-blue hover:bg-blue-600 text-white font-semibold py-2 mb-3.5 md:py-3 rounded-lg transition-colors text-sm cursor-pointer md:text-base"
                >
                  Edit Profile
                </button>

                {/* Change Password Button */}
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full bg-ig-dark-gray hover:bg-ig-hover text-white font-semibold py-2 md:py-3 rounded-lg border border-ig-border transition-colors text-sm cursor-pointer md:text-base">
                  Change Password
                </button>
              </>
            )}
          </div>

          {/* Danger Zone - Mobile Only */}
          <div className="pt-3 md:pt-4 border-t border-ig-border space-y-2 md:space-y-3">
            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full bg-ig-dark-gray hover:bg-ig-hover text-ig-blue font-semibold py-2 mb-4 md:py-3 rounded-lg border border-ig-border transition-colors flex items-center justify-center gap-2 group text-sm cursor-pointer md:text-base"
            >
              <LogOut className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
              Logout
            </button>

            {/* Delete Account Button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-2 md:py-3 rounded-lg border border-red-500/30 transition-colors flex items-center justify-center gap-2 group text-sm cursor-pointer md:text-base"
            >
              <Trash2 className="w-4 md:w-5 h-4 md:h-5 group-hover:scale-110 transition-transform" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Right Content Area - Desktop Only */}
      <div className="hidden md:flex flex-1 flex-col h-full overflow-y-auto">
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 space-y-4 md:space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Welcome, {currentUser?.name}!
            </h2>
            <p className="text-ig-text-gray text-sm md:text-lg leading-relaxed">
              Manage your profile settings and account preferences. Edit your personal information, change your password, or delete your account if needed.
            </p>
          </div>

          {/* Profile Settings Info */}
          <div className="bg-ig-dark-gray border border-ig-border rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-white">Profile Information</h3>
            <p className="text-ig-text-gray text-sm md:text-base">
              Your profile helps other users get to know you better. Keep your information up-to-date to have the best experience.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4">
              <div className="bg-ig-hover p-3 md:p-4 rounded-lg">
                <p className="text-ig-text-gray text-xs md:text-sm">Account Status</p>
                <p className="text-white font-semibold mt-1 text-sm md:text-base">Active</p>
              </div>
              <div className="bg-ig-hover p-3 md:p-4 rounded-lg">
                <p className="text-ig-text-gray text-xs md:text-sm">Messages</p>
                <p className="text-white font-semibold mt-1 text-sm md:text-base">Enabled</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-ig-dark-gray border border-ig-border rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-white">Account Details</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center pb-2 md:pb-3 border-b border-ig-border text-sm md:text-base">
                <span className="text-ig-text-gray">Email Verified</span>
                <span className="text-green-400 font-semibold">✓ Yes</span>
              </div>
              <div className="flex justify-between items-center pb-2 md:pb-3 border-b border-ig-border text-sm md:text-base">
                <span className="text-ig-text-gray">Two-Factor Auth</span>
                <span className="text-ig-text-gray">Disabled</span>
              </div>
              <div className="flex justify-between items-center text-sm md:text-base">
                <span className="text-ig-text-gray">Last Login</span>
                <span className="text-white">Today</span>
              </div>
            </div>
          </div>

        
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-ig-dark-gray border border-ig-border rounded-2xl p-4 md:p-6 max-w-sm w-full space-y-4">
            <h2 className="text-white text-lg font-semibold">Logout</h2>
            <p className="text-ig-text-gray text-sm">
              Are you sure you want to logout? You can login again anytime.
            </p>

            <div className="flex gap-3 pt-2 md:pt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-ig-hover hover:bg-ig-border text-white font-semibold py-2 md:py-2 rounded-lg transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-ig-blue hover:bg-blue-600 text-white font-semibold py-2 md:py-2 rounded-lg transition-colors text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-ig-dark-gray border border-ig-border rounded-2xl p-4 md:p-6 max-w-sm w-full space-y-4">
            <h2 className="text-white text-lg font-semibold">Delete Account</h2>
            <p className="text-ig-text-gray text-sm">
              This action cannot be undone. All your data will be permanently deleted.
            </p>

            <div className="flex gap-3 pt-2 md:pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-ig-hover hover:bg-ig-border text-white font-semibold py-2 md:py-2 rounded-lg transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 md:py-2 rounded-lg transition-colors text-sm md:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-ig-dark-gray border border-ig-border rounded-2xl p-4 md:p-6 max-w-sm w-full space-y-4">
            <h2 className="text-white text-lg font-semibold">Change Password</h2>
            
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-ig-text-gray text-sm font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordFormData.currentPassword}
                onChange={handlePasswordInputChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 rounded-lg bg-ig-hover border border-ig-border text-white text-sm focus:outline-none focus:border-ig-blue transition-all"
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-ig-text-gray text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordFormData.newPassword}
                onChange={handlePasswordInputChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-lg bg-ig-hover border border-ig-border text-white text-sm focus:outline-none focus:border-ig-blue transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-ig-text-gray text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordFormData.confirmPassword}
                onChange={handlePasswordInputChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 rounded-lg bg-ig-hover border border-ig-border text-white text-sm focus:outline-none focus:border-ig-blue transition-all"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handlePasswordCancel}
                className="flex-1 bg-ig-hover hover:bg-ig-border text-white font-semibold py-2 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 bg-ig-blue hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
