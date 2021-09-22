let User = require("../models/User");
class UserController {

    async index(req, res) { }

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
}

module.exports = new UserController();