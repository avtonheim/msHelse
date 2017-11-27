var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Texts = new ObservableArray([]);

    viewModel.insert = function() {
          database.execSQL("INSERT INTO dialouge (content, timestamp) VALUES (?, datetime())", [this.textItem]).then(id => {
              console.log("INSERT RESULT", this.textItem);
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }

        viewModel.select = function() {
          this.Texts = new ObservableArray([]);
              database.all("SELECT id, timestamp FROM dialouge").then(rows => {
                  for(var row in rows) {
                    this.Texts.push({id: rows[row][0], date: rows[row][1]});
                  }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }

    viewModel.select();


    return viewModel;
}
exports.createViewModel = createViewModel;
