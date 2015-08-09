angular.module('eee-c.angularBindPolymer', []).
directive('bindPolymer', ['$parse', function($parse) {
  'use strict';
  return {
    restrict: 'A',
    scope : false,
    compile: function bindPolymerCompile($element, $attrs) {
      var attrMap = {};

      var el = $element[0];
      for (var prop in $attrs) {
        var attributeValue = el._config ? el._config[prop] : $attrs[prop];
        if (angular.isString(attributeValue)) {
          var _match = attributeValue.match(/\{\{\s*([\.\w]+)\s*\}\}/);
          if (_match) {
            attrMap[prop] = $parse(_match[1]);
          }
        }
      }

      function bindPolymerLink(scope, element) {
        // When Polymer sees a change to the bound variable,
        // $apply / $digest the changes here in Angular
        var observer = new MutationObserver(function processMutations(mutations) {
          mutations.forEach(function processMutation(mutation) {
            _assignNgGetterFromPolymer(mutation.attributeName, scope, element);
          });
          scope.$apply();
        });

        observer.observe(element[0], {attributes: true});
        scope.$on('$destroy', observer.disconnect.bind(observer));
        _assignInitialGetters(scope, element);
      };

      function _assignNgGetterFromPolymer(attributeName, scope, element) {
        if (!(attributeName in attrMap)) return;
        if (!element[0].$) return;

        var newValue = element.attr(attributeName),
            getter = attrMap[attributeName];

        if (!angular.isFunction(getter.assign)) return;

        // console.log(getter(scope) + ' -> ' + newValue)
        getter.assign(scope, newValue);
      }

      function _assignInitialGetters(scope, element) {
        for (var prop in attrMap) { _assignNgGetterFromPolymer(prop, scope, element); }
      }

      return bindPolymerLink;
    }
  };
}]);
