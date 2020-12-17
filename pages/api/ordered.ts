import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../lib/firebase-admin';
import { getOrderedProducts } from '../../lib/db-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = await auth.verifyIdToken(req.headers.token! as string);
  const ordered = await getOrderedProducts(uid);
  res.status(200).json(ordered);
};
