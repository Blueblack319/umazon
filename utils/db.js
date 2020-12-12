import { firebaseInstance, dbService, storageService } from './firebase';
import { v4 as uuidv4 } from 'uuid';

const storageRef = storageService.ref();

export function createUser(uid, data) {
  return dbService
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function createProduct(data) {
  try {
    const imageRef = storageRef.child(`${data.ownerId}/${uuidv4()}`);
    const response = await imageRef.put(data.img);
    const imageUrl = await response.ref.getDownloadURL();

    const productData = {
      ...data,
      img: imageUrl,
    };
    const products = dbService.collection('products').doc();

    await products.set(productData);

    return productData.productName;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
  const snapshot = await dbService.collection('products').get();
  const products = [];

  snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));

  return products;
}
