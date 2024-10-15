const db = require('../model');
const { AppError } = require('../utils/error');
const transferHistory = db.Transaction
const userModels = db.User

class Transaction {


    async createTransaction(data,userId){
        try {
            const { transaction_amount, transaction_type, transfer_to, description } = data;
            if (!userId){new AppError('login', 400)}
            const account = await db.Account.findOne({where : { UserId : userId}})
            if (transaction_amount <= 50){AppError("Transaction amount must be greater than 0",400);}
            if (transaction_type !== "withdrawal" && transaction_type !== "transfer"){new AppError("Transaction type must be withdrawal or transfer",400);}
            if (account) {if (transaction_type === "withdrawal"){account.AccountBalance  = parseInt(account.AccountBalance ) - parseInt(transaction_amount)}
            if (account.AccountBalance <= 50) { new AppError("Insufficient funds",400);}
            else if (transaction_type === "transfer") {account.AccountBalance =parseInt(account.AccountBalance) - parseInt(transaction_amount);}
            if (account.AccountBalance <= 50){ new AppError("Insufficient funds",400)}
            const transferToAccount = await db.Account.findOne({where : { AccountNumber: transfer_to}})
            if (transferToAccount) {
                transferToAccount.AccountBalance = parseInt(transferToAccount.AccountBalance) + parseInt(transaction_amount);
                console.log(transferToAccount)
                await transferToAccount.save()
            }else{
                AppError("Account not found",400)
            }
            await account.save()
            const generateTransferId = Math.floor(10000 + Math.random() * 900)
            const transaction = transferHistory.create({
                Transaction_Id : generateTransferId,
                UserId : userId,
                Account_id : transferToAccount.UserId,
                Transaction_message : description,
                Transaction_amount : transaction_amount,
                Transaction_Type : transaction_type,

            })
          }
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

    async getBalance(userId){
        try{
            if (!userId){throw new AppError('login', 400)}
            const getBalance = await db.Account.findOne({where : { UserId : userId}})
            return  getBalance.AccountBalance
        } catch(error){
            throw error
        }
    }

    async AccountName(data){
        try {
            if(!data){throw new AppError('invalid detail', 400)}
            null
            const accountNumber = db.Account.findOne({where : {AccountNumber : data }})
            if (!accountNumber){new AppError("check the account",400);}
            const accountName = db.User.findOne({ where : { userId : accountNumber.UserId}})
            return {
                first_name : accountName.firstname,
                last_name : accountName.lastname,
                middle_name : accountName.middlename
            }
        } catch (error) {
            throw error
        }
    }


}


module.exports  = new Transaction()