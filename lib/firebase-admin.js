import * as admin from 'firebase-admin';

const firebase_private_key_bs64 = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY,
  'base64'
);
const firebase_private_key = firebase_private_key_bs64.toString('utf-8');

const adminConfig = {
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: firebase_private_key,
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
