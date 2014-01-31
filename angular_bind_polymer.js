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
        return element.parent().find(element[0].nodeName)[0];
      }

      // Helper to wait for Polymer to expose the observe property
      function onPolymerReady() {
        var deferred = $q.defer();

        function _checkForObserve() {
          polymer().observe ?
            deferred.resolve() :
            $timeout(_checkForObserve, 10);
        }
        _checkForObserve();

        return deferred.promise;
      }

      // When Polymer is ready, establish the bound variable watch
      onPolymerReady().
        then(function(){
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
        });
    }
  };
});
