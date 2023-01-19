import { ID, Query, Users } from "node-appwrite";
import { database, user } from "../server.js";
const COLLECTION_ID = "users";
const DATABASE_ID = "default";

export const createUsers = async (req, res) => {
  console.log(req.body.length);
  // const { name, recipe, ingredients } = req.body;
  for (let index = 0; index < req.body.length; index++) {
    console.log(index);
    const element = req.body[index];
    const newUser={
        ...element, 
        userId: ''
    }
    await database.createDocument(DATABASE_ID,COLLECTION_ID,"unique()",newUser).catch((err)=>{
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

export  const registerUserinAuth=async (req, res)=>{
  try {
    // console.log(req.body.filter((element)=>element.user_type==="registered").length);
    // res.status(400).json({ data: req.body.filter((element)=>element.user_type==="registered") });
    const filterList=req.body.filter((element)=>element.user_type==="registered");
    for (let index = 0; index <filterList.length; index++) {
      const element = filterList[index];
      console.log(element);
        await user.createBcryptUser(
          ID.unique(),
          element.email,
          element.password,
          element.username
        );
    }
    
  } catch (error) {
    console.log(error)
  }
}
export  const deleteUsersAuth=async (req, res)=>{
  console.log(req.body.length);
  // const { name, recipe, ingredients } = req.body;
  let count= 0;
  var userWithPassword=  await database.listDocuments(DATABASE_ID, COLLECTION_ID, [], 200);
  for (let index = 0; index < userWithPassword.documents.length; index++) {
    console.log(index);
    const element =  userWithPassword.documents[index];
    if(element.user_type==="registered"){
      let  res = user.list(null, [Query.equal('email', 
      element.email)]);
      res.then(function (response) {
        if(response.users===undefined){
            user.delete(
            ID.unique(),
            element.email,
            element.password,
            element.username
          );
        }
      }, function (error) {
          console.log(error);
          console.log('the email is : ', element.email);
      });
    }
    count++;
    
  }
}