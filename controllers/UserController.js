let PasswordToken = require("../models/PasswordToken")
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

        if (emailExists) {
            res.status(406);
            res.json({ err: "O e-mail já está cadastrado!" });
            return;
        }

        await User.new(name, email, password);

        res.status(200);
        res.send("E-mail cadastrado com sucesso!");
    }

    async fidUser(req, res) {
        let id = req.params.id;
        let user = await User.findById(id);

        if (user == undefined) {
            res.status(404);
            res.send("Usuario não encontrado!")
        } else {
            res.status(200);
            res.json(user);
        }
    }

    async edit(req, res) {
        let { id, name, email, role } = req.body;

        console.log(id, name, email, role);
        let result = await User.update(id, name, email, role);
        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("Cadastro atualizado com sucesso!");
            } else {
                res.status(406);
                res.send(result.err)
            }
        } else {
            res.status(406);
            res.send("Erro ao editar o usuario!");
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        let result = await User.delete(id);

        if (result.status) {
            res.status(200);
            res.send("Cadastro excluído com sucesso!")
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async recorverPassword(req, res) {
        let email = req.body.email;

        let result = await PasswordToken.create(email);

        if(result.status){
            res.status(200);
            res.send(""+result.token);
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        let token = req.body.token;
        let password = req.body.password;
        let isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada com sucesso!");
        }else{
            res.status(406);
            res.send("Token inválido!");
        }
    }

}

module.exports = new UserController();