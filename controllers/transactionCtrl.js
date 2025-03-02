const transactionModel = require('../models/transactionModel')


const getAlltransaction = async(req,res) => {
    try {
        const transactions = await transactionModel.find({
            
        })
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const addtransaction = async(req,res) => {
    try {
        const newtransaction = new transactionModel(req.body)
        await newtransaction.save()
        res.status(201).send('transaction created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {getAlltransaction, addtransaction}