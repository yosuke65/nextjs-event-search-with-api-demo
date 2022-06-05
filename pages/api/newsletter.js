import { connectDatabase, insertDocument } from "../../helpers/db.util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return error;
    }

    try {
      await insertDocument(client, "newsletter", "emails", {
        email: userEmail,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to insert a document!" });
      return error;
    }
    client.close();

    res.status(201).json({ message: "Signed Up" });
  }
}

export default handler;
