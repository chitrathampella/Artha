const express = require ('express')
const { addTransaction, getAllTransaction } = require('../controllers/transactionCtrl')
 
const router = express.Router()

router.post('/add-transaction', addTransaction)

router.post('/get-transactions', getAllTransaction)

module.exports=router