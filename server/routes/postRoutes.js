const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const { upload } = require("../utils/fileUpload");

const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", verifyJWT, upload.single("image"), postController.createPost);
router.delete("/:id", verifyJWT, postController.deletePost);
router.put("/:id", verifyJWT, upload.single("image"), postController.updatePost);

module.exports = router;