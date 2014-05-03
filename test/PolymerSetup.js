var script = document.createElement("script");
script.src = "/base/bower_components/platform/platform.js";
document.getElementsByTagName("head")[0].appendChild(script);

var link = document.createElement("link");
link.rel = "import";
link.href = "/base/test/x-double.html";
document.getElementsByTagName("head")[0].appendChild(link);

// Delay Jasmine specs until polymer-ready
var POLYMER_READY = false;
beforeEach(function(done) {
  window.addEventListener('polymer-ready', function(){
    POLYMER_READY = true;
  });
  waitsFor(function(){return POLYMER_READY;});
});
