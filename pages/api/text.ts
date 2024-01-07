import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	return res.status(200).json({ text: 'Hello' });
};

export default handler;
