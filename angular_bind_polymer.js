angular.module('eee-c.angularBindPolymer', []).
directive('bindPolymer', function($q, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var attrMap = {};
      for (var prop in attrs.$attr) {
        if (prop != 'bindPolymer') {
          var _attr = attrs.$attr[prop];
          var _match = element.attr(_attr).match(/\{\{\s*([\.\w]+)\s*\}\}/);
          if (_match) {
            attrMap[_attr] = _match[1];
          }
        }
      }

      // When Polymer sees a change to the bound variable,
      // $apply / $digest the changes here in Angular
      new MutationObserver(function() { scope.$apply(); }).
        observe(element[0], {attributes: true});

      for (var _attr in attrMap) { watch (_attr); }

      function watch(attr) {
        scope.$watch(
          function() { return element.attr(attr); },
          function(value) {
            var tokens = attrMap[attr].split(/\./);
            var parent = scope;
            for (var i=0; i<tokens.length-1; i++) {
              if (typeof(parent[tokens[i]]) == 'undefined') {
                parent[tokens[i]] = {};
              }
              parent = parent[tokens[i]];
            }
            parent[tokens[tokens.length - 1]] = value;
          }
        );
      }
    }
  };
});
