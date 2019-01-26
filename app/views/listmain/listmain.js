var frameModule = require('ui/frame');

exports.navList = function(){
  frameModule.topmost().navigate('views/listmain/lists/lists');
}

exports.navFinish = function(){
  frameModule.topmost().navigate('views/listmain/finsihed/finished');
}


