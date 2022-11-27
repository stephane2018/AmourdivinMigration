import { database } from "../server.js";
const COLLECTION_ID = "users";
const DATABASE_ID = "default";

export const createUsers = async (req, res) => {
  console.log(req.body.length);
  // const { name, recipe, ingredients } = req.body;
  for (let index = 0; index < req.body.length; index++) {
    console.log(index);
    const element = req.body[index];
    await database.createDocument(DATABASE_ID,COLLECTION_ID,"unique()",element).catch((err)=>{
      console.log(err);
            res.status(400).json({ error: err });
    });
    
  }
};

export const getUsers = async (req, res) => {
    try {
      const data = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

export const getUsersList = async (req, res) => {
    return await database.listDocuments(DATABASE_ID, COLLECTION_ID);
  };

export const deleteUsers = async (req, res) => {
    const id = req.params.id;
    const data = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [], 100);
    let count=0;
    try {
      data.documents.forEach(async element => {
        console.log(element.$id)
        if(element){
           await database.deleteDocument(DATABASE_ID, COLLECTION_ID, element.$id);
        }
        count++;
      });
      res.status(200).json('true');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
   
  };