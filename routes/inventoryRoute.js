// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build detail
router.get("/detail/:inventoryId", invController.buildByInventoryId);

// route to build management
router.get("/management/", invController.buildManagement);

// route to build add-classification
router.get("/add-classification/", invController.buildAddClassification);

// route to build add-classification
router.get("/add_inventory/", invController.buildAddInventory);

module.exports = router;