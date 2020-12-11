import { firebaseInstance, dbService } from './firebase';

export function createUser(uid, data) {
  return dbService
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createProduct(data) {
  const product = dbService.collection('products').doc();
  product.set(data);

  return product;
}
