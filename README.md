<h1>NWTui</h1>

NWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.

<h2>Usage</h2>

Include the script. We recommend namespacing window.nwt to window.n for easier access.

```html
<script type="text/javascript" src="nwt.main.min.js"></script>
<script type="text/javascript">window.n = window.nwt;</script>
```

<h2>Node Methods (DOM methods)</h2>

Accessing dom elements is easy and can be done with n.one() or n.all() for a collection.

```js
var el = n.one('#someid .someclass');
el.setContent('Hello Nodo');

// Alerts 'Hello Nodo'
alert(el.getContent());
```


<h2>Node Collections</h2>

Node Collections are useful when dealing with multiple nodes at once.

```js
// Creating a new collection
var els = n.all('#mymenu li');

// Iterate over each item in the collection
// Receives each element as an argument
els.each(function(el){
  console.log(el);
});


// Chaining from a single node is useful if you already have a node object
var mynode = n.one('#mymenu');
mynode.all('li').removeClass('active'); // Removes the 'active' class from all nodes in this collection
```


<h2>IO (ajax)</h2>

Using n.io it's easy to create ajax calls.

```js
// Get an io object with n.io
var req = n.io('/backend');

// Setup any handlers
req.success(fn);

// Send the request
req.post();


// Or chain everything together:
n.io('/backend').success(fn).post();
```


<h2>Anim (animation)</h2>

The anim utility provides a wrapper for hardware accelerated CSS3 transforms.

```js
n.one('#cat').anim({top:100, left:100}, 2);
```
