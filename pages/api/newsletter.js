import { connectDB } from '../../helpers/db-util';
import { insertDocument } from '../../helpers/db-util';

//////// POST Handler function
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'invalid email adress' });
      return;
    }

    let client;

    /////////// Establish DB Connection
    try {
      client = await connectDB();
    } catch (err) {
      res.status(500).json({ type: 'failed', message: 'Cannot connect to DB' });
      return;
      // if you don't return app will break because you cannot make DB queries without a connection
    }

    /////////// Make DB Calls (insert document)
    try {
      await insertDocument(client, 'newsletterEmails', { email: email });
      /////////// Close Connection
      await client.close();
    } catch (err) {
      res.status(500).json({ type: 'failed', message: 'Failed to insert document' });
      return;
    }

    /////////// If all good, send response to client
    res.status(200).json({ type: 'success', message: 'signed up' });
  }
};

export default handler;
