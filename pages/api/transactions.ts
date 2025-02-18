// pages/api/transactions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    // Use a specific database (e.g., 'finance')
    const db = client.db('finance');

    if (req.method === 'GET') {
      const transactions = await db.collection('transactions').find({}).toArray();
      res.status(200).json(transactions);
    } else if (req.method === 'POST') {
      const transaction = req.body;
      const result = await db.collection('transactions').insertOne(transaction);
      res.status(201).json({ ...transaction, _id: result.insertedId });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing id parameter' });
      const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id as string) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Transaction not found' });
      } else {
        res.status(200).json({ message: 'Transaction deleted' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
