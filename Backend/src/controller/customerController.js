import path from "path";
import { fileURLToPath } from "url";
import { readJSON } from "../utils/jsonDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customersPath = path.join(
  __dirname,
  "../data/customers.json"
);

export const getCustomers = async (req, res) => {
  try {
    const customers = await readJSON(customersPath);

    res.json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customerId = Number(req.params.id);

    const customers = await readJSON(customersPath);

    const customer = customers.find(
      (c) => c.id === customerId
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};