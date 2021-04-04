const Controller = require("./controller.js");
const Model = require("./model.js");
const View = require("./view.js");

const app = new Controller(new Model(), new View())
var text = app.print("Hola que tal estamos");
console.log(text);