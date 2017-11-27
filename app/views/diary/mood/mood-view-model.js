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
      var moodObj = args.object;
      moodObj.style.color = "black";
        new Sqlite("my.db", function(err, db) {
            db.execSQL("INSERT INTO mood (moodState, timestamp) VALUES (?, datetime())", [moodText], function(err, id) {
                console.log("The new record id is: " + moodText);
            });
        });
    }

    viewModel.select = function() {
      this.Mood = new ObservableArray([]);
          database.all("SELECT moodState, count(moodState) FROM mood group by moodState").then(rows => {
              for(var row in rows) {
               this.Mood.push({dagsform: rows[row][0], antall: rows[row][1]});
             }
          }, error => {
              console.log("SELECT ERROR", error);
          });
      }


  viewModel.select();
  return viewModel;
}
exports.createViewModel = createViewModel;
