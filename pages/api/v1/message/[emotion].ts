import { NextApiRequest, NextApiResponse } from 'next';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/lib/ddbDocClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
  const { emotion } = req.query;

  try {
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        BOOK: 'default',
        emotion: emotion,
      },
    });
    const { Item } = await ddbDocClient.send(command);

    if (!Item)
      return res.status(404).json({
        message: 'Not Found',
      });
    return res.status(200).json({ data: Item });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: '서버 에러 발생했습니다.',
    });
  }
};

export default handler;
