const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by inventory vehicle
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventorydetails(inventory_id)
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const vehicle = data[0].inventory_name
  res.render("./inventory/inventory", {
    title: vehicle ,
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventory by management
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render('inventory/management', {
  title: 'Management',
  nav,


  })
}

/* ***************************
 *  Build inventory by add classification
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render('inventory/add-classification', {
  title: 'Add classification',
  nav,


  })
}
/* ***************************
 *  Build inventory by add Inventory
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render('inventory/add_inventory', {
  title: 'Add Inventory',
  nav,


  })
}





module.exports = invCont