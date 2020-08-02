// global var
const express = require("express");
const { check } = require("express-validator");
// local var
const postControllers = require("../controllers/posts-controllers");
const router = express.Router();
// routers
router.get("/:pid", postControllers.getPostById);
router.get("/user/:uid", postControllers.getPostByUserId);
router.post(
   "/",
   [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
   postControllers.createPost
);
router.delete("/:pid", postControllers.deletePost);
// export
module.exports = router;
