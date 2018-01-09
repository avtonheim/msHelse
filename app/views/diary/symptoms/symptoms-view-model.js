var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var ObservableArray = require("data/observable-array").ObservableArray;

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Symptoms = new ObservableArray([]);
    viewModel.SymptomsConsultation = new ObservableArray([]);
    viewModel.SymptomProminent = new ObservableArray([]);
    viewModel.SymptomProminentWeek = new ObservableArray([]);


    viewModel.insert = function(args) {
          var symptomType = args.object.context;
          var eventVal = args.object.value; //day or night
          var eventTime = args.object.text;
          var morgonVal = 0;
          var kveldVal = 0;
            if(eventTime == "Kveld"){
              var kveldVal = 1;
          } if(eventTime == "Morgon"){
              var morgonVal = 1;
          }
          var btn = args.object;
          btn.backgroundColor = "#3489db";
              database.execSQL("INSERT INTO symptoms (symptom, morning, evening, timestamp) VALUES (?, ?, ?, date())", [symptomType, morgonVal, kveldVal]).then(id => {
                  console.log("The new record id is: " + symptomType + " " + morgonVal + " " + kveldVal);
              }, error => {
              console.log("INSERT ERROR", error);
          });
      }


        viewModel.selectPatientOverview = function() {
          this.Symptoms = new ObservableArray([]);
              database.all("SELECT *, count(symptom) FROM symptoms WHERE id < 8 group by symptom").then(rows => {
                  for(var row in rows) {
                   this.Symptoms.push({id: rows[row][0], type: rows[row][1], morncount: rows[row][2], evncount: rows[row][3], timestamp: rows[row][4], count: rows[row][5]});

                  }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }

          viewModel.selectProminentSymptomWeek = function() {
              this.SymptomProminentWeek = new ObservableArray([]);
                database.all("SELECT symptom, count(symptom), count(morning), count(evening) FROM symptoms WHERE id < 8").then(rows => {
                    for(var row in rows) {
                      this.SymptomProminentWeek.push({symptom: rows[row][0], symptomNum: rows[row][1], symptomnummorning: rows[row][2], symptomnumevening: rows[row][3]});
                      console.log(rows[row]);
                    }
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            }

          viewModel.selectProminentSymptom = function() {
              this.SymptomProminent = new ObservableArray([]);
                database.all("SELECT symptom, count(symptom), count(morning), count(evening) FROM symptoms group by symptom order by symptom asc limit 1").then(rows => {
                    for(var row in rows) {
                      this.SymptomProminent.push({symptom: rows[row][0], symptomNum: rows[row][1], symptomnummorning: rows[row][2], symptomnumevening: rows[row][3]});

                    }
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            }

          viewModel.selectDoctorConsultation = function() {
            this.SymptomsConsultation = new ObservableArray([]);
                database.all("SELECT *, count(symptom) FROM symptoms group by symptom").then(rows => {
                    for(var row in rows) {
                     this.SymptomsConsultation.push({id: rows[row][0], type: rows[row][1], morncount: rows[row][2], evncount: rows[row][3], timestamp: rows[row][4], count: rows[row][5]});

                    }
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            }


    viewModel.selectPatientOverview();
    viewModel.selectDoctorConsultation();
    viewModel.selectProminentSymptom();
    viewModel.selectProminentSymptomWeek();
    return viewModel;
}
exports.createViewModel = createViewModel;
