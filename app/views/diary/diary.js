var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;
}
exports.onLoaded = onLoaded;


function onNavMood(){
  frameModule.topmost().navigate('views/diary/mood/mood');
}
exports.onNavMood = onNavMood;
