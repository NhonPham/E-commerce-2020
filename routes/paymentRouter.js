const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleWare/authAdmin.js");
const authAdmin = require("../middleWare/authAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, paymentController.getPayments)
  .post(auth, paymentController.createPayment);

module.exports = router;
