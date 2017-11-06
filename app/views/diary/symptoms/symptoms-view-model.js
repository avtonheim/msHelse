var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.amount = new ObservableArray([]);


    viewModel.insert = function(args) {
          var btnId = args.object.text;
          var btn = args.object;
          btn.backgroundColor = "#3489db";
          database.execSQL("INSERT INTO symptoms (symptomItem) VALUES (?)", [btnId]).then(id => {
            Dialogs.alert("Lagret!")
              console.log("INSERT RESULT", id);
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }

      viewModel.select = function() {
            //this.symptoms = new ObservableArray([]);
            database.all("SELECT * FROM symptoms").then(rows => {
                for(var row in rows) {
                 console.log(rows[row]);
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

    viewModel.showAmountFatigue = function() {
      this.amount = new ObservableArray([]);
      database.all("SELECT symptomItem, COUNT(*) FROM symptoms").then(rows => {
        for(var row in rows) {
            this.amount.push({symptomItem: rows[row][1]});
        }
      }, error =>{
        console.log("INSERT ERROR", error);
      });
    }

    viewModel.showAmountFatigue();
    return viewModel;
}
exports.createViewModel = createViewModel;
