angular-bind-polymer
====================

Angular directive for *double* variable binding of Polymer attributes.

N.B. This will not work with raw paper/core elements because they do not publish their attributes. See note below on Polymer Usage for details.

Installation
------------

Use bower to install:

```
$ bower install angular-bind-polymer
```

Usage
-----

Script order is important. The web components platform (polyfills) need to be loaded first, followed by the Angular library and then this library (angular-bind-polymer):

```html
<script src="bower_components/platform/platform.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="angular_bind_polymer.js"></script>
```

The Angular module needs to be inititialized before the Polymer elements are imported otherwise Polymer will overwrite the attributes before angular-bind-polymer has a chance to process them.

Add `eee-c.angularBindPolymer` as dependency for your Angular application:

```javascript
var PizzaStoreApp = angular.module('pizzaStoreApp', [
  'eee-c.angularBindPolymer'
]);
```

The final piece of setup is to import the Polymer elements:

```html
<link rel="import" href="test/x-double.html">
```

To bind values from Polymer elements, apply the `bind-polymer` directive:

```html
<x-pizza bind-polymer state="{{pizzaState}}"></x-pizza>
<pre ng-bind="pizzaState"></pre>
```

Changes from the `<x-pizza>` custom element will now update the `pizzaState` variable in local scope.

_Note:_ changes in Angular's scope are already bound. That is, changes to `pizzaState` will update the `<x-pizza>` custom element without this or any other modules. This directive is soley used to watch for changes in custom elements for the purposes of updating a bound variable in Angular's scope.

Support in Polymer
------------------

This will only work if the Polymer element publishes _and_ reflects attributes. That is, it is insufficient to declare attributes:

```html
<!-- THIS WON'T WORK!!! -->
<polymer-element name="x-double" attributes="in out">
  <template><!-- ... --></template>
  <script>
    // ...
  </script>
</polymer-element>
```

To mark the `out` attribute as reflectable, declare it as such with the `publish` property:

```html
<polymer-element name="x-double" attributes="in out">
  <template><!-- ... --></template>
  <script>
    Polymer("x-double", {
      publish: {
        out: {value: 0, reflect: true}
      },
      // ...
    });
  </script>
</polymer-element>
```

Unfortunately, core and paper elements tend not to reflect attributes at this time. This means that this directive will not work with them. Hopefully this will change in the near future.

Contributors
------------

Much thanks to everyone that has helped with suggestions. In particular, thanks to the following for code improvements:

 * [Jan-Willem Gmelig Meyling](https://github.com/JWGmeligMeyling)
 * [Mark Daggett](https://github.com/heavysixer)
 * [Pascal Precht](https://github.com/PascalPrecht)
