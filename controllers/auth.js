const Auth = require('../services/auth.services')
const { errorHandler } = require('../utils/error')


exports.login = async (req, res) => {
    try {
        const {  token } = await Auth.loginAdmin(req.body)
        res.status(200).json({ token })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.userLogin = async (req, res)=>{
    try {
        const { token } = await Auth.Users(req.body)
        console.log(token)
        res.status(200).json({ token })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.AdminType = async ( req,res ) =>{
    try {
        const userType = await Auth.userType(req.body)
        res.status(200).json({ userType })
    } catch (error) {
        errorHandler(error, res)
    }
}