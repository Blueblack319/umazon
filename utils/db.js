import { firebaseInstance, dbService } from './firebase';

export function createUser(uid, data) {
  return dbService
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
