var frameModule = require('ui/frame');

function onTap(){
  frameModule.topmost().navigate('views/training/training');
}
exports.onTap = onTap;

function tapDiary(){
  frameModule.topmost().navigate('views/diary/diary');
}
exports.tapDiary = tapDiary;

function tapVisual(){
  frameModule.topmost().navigate('views/visualisationmain/visualisationmain');
}
exports.tapVisual = tapVisual;

function tapTodo(){
  frameModule.topmost().navigate('views/listmain/listmain');
}
exports.tapTodo = tapTodo;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;
