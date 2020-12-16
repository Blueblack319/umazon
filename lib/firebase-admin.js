import * as admin from 'firebase-admin';

const adminConfig = {
  client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
