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
*  Build account management
* ************************** */
invCont.buildAccountManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render('inventory/account-management', {
  title: 'Account Management',
  nav,
  error: null


  })
}

invCont.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
}



/* ***************************
 *  Build update account
 * ************************** */
invCont.buildUpdateAccount = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render('inventory/update-account', {
  title: 'Update Account',
  nav,
  errors: null


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
  errors: null


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
  errors: null


  })
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildEdit = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryId(inv_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit", {
    title: "Edit " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}





/* ***************************
 *  Build delete confirmationw
 * ************************** */
invCont.getDeleteConfirmationView  = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id, 10);
  try {
      const inventory = await inventoryModel.getInventoryId(inv_id);
      const nav =  await utilities.getNav()
      res.render('inventory/delete-confirm', {
          title: 'Delete Confirmation',
          nav,
          inventory,
          errors: null
      });
  } catch (error) {
      console.error('Error fetching inventory for delete confirmation:', error);
      res.status(500).send('Server Error');
  }
}





module.exports = invCont