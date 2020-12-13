import { NextApiRequest, NextApiResponse } from 'next';

import { getAllProducts } from '../../lib/db-admin';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const products = await getAllProducts();
  res.status(200).json(products);
};
