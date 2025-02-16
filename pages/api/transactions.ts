// pages/api/transactions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    // Replace 'financeDB' with your desired database name
    const db = client.db('financeDB');

    switch (req.method) {
      case 'GET': {
        const transactions = await db.collection('transactions').find({}).toArray();
        return res.status(200).json(transactions);
      }
      case 'POST': {
        const transaction = req.body;
        // Insert the new transaction
        const result = await db.collection('transactions').insertOne(transaction);
        // Return the inserted document along with its _id
        return res.status(201).json({ ...transaction, _id: result.insertedId });
      }
      case 'DELETE': {
        // Expect the id to be passed as a query parameter
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Missing id parameter' });
        }
        const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id as string) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Transaction not found' });
        }
        return res.status(200).json({ message: 'Transaction deleted' });
      }
      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database connection error' });
  }
}
