const User = require('../services/users.service')

const { errorHandler } = require('../utils/error')

exports.getUserData = async (req, res) => {
    try {
        const { Id } = req.params;
        const member = await User.getUserData(Id);
        return res.status(200).json({ memberInfo: member });
    } catch (error) {
        errorHandler(error, res);
    }
}

exports.getUsersData = async (req, res) =>{
    try {
        const members = await User.getUsersData()
        return res.status(200).json({ userInfos: members });
    } catch (error) {
        errorHandler(error, res);
    }
} 


