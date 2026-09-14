import { collection, doc, setDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Order } from '../context/AppContext';

const ORDERS_COLLECTION = 'orders';

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Add order
export const addOrder = async (order: Order): Promise<void> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(orderRef, order);
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
