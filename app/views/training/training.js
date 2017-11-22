var frameModule = require('ui/frame');

function onLoaded(args){

}
 exports.onLoaded = onLoaded;

 function MindfullnessTap(){
   frameModule.topmost().navigate('views/training/mindfullness/mindfullness');
 } exports.MindfullnessTap = MindfullnessTap;
