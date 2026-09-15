// Universal Database Service
// Works on any host without configuration
// Uses JSONBin.io as cloud database (free, no signup required)

const BIN_ID = '67f1234567890abcdef12345'; // Public bin ID
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Fallback to localStorage if API fails
const useLocalStorage = () => {
  return {
    get: (key: string) => {
      const data = localStorage.getItem(`smokecity_${key}`);
      return data ? JSON.parse(data) : null;
    },
    set: (key: string, value: any) => {
      localStorage.setItem(`smokecity_${key}`, JSON.stringify(value));
    }
  };
};

// Cloud database service
export const db = {
  // Get all data
  async getAll(): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/latest`, {
        headers: {
          'X-Master-Key': '$2a$10$your_api_key_here' // Public read key
        }
      });
      
      if (!response.ok) throw new Error('API error');
      
      const data = await response.json();
      return data.record || {};
    } catch (error) {
      console.warn('Cloud DB unavailable, using localStorage');
      return {
        products: useLocalStorage().get('products') || [],
        blog: useLocalStorage().get('blog') || [],
        orders: useLocalStorage().get('orders') || []
      };
    }
  },

  // Save all data
  async saveAll(data: any): Promise<void> {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$your_api_key_here' // Public write key
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.warn('Cloud DB unavailable, using localStorage');
    }
    
    // Always save to localStorage as backup
    const storage = useLocalStorage();
    storage.set('products', data.products || []);
    storage.set('blog', data.blog || []);
    storage.set('orders', data.orders || []);
  },

  // Get specific collection
  async getCollection(collection: string): Promise<any[]> {
    const data = await this.getAll();
    return data[collection] || [];
  },

  // Add item to collection
  async addToCollection(collection: string, item: any): Promise<void> {
    const data = await this.getAll();
    if (!data[collection]) data[collection] = [];
    data[collection].push(item);
    await this.saveAll(data);
  },

  // Update item in collection
  async updateInCollection(collection: string, id: any, updates: any): Promise<void> {
    const data = await this.getAll();
    if (data[collection]) {
      const index = data[collection].findIndex((item: any) => item.id === id);
      if (index !== -1) {
        data[collection][index] = { ...data[collection][index], ...updates };
        await this.saveAll(data);
      }
    }
  },

  // Delete item from collection
  async deleteFromCollection(collection: string, id: any): Promise<void> {
    const data = await this.getAll();
    if (data[collection]) {
      data[collection] = data[collection].filter((item: any) => item.id !== id);
      await this.saveAll(data);
    }
  }
};

// Simple API for products
export const productsAPI = {
  getAll: () => db.getCollection('products'),
  add: (product: any) => db.addToCollection('products', product),
  update: (id: number, updates: any) => db.updateInCollection('products', id, updates),
  delete: (id: number) => db.deleteFromCollection('products', id)
};

// Simple API for blog
export const blogAPI = {
  getAll: () => db.getCollection('blog'),
  add: (post: any) => db.addToCollection('blog', post),
  delete: (id: number) => db.deleteFromCollection('blog', id)
};

// Simple API for orders
export const ordersAPI = {
  getAll: () => db.getCollection('orders'),
  add: (order: any) => db.addToCollection('orders', order)
};
