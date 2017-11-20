var frameModule = require('ui/frame');

function tapGraph(){
  frameModule.topmost().navigate('views/visualisation/visualisation');
}
exports.tapGraph = tapGraph;
