const db = require('../model')
const { AppError } = require('../utils/error')
const Admin = db.Admin
const Worker = db.workers
const bcrypt = require('bcrypt')
const userModels = db.User

class AuthService {
    async loginAdmin(data) {
        try {
            let user;
            const { username, password, usertype } = data;
            if (!username || !password || !usertype) {
                throw new AppError('Please provide username, password and user type', 400);
            }
            const userModels = {
                admin: {
                    model: Admin,
                },
                worker: {
                    model: Worker,
                }
            };
            const userModel = userModels[usertype];
            if (!userModel) {
                throw new AppError(`Invalid user type: ${usertype}`, 401);
            }
            const foundUser = await userModel.model.findOne({
                where: { username: username }
            });
            if (!foundUser) {
                throw new AppError('Invalid Username', 401);
            }
            const isValid = await bcrypt.compare(password, foundUser.password);
            if (!isValid) {
                throw new AppError('Invalid Password', 401);
            }
            user = foundUser;
            user.password = undefined;
            const token = user.generateJwtSignedToken();
            return { user, token };
        } catch (error) {
            throw error;
        }

    }

    async Users(data){
        try {
            let user;
            const { email, password} = data;
            if (!username || !password) {
                throw new AppError('Please provide email, password', 400);
            }
            const foundUser = await userModels.findOne({
                where: { email : email }
            });
            if (!foundUser) {
                throw new AppError('Invalid details', 401);
            }
            const isValid = await bcrypt.compare(password, foundUser.password);
            if (!isValid) {
                throw new AppError('Invalid details', 401);
            }
            user = foundUser;
            user.password = undefined;
            const token = user.generateJwtSignedToken();
            return { user, token };
        } catch (error) {
            throw error;
        }
    }


    async userType(data){
        try {
            const { username } = data

            if (!username) {
                throw new AppError('Please provide username, password', 400);
            }
            let user = await Admin.findOne({
                where : {
                    username 
                }
            })

            let  users = await Worker.findOne({
                where : {
                    username : username
                }
            })
            
            if (!user || users) {
                throw new AppError('Invalid Username', 401);
            }
            if (users){
                return "worker"
            }
            if (user){
                return "Admin"
            }
        } catch (error) {
            throw error
        }
    }


    async change_password(oldpassword, password, user){
        try {
            
            if (!oldpassword || !password){
    
                res.status(202).json("Empty detail are not allowed ");
    
                throw Error("Empty detail are not allowed ");
    
            }else{

                const foundUser = await userModel.findOne({
                    where: { userId : user.id }
                });
                if(!foundUser){
                    throw new AppError('Invalid detail', 401);
                }
                const validate = await bcrypt.compare(oldpassword, password);
                if(!validate){
                    throw new AppError('Invalid detail', 401);
                }
                const hashedPassword = await bcrypt.hash(password)
                
    
            }

        } catch (error) {
            throw error
        }
    }

}

module.exports = new AuthService();