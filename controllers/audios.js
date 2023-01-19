import { database } from "../server.js";
import { Query } from "node-appwrite";
const COLLECTION_ID = "Audios";
const DATABASE_ID = "default";

export const createAudios = async (req, res) => {
  console.log(req.body.length);
  // const { name, recipe, ingredients } = req.body;
  for (let index = 0; index < req.body.length; index++) {
    console.log(index);
    const element = req.body[index];
   
    await database.createDocument(DATABASE_ID,COLLECTION_ID,"unique()",element).catch((err)=>{
            res.status(400).json({ error: err });
    });
    
  }
  // const newRecipe = {
  //   name: name,
  //   recipe: recipe,
  //   ingredients: ingredients,
  //   created_date: Date.now(),
  // };
};

export const getAudios = async (req, res) => {
    return  await database.listDocuments(DATABASE_ID, COLLECTION_ID, req.body.id);
};

export const deleteAudios = async (req, res) => {
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
  