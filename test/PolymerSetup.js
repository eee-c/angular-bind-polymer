// 1. Load Polymer before any code that touches the DOM.
// *** This is done in karma.conf to avoid script loading race    ***
// *** conditions. It is OK to do it here once the Spec files are ***
// *** of non-trivial size.                                       ***
// var script = document.createElement("script");
// script.src = "/base/bower_components/platform/platform.js";
// document.getElementsByTagName("head")[0].appendChild(script);

// Container to hold angular and polymer elements
var container = document.createElement('div');
container.setAttribute('ng-app', 'acceptanceTest');
document.body.appendChild(container);

var container1 = document.createElement('div');
container1.innerHTML =
  '<pre ng-bind="answer"></pre>' +
  '<x-double bind-polymer in="1" out="{{answer}}"></x-double>';
container.appendChild(container1);

var container2 = document.createElement('div');
container2.innerHTML =
  '<pre ng-bind="answer2a"></pre>' +
  '<x-double bind-polymer in="1" out="{{answer2a}}"></x-double>' +
  '<pre ng-bind="answer2b"></pre>' +
  '<x-double bind-polymer in="1" out="{{answer2b}}"></x-double>';
container.appendChild(container2);

// Load the angular-bind-polymer directive
angular.module('acceptanceTest', [
  'eee-c.angularBindPolymer'
]);

// Settimeout to give angular a chance to process the directive. Don't
// care about mulitple link tags — it'll just get loaded once.
beforeEach(function(done){
  setTimeout(function(){
      var link = document.createElement("link");
      link.rel = "import";
      link.href = "/base/test/x-double.html";
      document.getElementsByTagName("head")[0].appendChild(link);
      done();
    },
    0
  );
});

// Delay Jasmine specs until Polymer is ready
var POLYMER_READY = false;
beforeEach(function(done) {
  function waitForPolymer() {
    if (Polymer && Polymer.whenReady) {
      Polymer.whenReady(done);
      return;
    }
    if (Polymer && Polymer.whenPolymerReady) {
      Polymer.whenPolymerReady(done);
      return;
    }
    setTimeout(waitForPolymer, 200);
  }
  waitForPolymer();

  if (POLYMER_READY) done();
});
