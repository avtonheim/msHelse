var frameModule = require('ui/frame');

function onLoaded(){

}
 
 function MindfullnessTap(){
   frameModule.topmost().navigate('views/training/mindfullness/mindfullness');
 }

exports.onLoaded = onLoaded;
exports.MindfullnessTap = MindfullnessTap;
