import { database } from "../server.js";
import { Query } from "node-appwrite";
const COLLECTION_ID = "comments";
const DATABASE_ID = "default";

export const createCommentaires = async (req, res) => {
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

export const deleteCommentaires = async (req, res) => {
  const id = req.params.id;
  const data = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [], 100);
  let count=0;
  try {
    data.documents.forEach(async element => {
      console.log(element.$id)
      if(element){
           await database.deleteDocument(DATABASE_ID, COLLECTION_ID, element.$id);
         
      }
      console.log(count);
      count++;
    });
    
    res.status(200).json('true');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 
};

export const getComments = async (req, res) => {
  try {
    const data = await database.listDocuments(DATABASE_ID, COLLECTION_ID, undefined, undefined, undefined, "DESC" );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deltetedRecipe = await database.deleteDocument(COLLECTION_ID, id);
    res.status(200).json(deleteRecipe);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};
export const deleteRecipes = async (req, res) => {
  const id = req.params.id;
  const data = await database.listDocuments(DATABASE_ID, COLLECTION_ID, undefined, undefined, undefined, "DESC" );
  let count=0
  data.documents.forEach(element => {
    console.log(element.$id)
    try {
      const deltetedRecipe = database.deleteDocument(DATABASE_ID, COLLECTION_ID, element.$id);
      res.status(200).json(deleteRecipe);
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
    count++;
  });
};

export const updateRecipe = (req, res) => {
  const id = req.params.id;
  const updatedRecipe = req.body;

  try {
    const newRecipe = database.updateDocument(COLLECTION_ID, id, updatedRecipe);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
