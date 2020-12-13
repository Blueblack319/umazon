import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/firebase-admin';

import { getUserProducts } from '../../lib/db-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = await auth.verifyIdToken(req.headers.token! as string);
  const products = await getUserProducts(uid);
  res.status(200).json(products);
};
