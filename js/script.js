class Model {
  constructor() {

  }

  print(text){
  	return text;
  }
}

class View {
  constructor() {
  	
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}

const app = new Controller(new Model(), new View())
var text = app.model.print("Hola");
console.log(text);