const express = require("express");
const router = express.Router();
const { getAllVendors, getVendorById, createVendor, assignVendorToEvent, deleteVendor } = require("../controllers/vendorController");

router.get("/", getAllVendors);
router.get("/:id", getVendorById);
router.post("/", createVendor);
router.put("/:id/assign", assignVendorToEvent);
router.delete("/:id", deleteVendor);

module.exports = router;
