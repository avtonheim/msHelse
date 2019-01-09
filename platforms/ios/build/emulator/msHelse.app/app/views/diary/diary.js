var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;
}

function onNavMood(){
  frameModule.topmost().navigate('views/diary/mood/mood');
}

exports.onLoaded = onLoaded;
exports.onNavMood = onNavMood;
