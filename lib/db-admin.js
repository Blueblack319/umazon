import { db } from './firebase-admin';

export async function getAllProducts() {
  const snapshot = await db.collection('products').get();
  const products = [];

  snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

  return products;
}

export async function getUserProducts(uid) {
  const snapshot = await db
    .collection('products')
    .where('ownerId', '==', uid)
    .get();

  const products = [];

  snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

  products.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );
  return products;
}
