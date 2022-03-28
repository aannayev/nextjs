import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://hello:Wb5vh4dpVHeceYlj@cluster0.ntnnd.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsColletion = db.collection("meetups");
    const result = await meetupsColletion.insertOne({ data });
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
