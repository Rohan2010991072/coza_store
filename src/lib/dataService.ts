import fs from 'fs';
import path from 'path';
import { Product, Contact, Store, Category, User } from '@/types';

class DataService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data');
  }

  private readJSON<T>(filename: string): T[] {
    try {
      const filePath = path.join(this.dataPath, filename);
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return [];
    }
  }

  private writeJSON<T>(filename: string, data: T[]): boolean {
    try {
      const filePath = path.join(this.dataPath, filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      return false;
    }
  }

  // Product operations
  getAllProducts(): Product[] {
    return this.readJSON<Product>('products.json');
  }

  getFeaturedProducts(limit: number = 8): Product[] {
    const products = this.getAllProducts();
    return products.slice(0, limit);
  }

  getProductById(id: string): Product | null {
    const products = this.getAllProducts();
    return products.find(p => p._id.$oid === id) || null;
  }

  getProductsByCategory(categoryId: string): Product[] {
    const products = this.getAllProducts();
    return products.filter(p => p.category.$oid === categoryId);
  }

  searchProducts(query: string): Product[] {
    const products = this.getAllProducts();
    const searchQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.brand.toLowerCase().includes(searchQuery)
    );
  }

  // Category operations
  getCategories(): Category[] {
    return [
      { _id: '61c9ebd30d2941ad7e87d78e', name: 'Women', icon: '♀', color: '#ff6b9d' },
      { _id: '61c9ebd70d2941ad7e87d790', name: 'Men', icon: '♂', color: '#4dabf7' },
      { _id: '61c9ebf30d2941ad7e87d794', name: 'Shoes', icon: '👟', color: '#69db7c' },
      { _id: '61c9ebf70d2941ad7e87d796', name: 'Watches', icon: '⌚', color: '#ffd43b' },
      { _id: '61c9ec010d2941ad7e87d798', name: 'Accessories', icon: '👜', color: '#da77f2' }
    ];
  }

  getCategoryById(id: string): Category | null {
    const categories = this.getCategories();
    return categories.find(c => c._id === id) || null;
  }

  getCategoryByName(name: string): Category | null {
    const categories = this.getCategories();
    return categories.find(c => c.name.toLowerCase() === name.toLowerCase()) || null;
  }

  // Contact operations
  getContacts(): Contact[] {
    return this.readJSON<Contact>('contacts.json');
  }

  saveContact(contactData: Omit<Contact, '_id' | 'created_at'>): Contact | null {
    try {
      const contacts = this.getContacts();
      const newContact: Contact = {
        ...contactData,
        _id: Date.now().toString(),
        created_at: new Date()
      };
      contacts.push(newContact);
      
      if (this.writeJSON('contacts.json', contacts)) {
        return newContact;
      }
      return null;
    } catch (error) {
      console.error('Error saving contact:', error);
      return null;
    }
  }

  // Store operations
  getStores(): Store[] {
    return this.readJSON<Store>('store.json');
  }

  saveStore(storeData: Omit<Store, '_id' | 'created_at'>): Store | null {
    try {
      const stores = this.getStores();
      const newStore: Store = {
        ...storeData,
        _id: Date.now().toString(),
        created_at: new Date()
      };
      stores.push(newStore);
      
      if (this.writeJSON('store.json', stores)) {
        return newStore;
      }
      return null;
    } catch (error) {
      console.error('Error saving store:', error);
      return null;
    }
  }

  // User operations
  getAllUsers(): User[] {
    return this.readJSON<User>('users.json');
  }

  getUserById(id: string): User | null {
    const users = this.getAllUsers();
    return users.find(u => u._id === id) || null;
  }

  getUserByEmail(email: string): User | null {
    const users = this.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  saveUser(userData: Omit<User, '_id' | 'created_at' | 'updated_at'>): User | null {
    try {
      const users = this.getAllUsers();
      
      // Check if email already exists
      const existingUser = this.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser: User = {
        ...userData,
        _id: Date.now().toString(),
        created_at: new Date(),
        updated_at: new Date()
      };
      users.push(newUser);
      
      if (this.writeJSON('users.json', users)) {
        return newUser;
      }
      return null;
    } catch (error) {
      console.error('Error saving user:', error);
      return null;
    }
  }

  updateUser(id: string, updateData: Partial<Omit<User, '_id' | 'created_at' | 'updated_at'>>): User | null {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u._id === id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // If email is being updated, check if it already exists
      if (updateData.email) {
        const existingUser = this.getUserByEmail(updateData.email);
        if (existingUser && existingUser._id !== id) {
          throw new Error('User with this email already exists');
        }
      }

      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        updated_at: new Date()
      };
      
      if (this.writeJSON('users.json', users)) {
        return users[userIndex];
      }
      return null;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  deleteUser(id: string): boolean {
    try {
      const users = this.getAllUsers();
      const filteredUsers = users.filter(u => u._id !== id);
      
      if (filteredUsers.length === users.length) {
        throw new Error('User not found');
      }
      
      return this.writeJSON('users.json', filteredUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  loginUser(email: string, password: string): User | null {
    try {
      const user = this.getUserByEmail(email);
      if (!user) {
        return null;
      }

      // In a real application, you'd hash and compare passwords
      // For now, we'll do a simple comparison
      if (user.password === password) {
        // Update last login
        this.updateUser(user._id, { lastLogin: new Date() });
        // Return user without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }

  // Utility methods
  getProductsByFilter(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    search?: string;
    sortBy?: 'name' | 'price' | 'rating' | 'newest';
    sortOrder?: 'asc' | 'desc';
  }): Product[] {
    let products = this.getAllProducts();

    // Apply filters
    if (filters.category) {
      products = products.filter(p => p.category.$oid === filters.category);
    }

    if (filters.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.brand) {
      products = products.filter(p => 
        p.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters.search) {
      const searchQuery = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      products.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'rating':
            comparison = a.rating - b.rating;
            break;
          case 'newest':
            comparison = new Date(a.dateCreated.$date).getTime() - new Date(b.dateCreated.$date).getTime();
            break;
        }

        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return products;
  }

  getBrands(): string[] {
    const products = this.getAllProducts();
    const brands = [...new Set(products.map(p => p.brand))];
    return brands.sort();
  }

  getPriceRange(): { min: number; max: number } {
    const products = this.getAllProducts();
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }
}

export const dataService = new DataService();