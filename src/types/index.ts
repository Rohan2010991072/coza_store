// Product Types
export interface Product {
  _id: {
    $oid: string;
  };
  name: string;
  price: number;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  category: {
    $oid: string;
  };
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: {
    $date: string;
  };
  __v: number;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  icon?: string;
  color?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Contact Types
export interface Contact {
  _id?: string;
  username: string;
  email: string;
  subject: string;
  message: string;
  created_at?: Date;
}

// Store Types
export interface Store {
  _id?: string;
  address: {
    name: string;
    state: string;
    keyword: string[];
    country: string;
    location: {
      coordinate: string[];
    };
  };
  created_at?: Date;
}

// User Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
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

// Order Types
export interface Order {
  _id?: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
  status: string;
  created_at?: Date;
}

export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}