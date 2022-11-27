import { Query } from "node-appwrite";
import { database } from "../server.js";
const COLLECTION_ID = "tags";
const DATABASE_ID = "default";

export const replaceUserIdInTags = async (req, res) => {
    try {
      const Tags =  await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
        Query.limit(100),
        Query.cursorAfter('62dfa850aa5a6c194374')
      ]);
      const userList=  await database.listDocuments('default', 'users',[
        Query.limit(100),
      ]);
      let i=0;
      Tags.documents.forEach(async (poste)=>{
         const author= userList.documents.find((c)=>c.id===poste.user_id);
        if(author){
          await database.updateDocument(DATABASE_ID, COLLECTION_ID, poste.$id, {
           'user_id': author.$id
          }).catch((err)=>{
            console.log(err);
            res.status(400).json({ error: err.message });
          });
        }
         i++;
         console.log(i);
      })
    
      res.status(200).json('ok');
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  };

  export const getTags = async (req, res) => {
      try {
        const data = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        res.status(200).json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  
    
  };
  
  export const createTags = async (req, res) => {
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
  

  export const deleteTags = async (req, res) => {
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
  