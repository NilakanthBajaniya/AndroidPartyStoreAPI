const express = require('express');
const router = express.Router();

const ctrlInventory = require("../controller/inventoryController");

router.get("/",ctrlInventory.getInventories);
router.get("/:inventoryid",ctrlInventory.getSingleInventory);
router.get("/review/:inventoryId/:reviewId", ctrlInventory.getReviewById)

router.post("/",ctrlInventory.createInventory);
router.delete("/:inventoryid",ctrlInventory.deleteInventory);

module.exports = router;