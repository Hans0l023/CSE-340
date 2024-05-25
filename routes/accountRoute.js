const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const invController = require('../controllers/invController')

// Route to build login
router.get("/login", accountController.buildLogin);


// route to build register
router.get("/register", accountController.buildRegister);

router.get("/account", (accountController.buildAccount))


// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
  )

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

module.exports = router;

