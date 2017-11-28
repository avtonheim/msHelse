var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");
var FrameModule = require("ui/frame");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Texts = new ObservableArray([]);

    viewModel.insert = function() {
          database.execSQL("INSERT INTO dialouge (content, timestamp) VALUES (?, datetime())", [this.textItem]).then(id => {
              this.Texts.push({id: id, content: this.textItem});
              FrameModule.topmost().navigate('views/home-page/home-page');
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }

        viewModel.selectAll = function() {
          this.Texts = new ObservableArray([]);
              database.all("SELECT content, timestamp FROM dialouge").then(rows => {
                  for(var row in rows) {
                    this.Texts.push({content: rows[row][0], timestamp: rows[row][1]});
                  }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }



    viewModel.selectAll();


    return viewModel;
}
exports.createViewModel = createViewModel;
