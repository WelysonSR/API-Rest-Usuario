let User = require("../models/User");
class UserController {

    async index(req, res) { 
        let users = await User.findAll();
        res.status(200);
        res.json(users);
    }

    async create(req, res) {
        let { name, email, password } = req.body;

        if (name == undefined) {
            res.status(400);
            res.json({ err: "Nome obrigatório" });
            return;
        } else if (email == undefined) {
            res.status(400);
            res.json({ err: "E-mail inválido!" });
            return;
        } else if (password == undefined) {
            res.status(400);
            res.json({ err: "Senha inválido!" });
            return;
        }

        let emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"});
            return;
        }

        await User.new(name, email, password);

        res.status(200);
        res.send("E-mail cadastrado com sucesso!");
    }

    async fidUser(req,res){
        let id = req.params.id;
        let user = await User.findById(id);
        
        if(user == undefined){
            res.status(404);
            res.send("Usuario não encontrado!")
        }else{
            res.status(200);
            res.json(user);
        }
    }

}

module.exports = new UserController();