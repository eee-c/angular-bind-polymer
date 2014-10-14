describe('Custom Elements on their own', function(){
  var container, customElement;
  beforeEach(function(done){
    container = document.createElement('div');
    document.body.appendChild(container);

    container.innerHTML = '<x-double in=42></x-double>';
    customElement = container.children[0];

    setTimeout(done, 0);
  });

  afterEach(function(){
    container.remove();
  });

  it('works', function(){
    expect(customElement.getAttribute('out')).toEqual('84');
  });
});

describe('Double binding', function(done){
  // Build in setup, check expectations in tests
  var ngElement, polymerElement;

  beforeEach(function(done){
    // The angular element is the first child (the <pre> tag)
    ngElement = container1.children[0];
    polymerElement = container1.children[1];

    polymerElement.setAttribute('in', '2');

    // Must wait one event loop for ??? to do its thing
    setTimeout(done, 0); // One event loop for Polymer to process
  });

  it('sees polymer update properly', function(){
    expect(polymerElement.getAttribute('out')).toEqual('4');
  });

  // The actual test
  it('sees values from polymer', function(){
    expect(ngElement.innerHTML).toEqual('4');
  });
});

describe('Double binding multiple polymer instances', function(done){
  // Build in setup, check expectations in tests
  var ngElementA, polymerElementA;
  var ngElementB, polymerElementB;

  beforeEach(function(done){
    // The angular element is the first child (the <pre> tag)
    ngElementA =      container2.children[0];
    polymerElementA = container2.children[1];
    ngElementB =      container2.children[2];
    polymerElementB = container2.children[3];

    polymerElementA.setAttribute('in', '2');
    polymerElementB.setAttribute('in', '4');

    // Must wait one event loop for ??? to do its thing
    setTimeout(done, 0); // One event loop for Polymer to process
  });

  it('sees first polymer update properly', function(){
    expect(polymerElementA.getAttribute('out')).toEqual('4');
  });

  // The actual test
  it('sees values from first polymer', function(){
    expect(ngElementA.innerHTML).toEqual('4');
  });

  it('sees second polymer update properly', function(){
    expect(polymerElementB.getAttribute('out')).toEqual('8');
  });

  // The actual test
  it('sees values from second polymer', function(){
    expect(ngElementB.innerHTML).toEqual('8');
  });
});

describe('binding objects', function(){
  // Build in setup, check expectations in tests
  var ngElement, polymerElement;

  beforeEach(function(done){
    // The angular element is the first child (the <pre> tag)
    ngElement = object_container.children[0];
    polymerElement = object_container.children[1];

    polymerElement.setAttribute('in', '2');

    // Must wait one event loop for ??? to do its thing
    setTimeout(done, 0); // One event loop for Polymer to process
  });

  it('sees polymer update properly', function(){
    expect(polymerElement.getAttribute('out')).toEqual('4');
  });

  // The actual test
  it('sees values from polymer', function(){
    expect(ngElement.innerHTML).toEqual('4');
  });
});
