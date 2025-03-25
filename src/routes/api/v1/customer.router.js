const express  = require('express');
const { customerController } = require('../../../controller');

const customer = express.Router()

// localhost:8000/api/v1/customer/list-customer
customer.get(
  "/list-customer",

  customerController.listCustomer
);

//localhost:8000/api/v1/customer/add-customer
customer.get(
    "/add-customer",
  
    customerController.addCustomer
  );

module.exports = customer