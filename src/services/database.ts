// IndexedDB Service - Real Database in Browser
// Works like SQL database, persistent and powerful

const DB_NAME = 'SmokeCityDB';
const DB_VERSION = 1;

class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create products table
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'id' });
          productStore.createIndex('category', 'category', { unique: false });
          productStore.createIndex('brand', 'brand', { unique: false });
        }

        // Create blog table
        if (!db.objectStoreNames.contains('blog')) {
          const blogStore = db.createObjectStore('blog', { keyPath: 'id' });
          blogStore.createIndex('category', 'category', { unique: false });
          blogStore.createIndex('date', 'date', { unique: false });
        }

        // Create orders table
        if (!db.objectStoreNames.contains('orders')) {
          const orderStore = db.createObjectStore('orders', { keyPath: 'id' });
          orderStore.createIndex('status', 'status', { unique: false });
          orderStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }

  // Generic CRUD operations
  async add<T>(storeName: string, item: T): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update<T>(storeName: string, item: T): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: any): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const database = new Database();

// Products API
export const productsDB = {
  getAll: () => database.getAll<any>('products'),
  add: (product: any) => database.add('products', product),
  update: (product: any) => database.update('products', product),
  delete: (id: number) => database.delete('products', id),
};

// Blog API
export const blogDB = {
  getAll: () => database.getAll<any>('blog'),
  add: (post: any) => database.add('blog', post),
  update: (post: any) => database.update('blog', post),
  delete: (id: number) => database.delete('blog', id),
};

// Orders API
export const ordersDB = {
  getAll: () => database.getAll<any>('orders'),
  add: (order: any) => database.add('orders', order),
  update: (order: any) => database.update('orders', order),
};
