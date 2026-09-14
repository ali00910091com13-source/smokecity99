import { useState, useEffect } from 'react';
import { productsDB, blogDB, database } from '../services/database';
import { products as defaultProducts } from '../data/products';
import { blogPosts as defaultBlogPosts } from '../data/blog';

// Custom hook to get products from database
export function useProducts() {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await database.init();
        const dbProducts = await productsDB.getAll();
        if (dbProducts.length > 0) {
          setProducts(dbProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Listen for database changes
    const interval = setInterval(loadProducts, 2000);
    return () => clearInterval(interval);
  }, []);

  return { products, loading };
}

// Custom hook to get blog posts from database
export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        await database.init();
        const dbPosts = await blogDB.getAll();
        if (dbPosts.length > 0) {
          setBlogPosts(dbPosts);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();

    // Listen for database changes
    const interval = setInterval(loadBlogPosts, 2000);
    return () => clearInterval(interval);
  }, []);

  return { blogPosts, loading };
}
