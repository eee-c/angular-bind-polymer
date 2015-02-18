angular.module('eee-c.angularBindPolymer', [])
  .directive('bindPolymer', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function($scope, $element, attributes) {
        var attrs = {};
        angular.forEach(attributes.$attr, function(keyName, key) {
          var val;
          if (key !== 'bindPolymer') {
            attrs[keyName] = keyName;
            val = $element.attr(keyName).match(/\{\{\s*([\.\w]+)\s*\}\}/);
            if (angular.isDefined(val)) {
              attrs[keyName] = val[1].split(/\./);
            }
          }
        });

        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            var stored = attrs[mutation.attributeName];
            var eAttr = $element.attr(mutation.attributeName);
            if (angular.isDefined(stored)) {
              var tmp = $scope;
              var lastTmp;
              angular.forEach(stored, function(key) {
                if (angular.isDefined(tmp[key])) {
                  lastTmp = tmp;
                  tmp = tmp[key];
                }
              });
              if (tmp !== $scope && tmp !== eAttr) {
                lastTmp[stored[stored.length - 1]] = eAttr;
              }
            }
          });
          $scope.$apply();
        });

        observer.observe($element[0], {
          attributes: true
        });

        $scope.$on('$destroy', function() {
          observer.disconnect();
        });
      }
    };
  });
