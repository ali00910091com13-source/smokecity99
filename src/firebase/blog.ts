import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BlogPost } from '../data/blog';

const BLOG_COLLECTION = 'blog';

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, BLOG_COLLECTION));
    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.data().id, ...doc.data() } as BlogPost);
    });
    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
};

// Add or update blog post
export const saveBlogPost = async (post: BlogPost): Promise<void> => {
  try {
    const postRef = doc(db, BLOG_COLLECTION, post.id.toString());
    await setDoc(postRef, post);
  } catch (error) {
    console.error('Error saving blog post:', error);
    throw error;
  }
};

// Delete blog post
export const deleteBlogPost = async (postId: number): Promise<void> => {
  try {
    const postRef = doc(db, BLOG_COLLECTION, postId.toString());
    await deleteDoc(postRef);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
