const express = require("express");
const { check } = require("express-validator");
const userControllers = require("../controllers/users-controllers");
const router = express();

router.get("/", userControllers.getUser);
router.post(
   "/signup",
   [
      check("name").not().isEmpty(),
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 5 }),
   ],
   userControllers.signup
);
router.post("/login", userControllers.login);

module.exports = router;
