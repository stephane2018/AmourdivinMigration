import { database } from "../server.js";
const COLLECTION_ID = "general_settings";
const DATABASE_ID = "default";

export const createSettings = async (req, res) => {
    console.log(req.body);
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