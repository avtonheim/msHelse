var frameModule = require('ui/frame');

function tapGraph(){
  frameModule.topmost().navigate('views/visualisation/visualisation');
}
exports.tapGraph = tapGraph;

function tapText(){
  frameModule.topmost().navigate('views/textoverview/textoverview');
} exports.tapText = tapText;

function tapReport(){
  frameModule.topmost().navigate('views/visualisationmain/consultation/consultation');
} exports.tapReport = tapReport;
