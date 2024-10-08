const db = require('../model');
const transferHistory = db.Transaction
const transfer = db.Account
const userModels = db.User

class Transaction {

    async transfer(data){
        try {
            
        } catch (error) {
            throw error
        }
    }

    async transferHistory(userId){
        try {
            const transferHistory = await transferHistory.findAll({
                where : { userId : userId }
            })
            return transferHistory
        } catch (error) {
            throw error
        }
    }


}


module.exports  = new Transaction()