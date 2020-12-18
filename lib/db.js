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
    throw new Error(err.message);
  }
}

export async function orderProducts(uid, data) {
  try {
    const snapshot = dbService.collection('users').doc(uid);

    dbService.runTransaction(function (transaction) {
      return transaction.get(snapshot).then((doc) => {
        const newData = [...doc.data().ordered, ...data];
        transaction.update(snapshot, { ordered: newData });
        return data;
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
