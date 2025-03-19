const Vendor = require("../models/Vendor");

// Get all vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

// Get a single vendor by ID
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor", error });
  }
};

// Create a new vendor
const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error creating vendor", error });
  }
};

// Assign a vendor to an event
const assignVendorToEvent = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.event_id = req.body.event_id;
    await vendor.save();

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error assigning vendor to event", error });
  }
};

// Delete a vendor
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    await vendor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting vendor", error });
  }
};

module.exports = { getAllVendors, getVendorById, createVendor, assignVendorToEvent, deleteVendor };
