let knex = require("../database/connection");
let bcrypt = require("bcrypt");

class User {

    //Criat User "Start"
    async new(name, email, password) {

        try {
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({ name, email, password: hash, role: 0 }).table("users")
        } catch (err) {
            console.log(err);
        }

    }

    async findEmail(email) {

        try {
            let result = await knex.select("*").from("users").where({ email: email });

            if (result.length > 0) {
                return true;
            } else {
                return false;
            }

        } catch (err) {
            console.log(err);
            return false;
        }

    }
    //Criat User "End"

    //User Listing / ID "Start"
    async findAll() {
        try {
            let result = await knex.select(["id","name","email","role"]).table("users");
            return result;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async findById(id) {
        try {
            let result = await knex.select(["id","name","email","role"]).where({id: id}).table("users");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
    //User Listing / ID "End"

}

module.exports = new User();