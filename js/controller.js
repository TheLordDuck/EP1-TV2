class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  print(text){
    return text;
  }
}

module.exports = Controller;