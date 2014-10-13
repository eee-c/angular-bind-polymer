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
    ngElement = container.children[0];
    polymerElement = container.children[1];

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
