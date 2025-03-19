const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Customer Registration
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Customer registered successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Error registering customer", error });
  }
};

// Customer Login
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, customer });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

module.exports = { registerCustomer, loginCustomer };
