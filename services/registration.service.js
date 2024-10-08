const db = require('../model');
const { AppError } = require('../utils/error');
const State = db.PoliticalState;
const Country = db.Country;
const Lga = db.lga;

class RegistrationService {

    async info(data){
        try {
            
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async confirm_email(data){
        try {
            
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async create_username(data){
        try {
            
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async countries(){
        const countries = await Country.findAll()
        return countries
    }

    async country(data){
        const countryId = parseInt(data)
        const country = await Country.findOne({where : { countryId }})
        return country
    }


    async states(data){
        const countryId = parseInt(data)
        const states = await State.findAll({ where : { countryId  }})
        return states
    }

    async state(country_Id, state_Id){
        const stateId = parseInt(state_Id)
        const countryId = parseInt(country_Id)
        const state = await State.findOne({where : { stateId, countryId }})
        return state
    }

    async lgas(stateId){
        const lgas = await Lga.findAll({ where : { stateId  }})
        return lgas
    }

    async lga(stateId, lgaId){
        const lga = await Lga.findOne({where : { stateId,  lgaId}})
        return lga
    }


}

module.exports = RegistrationService;