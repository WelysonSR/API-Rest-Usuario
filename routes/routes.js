let express = require("express")
let app = express();
let router = express.Router();
let HomeController = require("../controllers/HomeController");
let UserController = require("../controllers/UserController");

//Route GAT
router.get('/', HomeController.index);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.fidUser);
//Route POST
router.post('/user', UserController.create);
router.post('/recorverpassword', UserController.recorverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);
//Route PUT
router.put('/user', UserController.edit);
//Route DELETE
router.delete('/user/:id', UserController.delete);


module.exports = router;