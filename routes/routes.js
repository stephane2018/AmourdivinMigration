import { Router } from "express";
import { createRecipe, deleteRecipe, deleteRecipes, showRecipes, updateRecipe } from "../controllers/recipeControllers.js";
import{createCommentaires, deleteCommentaires, getComments} from "../controllers/commentaires.js";
import { createUsers, deleteUsers, getUsers, registerUserinAuth } from "../controllers/users.js";
import { createPostes, deleteposts, replaceUserIdInPostes } from "../controllers/posts.js";
import { createCategories, deleteCategories } from "../controllers/categories.js";
import { createTags, deleteTags, getTags } from "../controllers/tags.js";
import { createSubscribes, deleteSubscribes, getSubscribes } from "../controllers/suscribe.js";
import { createPostAudios, deletepostsAudios } from "../controllers/postAudio.js";
import { createAudios, deleteAudios } from "../controllers/audios.js";
import { createSettings } from "../controllers/settings.js";

const router = Router();
router.get("/api/v1/getRecipes", showRecipes );
router.post("/api/v1/createRecipe", createRecipe );
router.delete("/api/v1/deleteRecipes", deleteRecipes );
router.delete("/api/v1/deleteRecipe/:id", deleteRecipe );
router.patch("/api/v1/updateRecipe/:id", updateRecipe );

router.get("/api/v1/getComments", getComments)
router.post("/api/v1/createCommentaires", createCommentaires)
router.delete("/api/v1/deleteCommentaires", deleteCommentaires)

router.get('/api/v1/getUsers', getUsers);
router.delete('/api/v1/deleteUsers', deleteUsers);
router.post('/api/v1/createUser', createUsers);
router.post('/api/v1/registerUserinAuth', registerUserinAuth);

router.get('/api/v1/getCategories', createCategories);
router.delete('/api/v1/deleteCategories', deleteCategories);
router.post('/api/v1/createCategories', createCategories);

router.post('/api/v1/createPostAudios', createPostAudios);
router.delete('/api/v1/deletepostsAudios', deletepostsAudios);

router.post('/api/v1/createAudios', createAudios);
router.delete('/api/v1/deleteAudios', deleteAudios);

router.post('/api/v1/modifypost', replaceUserIdInPostes)
router.post('/api/v1/createPosts', createPostes)
router.delete('/api/v1/deletePosts', deleteposts)

router.get("/api/v1/gettags", getTags)
router.post("/api/v1/createTags", createTags)
router.delete("/api/v1/deleteTags", deleteTags)


router.get("/api/v1/getSubscribers", getSubscribes)
router.post("/api/v1/createSubscribers", createSubscribes)
router.delete("/api/v1/deleteSubscribers", deleteSubscribes)
router.delete("/api/v1/registerUserinAuth", registerUserinAuth)

router.post("/api/v1/createSettings", createSettings)

export default router;