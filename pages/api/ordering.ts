import { NextApiRequest, NextApiResponse } from 'next';

import { orderProducts } from '../../lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await orderProducts(req.body.uid, req.body.orderedProducts);

  res.status(200).json(req.body.orderedProducts);
};
