var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var ObservableArray = require("data/observable-array").ObservableArray;

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Symptoms = new ObservableArray([]);

    viewModel.insert = function(args) {
          var btnText = args.object.text;
          var btn = args.object;
          btn.backgroundColor = "#3489db";
          new Sqlite("my.db", function(err, db) {
              db.execSQL("INSERT INTO symptoms (symptom, timestamp) VALUES (?, date())", [btnText], function(err, id) {
                  console.log("The new record id is: " + btnText);
              });
          });
      }

      viewModel.select = function() {
        this.Symptoms = new ObservableArray([]);
            database.all("SELECT symptom, count(symptom), timestamp FROM symptoms WHERE timestamp > (SELECT date('now','-7 day')) group by symptom").then(rows => {
                for(var row in rows) {
                 this.Symptoms.push({type: rows[row][0], count: rows[row][1]});
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }
    viewModel.select();
    return viewModel;
}
exports.createViewModel = createViewModel;
