import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../data/products';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.data().id, ...doc.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Add or update product
export const saveProduct = async (product: Product): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, product.id.toString());
    await setDoc(productRef, product);
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
};

// Update product stock
export const updateProductStock = async (productId: number, stock: number): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId.toString());
    await updateDoc(productRef, { stock });
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId.toString());
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
