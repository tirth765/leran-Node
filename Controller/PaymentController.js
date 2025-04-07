const Payment = require('../Model/Payment');

exports.createPayment = async (req, res) => {
    try {
        const { items, totalAmount, paymentDetails, orderDate, status } = req.body;

        // Create new payment record
        const payment = new Payment({
            items: items.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                Qty: item.Qty
            })),
            totalAmount,
            paymentDetails,
            orderDate,
            status
        });

        await payment.save();

        res.status(200).json({
            success: true,
            message: "Payment processed successfully",
            data: payment
        });
    } catch (error) {
        console.error('Payment creation error:', error);
        res.status(500).json({
            success: false,
            message: "Payment processing failed",
            error: error.message
        });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch payments",
            error: error.message
        });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch payment",
            error: error.message
        });
    }
}; 