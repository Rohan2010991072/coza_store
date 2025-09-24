import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
  };
  created_at: Date;
  updated_at: Date;
  lastLogin?: Date;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    updateUserAddress: (state, action: PayloadAction<User['address']>) => {
      if (state.currentUser) {
        state.currentUser.address = action.payload;
      }
    },
    updateUserPreferences: (state, action: PayloadAction<User['preferences']>) => {
      if (state.currentUser) {
        state.currentUser.preferences = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateUser,
  updateUserAddress,
  updateUserPreferences,
  setLoading,
  setError,
  logout,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;