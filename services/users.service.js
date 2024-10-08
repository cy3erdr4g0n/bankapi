const db = require('../model');


const { AppError } = require('../utils/error');

 

class UserService {
    
    async getUserData(id) {
        try {
            const User = await db.User.findOne({
                where: { membershipId: id },
                include: [
                    {
                        model: db.User
                    }
                ]
            });
            if (!User) {
                throw new AppError('User not found', 404);
            }
            return User;
        } catch (error) {
            throw error;
        }
    }
    
    async getUsersData(id) {
        try {
            const User = await db.User.findAll();
            if (!User) {
                throw new AppError('User not found', 404);
            }
            return User;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = new UserService();