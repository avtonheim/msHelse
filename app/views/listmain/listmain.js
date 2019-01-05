var frameModule = require('ui/frame');

function onLoaded(){

}

function navList(){
  frameModule.topmost().navigate('views/lists/lists');
}


exports.navList = navList;
exports.onLoaded = onLoaded;
