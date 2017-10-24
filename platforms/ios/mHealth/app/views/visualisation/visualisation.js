
var frameModule = require("ui/frame");
var Sqlite = require( "nativescript-sqlite" );

function onLoaded(args){
  page = args.object;

} exports.onLoaded = onLoaded;

function onTap(){
  frameModule.topmost().navigate('views/home-page/home-page');
} exports.onTap = onTap;
