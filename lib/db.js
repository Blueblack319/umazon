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
    const productData = await sortProductData(data);
    const snapshot = dbService.collection('products').doc();

    await snapshot.set(productData);

    return productData.productName;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function editProduct(data, id) {
  try {
    const productData = await sortProductData(data);
    const snapshot = dbService.collection('products').doc(id);

    await snapshot.update(productData);

    return productData.productName;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function orderProducts(uid, data) {
  try {
    const snapshot = dbService.collection('users').doc(uid);

    dbService.runTransaction(function (transaction) {
      return transaction.get(snapshot).then((doc) => {
        let newData;
        if (doc.data().ordered) {
          newData = [...doc.data().ordered, ...data];
        } else {
          newData = [...data];
        }
        transaction.update(snapshot, { ordered: newData });
        return data;
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

async function sortProductData(data) {
  const imageRef = storageRef.child(`${data.ownerId}/${uuidv4()}`);
  const response = await imageRef.put(data.img);
  const imageUrl = await response.ref.getDownloadURL();

  return {
    ...data,
    img: imageUrl,
  };
}
