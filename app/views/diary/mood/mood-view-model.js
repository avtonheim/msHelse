var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Mood = new ObservableArray([]);

    // insert a new record
    viewModel.insert = function(args) {
      var moodText = args.object.text;
      var moodVal = args.object.value;
      var moodObj = args.object;
      moodObj.style.color = "black";
        new Sqlite("my.db", function(err, db) {
            db.execSQL("INSERT OR REPLACE INTO mood (moodState, timestamp) VALUES (?, date())", [moodVal], function(err, id) {

                console.log("The new record id is: " + moodText + moodVal);
            });
        });
    }

      viewModel.selectall = function() {
        this.Mood = new ObservableArray([]);
            database.all("SELECT moodState, timestamp FROM mood WHERE timestamp > (SELECT date('now','-7 day')) group by timestamp").then(rows => {
                for(var row in rows) {
                 this.Mood.push({dagsform: rows[row][0], dato: rows[row][1]});
                 console.log(rows[row]);
               }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }
/*
        // delete a table
viewModel.deleteTable = function() {
  database.all("DROP TABLE IF EXISTS mood", [], function(err) {
      console.log("TABLE DROPPED");
  });
}
*/

  viewModel.selectall();
  return viewModel;
}
exports.createViewModel = createViewModel;
