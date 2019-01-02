var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var ObservableArray = require("data/observable-array").ObservableArray;

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.Symptoms = new ObservableArray([]);
    viewModel.SymptomsConsultation = new ObservableArray([]);
    viewModel.SymptomsConsultationRange = new ObservableArray([]);
    viewModel.SymptomProminent = new ObservableArray([]);
    viewModel.SymptomProminentWeek = new ObservableArray([]);


    viewModel.insert = function(args) {
          var symptomType = args.object.context; // Problem with adding the same context twice in one session. Should be able to register both morning and evening to register only one context
          var eventTime = args.object.text; //testing purposes
          var morgonVal = null;
          var kveldVal = null;
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
              database.all("SELECT symptom, count(morning), count(evening), count(symptom) FROM symptoms WHERE id < 8 group by symptom order by count(symptom) desc").then(rows => {
                  for(var row in rows) {
                   this.Symptoms.push({type: rows[row][0], morncount: rows[row][1], evncount: rows[row][2], count: rows[row][3], timestamp: rows[row][4]});
                  }
              }, error => {
                  console.log("SELECT ERROR", error);
              });
          }

          viewModel.selectProminentSymptomWeek = function() {
              this.SymptomProminentWeek = new ObservableArray([]);
                database.all("SELECT symptom, count(symptom), count(morning), count(evening) FROM symptoms WHERE id < 8 group by symptom order by count(symptom) desc limit 1").then(rows => {
                    for(var row in rows) {
                      this.SymptomProminentWeek.push({symptom: rows[row][0], symptomNum: rows[row][1], symptomnummorning: rows[row][2], symptomnumevening: rows[row][3]});
                    }
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            }

          viewModel.selectProminentSymptom = function() {
              this.SymptomProminent = new ObservableArray([]);
                database.all("SELECT symptom, count(symptom), count(morning), count(evening) FROM symptoms group by symptom order by count(symptom) desc limit 1").then(rows => {
                    for(var row in rows) {
                      this.SymptomProminent.push({symptom: rows[row][0], symptomNum: rows[row][1], symptomnummorning: rows[row][2], symptomnumevening: rows[row][3]});
                    }
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            }

            /*Selecting the range with MIN and MAX values in the consultation module*/
            viewModel.selectDoctorConsultationRange = function() {
              this.SymptomsConsultationRange = new ObservableArray([]);
                  database.all("SELECT symptom, count(symptom) FROM symptoms group by symptom order by count(symptom) desc").then(rows => {
                      for(var row in rows) {
                       this.SymptomsConsultationRange.push({type: rows[row][0], count: rows[row][1]});
                      }
                  }, error => {
                      console.log("SELECT ERROR", error);
                  });
              }

          /*Selecting the detailed overview in the consultation module*/
          viewModel.selectDoctorConsultation = function() {
            this.SymptomsConsultation = new ObservableArray([]);
                database.all("SELECT symptom, count(symptom), count(morning), count(evening) FROM symptoms group by symptom order by count(symptom) desc").then(rows => {
                    for(var row in rows) {
                     this.SymptomsConsultation.push({type: rows[row][0], count: rows[row][1], morncount: rows[row][2], evncount: rows[row][3]});
                    }
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            }


    viewModel.selectPatientOverview();
    viewModel.selectDoctorConsultation();
    viewModel.selectProminentSymptom();
    viewModel.selectProminentSymptomWeek();
    viewModel.selectDoctorConsultationRange();
    return viewModel;
}
exports.createViewModel = createViewModel;
