let express = require("express")
let app = express();
let router = express.Router();
let HomeController = require("../controllers/HomeController");
let UserController = require("../controllers/UserController");

//Rout GAT
router.get('/', HomeController.index);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.fidUser);
//Rout POST
router.post('/user', UserController.create);

module.exports = router;