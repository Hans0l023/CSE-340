const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build login
router.get("/login", accountController.buildLogin);


// route to build register
router.get("/register", accountController.buildRegister);

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
  )

module.exports = router;
