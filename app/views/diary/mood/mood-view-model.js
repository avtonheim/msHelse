var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();

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
          database.all("SELECT * FROM mood").then(rows => {
              for(var row in rows) {
               console.log("Result", rows[row]);
              }
          }, error => {
              console.log("SELECT ERROR", error);
          });
      }
  return viewModel;
}
exports.createViewModel = createViewModel;
