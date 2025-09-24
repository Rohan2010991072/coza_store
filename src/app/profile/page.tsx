'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUser, logout } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Edit, Save, X, Settings, UserCircle } from 'lucide-react';
import DateInput from '@/components/ui/DateInput';

const UserProfilePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    gender: currentUser?.gender || '',
    address: {
      street: currentUser?.address?.street || '',
      city: currentUser?.address?.city || '',
      state: currentUser?.address?.state || '',
      zipCode: currentUser?.address?.zipCode || '',
      country: currentUser?.address?.country || '',
    },
    preferences: {
      newsletter: currentUser?.preferences?.newsletter || false,
      smsNotifications: currentUser?.preferences?.smsNotifications || false,
      emailNotifications: currentUser?.preferences?.emailNotifications || true,
    }
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: currentUser.gender || '',
        address: {
          street: currentUser.address?.street || '',
          city: currentUser.address?.city || '',
          state: currentUser.address?.state || '',
          zipCode: currentUser.address?.zipCode || '',
          country: currentUser.address?.country || '',
        },
        preferences: {
          newsletter: currentUser.preferences?.newsletter || false,
          smsNotifications: currentUser.preferences?.smsNotifications || false,
          emailNotifications: currentUser.preferences?.emailNotifications || true,
        }
      });
    }
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(logout());
    setIsEditing(false);
    router.push('/');
  };

  const handleSave = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          preferences: formData.preferences
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUser(data.data));
        setIsEditing(false);
      } else {
        alert('Failed to update profile: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: currentUser.gender || '',
        address: {
          street: currentUser.address?.street || '',
          city: currentUser.address?.city || '',
          state: currentUser.address?.state || '',
          zipCode: currentUser.address?.zipCode || '',
          country: currentUser.address?.country || '',
        },
        preferences: {
          newsletter: currentUser.preferences?.newsletter || false,
          smsNotifications: currentUser.preferences?.smsNotifications || false,
          emailNotifications: currentUser.preferences?.emailNotifications || true,
        }
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else if (field.startsWith('preferences.')) {
      const preferenceField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [preferenceField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <UserCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to COZA Store</h1>
            <p className="text-gray-600 mb-8">Please log in to view your profile</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/register')}
                className="w-full bg-white text-gray-900 border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
              </div>
              <div className="flex items-center space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-600 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">@{currentUser?.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <DateInput
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        placeholder="Select your date of birth"
                        maxDate={new Date().toISOString().split('T')[0]}
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.dateOfBirth || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    {isEditing ? (
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 py-2 capitalize">{currentUser?.gender || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                {/* Address Information */}
                <h2 className="text-lg font-semibold text-gray-900 mb-6 mt-8 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.address?.street || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.address?.city || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) => handleInputChange('address.state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.address?.state || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address.zipCode}
                        onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.address?.zipCode || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address.country}
                        onChange={(e) => handleInputChange('address.country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{currentUser?.address?.country || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preferences and Account Info */}
              <div className="space-y-6">
                {/* Account Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Account Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member since:</span>
                      <span className="text-gray-900">
                        {currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified:</span>
                      <span className={`font-medium ${currentUser?.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                        {currentUser?.isVerified ? 'Yes' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Type:</span>
                      <span className="text-gray-900">
                        {currentUser?.isAdmin ? 'Admin' : 'Customer'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Communication Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Preferences
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferences.newsletter}
                        onChange={(e) => handleInputChange('preferences.newsletter', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Newsletter subscription</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferences.emailNotifications}
                        onChange={(e) => handleInputChange('preferences.emailNotifications', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferences.smsNotifications}
                        onChange={(e) => handleInputChange('preferences.smsNotifications', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;