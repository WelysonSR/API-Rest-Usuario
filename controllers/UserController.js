class UserController{

    async index(req,res){}

    async create(req,res){
        let {name, email, password} = req.body;
        
        if(name == undefined){
            res.status(400);
            res.json({err: "Nome obrigatório"});
        }else if(email == undefined ){
            res.status(400);
            res.json({err: "E-mail inválido!"});
        }else if(password == undefined){
            res.status(400);
            res.json({err: "Senha inválido!"});
        }


        res.status(200);
        res.send("Correto!");
    }
}

module.exports = new UserController();