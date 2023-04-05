import { db } from "./connectDb.js";
import { ObjectId } from "mongodb";

const coll = db.collection("plants");

// CRUD: GET 
export async function getAllPlants(req, res) {
  const plants = await coll.find({}).toArray();
  res.send(plants);
}

// CRUD: POST
export async function addPlant(req, res) {
  const newPlant = req.body;
  await coll.insertOne(newPlant);
  res.status(201).send({ message: "new plant added" });
}

// CRUD: DELETE
export async function deletePlant(req, res) {
  const docId = { "_id": new ObjectId(req.params.docId) };

  await coll.deleteOne( docId );
  res.status(201).send( { message: "plant has been sadly deleted"});
}

// CRUD: UPDATE
export async function updatePlant(req, res) {
  const docId = { "_id": new ObjectId(req.params.docId) };
  const updatePlant = req.body;

  await coll.findOneAndUpdate( 
    { "_id" : docId},
    { $set: { updatePlant} }
  );
  res.status(201).send( { message: "plant has been updated"});
}









// db.collection.updateOne(
//   db.restaurant.updateOne(
//     { "name" : "Central Perk Cafe" },
//     { $set: { "violations" : 3 } }
//  );
