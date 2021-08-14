import { connectDB } from '../../helpers/db-util';
import { insertDocument } from '../../helpers/db-util';
import { getDocument } from '../../helpers/db-util';

async function handler(req, res) {
  ///////// Establish DB Connection
  let client;
  try {
    client = await connectDB();
  } catch (err) {
    res.status(500).json({ type: 'failed', message: 'Cannot connect to DB' });
    return;
  }

  if (req.method === 'POST') {
    const { eventId } = req.query;
    const commentData = req.body;

    ////// Input Validation
    if (!eventId || !commentData) {
      res.status(500).json({ type: 'failed', message: 'Missing data...' });
      client.close();
      return;
    }

    try {
      await insertDocument(client, 'comments', { eventId, ...commentData });
      res.status(200).json({ type: 'success', message: 'Comment added!' });
    } catch (err) {
      res.status(500).json({ type: 'failed', message: 'Cannot insert comment...' });
    }
  }

  if (req.method === 'GET') {
    const { eventId } = req.query;

    try {
      const comments = await getDocument(client, 'comments');
      res.status(200).json({ type: 'success', comments });
    } catch (err) {
      res.status(500).json({ type: 'failed', message: 'Cannot get comments...' });
    }
  }
  client.close();
}

export default handler;
