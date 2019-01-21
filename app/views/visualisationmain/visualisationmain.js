var frameModule = require('ui/frame');

function onLoaded(args){
    var page = args.object;
}

function tapGraph(){
  frameModule.topmost().navigate('views/visualisationmain/visualisation/visualisation');
}

function tapText(){
  frameModule.topmost().navigate('views/textview/textview');
}

function tapReport(){
  frameModule.topmost().navigate('views/visualisationmain/consultation/consultation');
}

exports.onLoaded = onLoaded;
exports.tapGraph = tapGraph;
exports.tapText = tapText;
exports.tapReport = tapReport;
