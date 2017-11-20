var frameModule = require('ui/frame');

function navList(){
  frameModule.topmost().navigate('views/lists/lists');
} exports.navList = navList;
