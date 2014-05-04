angular.module('eee-c.angularBindPolymer', []).
directive('bindPolymer', function($q, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var attrMap = {};
      for (var prop in attrs.$attr) {
        if (prop != 'bindPolymer') {
          var _attr = attrs.$attr[prop];
          var _match = element.attr(_attr).match(/\{\{\s*(\w+)\s*\}\}/);
          if (_match) {
            attrMap[_attr] = _match[1];
          }
        }
      }

      // Always get updated Polymer element
      function polymer() {
        var all = document.querySelectorAll(element[0].nodeName);
        for (var i=0; i<all.length; i++) {
          if (all[i] == element[0]) return all[i];
          if (all[i].impl == element[0]) return all[i];
        }
      }

      // When Polymer sees a change to the bound variable,
      // $apply / $digest the changes here in Angular
      var observer = new MutationObserver(function() {
        scope.$apply();
      });
      observer.observe(polymer(), {attributes: true});
      for (var _attr in attrMap) {
        scope.$watch(
          function() {return element.attr(_attr);},
          function(value) {
            scope[attrMap[_attr]] = value;
          }
        );
      }
    }
  };
});
