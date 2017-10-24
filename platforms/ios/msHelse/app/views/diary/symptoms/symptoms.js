var frameModule = require('ui/frame');
var page;

function onLoaded(args){
  page = args.object;
  page.bindingContext = { someProperty : 50};
  page.bindingContext = { explSymptom : "Her kan du legge inn dine symptom sidan sist du fullførte dagboka di. Du kan velje fleire symptom"};
}
exports.onLoaded = onLoaded;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;

/*function onTap(){
  var subjectElement = page.getViewById('subject');
  var messageElement = page.getViewById('message');
  var subject = subjectElement.text;
  var message = messageElement.text;

  var data = JSON.stringify({
    "subject": subject,
    "message": message
  });

}
exports.onTap = onTap;*/

function onNavTodo(){
  frameModule.topmost().navigate('views/diary/lists/lists');
}
exports.onNavTodo = onNavTodo;
