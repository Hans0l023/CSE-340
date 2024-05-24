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

// rote to get javascript for inventory
router.get("/getInventory/:classification_id", invController.getInventoryJSON);

// route to build add-classification
router.get("/add-classification/", invController.buildAddClassification);

// route to build add-classification
router.get("/add_inventory/", invController.buildAddInventory);


// Route to build inventory by edit view
router.get("/edit/:classificationId", invController.buildEdit);

// Route to update inventory
router.get("/modify_inventory/:classificationId", invController.updateInventory)


module.exports = router;