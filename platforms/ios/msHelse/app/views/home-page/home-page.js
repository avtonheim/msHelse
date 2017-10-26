var frameModule = require('ui/frame');

function onTap(){
  frameModule.topmost().navigate('views/about-page/about-page');
}
exports.onTap = onTap;

function tapDiary(){
  frameModule.topmost().navigate('views/diary/diary');
}
exports.tapDiary = tapDiary;

function tapVisual(){
  frameModule.topmost().navigate('views/visualisation/visualisation');
}
exports.tapVisual = tapVisual;

function tapTodo(){
  frameModule.topmost().navigate('views/lists/lists');
}
exports.tapTodo = tapTodo;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;
