var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Mood = new ObservableArray([]);
    viewModel.MoodAnalysis = new ObservableArray([]);
    viewModel.SelectMoodWeekly = new ObservableArray([]);
    viewModel.SelectMoodMonth = new ObservableArray([]);
    viewModel.emptyData = new ObservableArray([]);

    // insert a new record
    viewModel.insert = function(args) {
      var moodVal = args.object.value;
      var moodObj = args.object;
      moodObj.style.color = "black";
            database.execSQL("INSERT OR REPLACE INTO mood (moodState, timestamp) VALUES (?, date())", [moodVal]).then(id => {
                frameModule.topmost().navigate('views/diary/symptoms/symptoms');
                console.log("The new record id is: " + moodVal);
            }, error => {
            console.log("INSERT ERROR", error);
        });
    }


      /*Selecting average mood last 7 days*/
      viewModel.selectAverage = function() {
        this.SelectMoodWeekly = new ObservableArray([]);
            database.all("SELECT avg(moodState) FROM mood WHERE id < 8").then(rows => {
                for(var row in rows) {
                this.SelectMoodWeekly.push({average: rows[row][0]});
               }
               if (isEmpty(this.SelectMoodWeekly)){
                this.emptyData.push('Du må fullføre en registrering i dagboken din for å vise denne grafen.');
            }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

        /*Selecting average mood last 6 months*/
        viewModel.selectAverageMonth = function() {
          this.SelectMoodMonth = new ObservableArray([]);
              database.all("SELECT round(avg(moodState)) FROM mood").then(rows => {
                  for(var row in rows) {
                  this.SelectMoodMonth.push({average: rows[row][0]});
                 }
                 if (isEmpty(this.SelectMoodMonth)){
                    this.emptyData.push('Du må fullføre en registrering i dagboken din for å vise denne grafen.');
                }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }

      //For the mood graph patient
      viewModel.selectall = function() {
        this.Mood = new ObservableArray([]);
            database.all("SELECT * FROM mood WHERE id < 8").then(rows => {
                for(var row in rows) {
                 this.Mood.push({id: rows[row][0], dagsform: rows[row][1], dato: rows[row][2]});
               }
               if (isEmpty(this.Mood)){
                this.emptyData.push('Du må fullføre en registrering i dagboken din for å vise denne grafen.');
            }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

        //For the mood graph doctor
        viewModel.selectallAnalysis = function() {
          this.MoodAnalysis = new ObservableArray([]);
              database.all("SELECT round(avg(moodState)), strftime('%m-%Y', timestamp) as 'month-year' FROM mood group by strftime('%m-%Y', timestamp)").then(rows => {
                  for(var row in rows) {
                   this.MoodAnalysis.push({gjennomsnitt: rows[row][0], dato: rows[row][1]});
                 }
                 if (isEmpty(this.MoodAnalysis)){
                    this.emptyData.push('Du må fullføre en registrering i dagboken din for å vise denne grafen.');
                }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }


  viewModel.selectall();
  viewModel.selectallAnalysis();
  viewModel.selectAverage();
  viewModel.selectAverageMonth();

  return viewModel;
}
exports.createViewModel = createViewModel;
