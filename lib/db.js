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
    const userRef = dbService.collection('users').doc(uid);
    await dbService.runTransaction(function (transaction) {
      return transaction.get(userRef).then((doc) => {
        let ordersUpdated;
        let orderDetailsUpdated;
        const newOrders = data.map((order) => order.id);
        if (doc.data().orders) {
          ordersUpdated = [...doc.data().orders, ...newOrders];
          orderDetailsUpdated = [...doc.data().orderDetails, ...data];
        } else {
          ordersUpdated = [...newOrders];
          orderDetailsUpdated = [...data];
        }
        transaction.update(userRef, {
          orders: ordersUpdated,
          orderDetails: orderDetailsUpdated,
        });
      });
    });

    await data.forEach((product) => {
      const productRef = dbService.collection('products').doc(product.id);

      dbService.runTransaction(function (transaction) {
        return transaction.get(productRef).then((productDoc) => {
          const quantityUpdated = productDoc.data().quantity - product.quantity;
          transaction.update(productRef, { quantity: quantityUpdated });
        });
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteProduct(productId, ownerId) {
  try {
    const productRef = dbService.collection('products').doc(productId);
    await productRef.delete();

    const batch = dbService.batch();
    const userIds = [];
    const newOrders = [];
    const newOrderDetails = [];

    await dbService
      .collection('users')
      .where('orders', 'array-contains', productId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userRef = dbService.collection('users').doc(doc.id);
          const newOrders = doc
            .data()
            .orders.filter((order) => order !== productId);
          const newOrderDetails = doc
            .data()
            .orderDetails.filter((detail) => detail.id !== productId);
          batch.update(userRef, {
            orders: newOrders,
            orderDetails: newOrderDetails,
          });
        });
      });
    batch.commit();
  } catch (err) {
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
