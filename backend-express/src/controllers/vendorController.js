const Vendor = require("../models/Vendor");
const Event = require("../models/Event"); // ✅ needed for relation

// ✅ Get all vendors including event name
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      include: {
        model: Event,
        as: "event",
        attributes: ["id", "name"]
      }
    });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor", error });
  }
};

const createVendor = async (req, res) => {
  try {
    const { name, service_type, contact_info, performance_rating } = req.body;
    const vendor = await Vendor.create({ name, service_type, contact_info, performance_rating });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error creating vendor", error });
  }
};

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

const updateVendorPerformance = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.performance_rating = req.body.performance_rating;
    await vendor.save();

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error updating performance", error });
  }
};

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

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  assignVendorToEvent,
  updateVendorPerformance,
  deleteVendor,
};
