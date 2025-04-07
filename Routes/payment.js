const express = require('express');
const router = express.Router();
const PaymentController = require('../Controller/PaymentController');

// http://localhost:8000/api/v1/payment/create
router.post('/create', PaymentController.createPayment);

// Get all payments (for admin)
router.get('/all', PaymentController.getAllPayments);

// Get payment by ID
router.get('/:id', PaymentController.getPaymentById);

module.exports = router; 