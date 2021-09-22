class HomeController{

    async index(req, res){
        res.send("API-REST-USUARIO");
    }

}

module.exports = new HomeController();