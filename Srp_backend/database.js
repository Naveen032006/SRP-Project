let { MongoClient } = require("mongodb")
async function Insertdata(data) {
  const client = new MongoClient("mongodb://localhost:27017/")
  await client.connect()
  const db = await client.db("Redressal_database")
  const collection = await db.collection("Complaints")
  await collection.insertOne(data)
  console.log("data Inserted")
}
async function Deletedata(data) {
  const client = new MongoClient("mongodb://localhost:27017/")
  await client.connect()
  const db = await client.db("Redressal_database")
  const collection = await db.collection("Complaints")
  await collection.deleteOne({ label: data.label })
  console.log("data Inserted")
}

module.exports = { Insertdata, Deletedata }