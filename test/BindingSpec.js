describe('Custom Elements on their own', function(){
  var container, customElement;
  beforeEach(function(){
    container = document.createElement('div');
    document.body.appendChild(container);

    container.innerHTML = '<x-double in=42></x-double>';
    customElement = container.children[0];

    var done = false;
    setTimeout(function(){ done = true; }, 0);
    waitsFor(function(){ return done; });
  });

  afterEach(function(){
    // container.remove();
  });

  it('works', function(){
    expect(customElement.getAttribute('out')).toEqual('84');
  });
});

describe('Double binding', function(){
  // Build in setup, check expectations in tests
  var ngElement, polymerElement;

  // Load the angular-bind-polymer directive
  beforeEach(module('eee-c.angularBindPolymer'));

  beforeEach(inject(function($compile, $rootScope, $timeout) {
    // Container to hold angular and polymer elements
    var container = document.createElement('div');
    container.innerHTML =
      '<pre ng-bind="answer"></pre>' +
      '<x-double bind-polymer in="2" out="{{answer}}"></x-double>';
    document.body.appendChild(container);

    // The angular element is the first child (the <pre> tag)
    ngElement = container.children[0];
    polymerElement = container.children[1];

    // Compile the document as an angular view
    $compile(document.body)($rootScope);
    $rootScope.$digest();

    // Must wait one event loop for ??? to do its thing
    var done = false;
    setTimeout(function(){ done = true; }, 0);
    waitsFor(function(){ return done; });
  }));

  it('sees polymer update properly', function(){
    expect(polymerElement.getAttribute('out')).toEqual('4');
  });

  // The actual test
  it('sees values from polymer', function(){
    expect(ngElement.innerHTML).toEqual('4');
  });
});
