import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('club_web');

  switch (req.method) {
    case 'GET':
      try {
        const items = await db.collection('items').find({}).toArray();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const newItem = req.body;
        const result = await db.collection('items').insertOne(newItem);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
