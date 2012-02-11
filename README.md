## NWTui

NWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.### NWTAnimate
<p>Animation utility</p>

@constructor - 



### anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



### NWTIO
<p>Provides ajax communication methods<br />Chainable methods</p>

<h2>The folllowing methods are chainable</h2>

<p>success - success handler<br /> failure - failure handler<br /> serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


### NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


### setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



### NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



### one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



### all
<p>Returns a NWTNodeList class</p>

@constructor - 



### NWTNodeList
<p>A node iterator</p>

@constructor - 



### each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



### NWTAnimate
<p>Animation utility</p>

@constructor - 



### anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



### NWTIO
<p>Provides ajax communication methods<br />Chainable methods</p>

<h2>The folllowing methods are chainable</h2>

<p>success - success handler<br /> failure - failure handler<br /> serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


### NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


### setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



### NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



### one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



### all
<p>Returns a NWTNodeList class</p>

@constructor - 



### NWTNodeList
<p>A node iterator</p>

@constructor - 



### each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



### NWTAnimate
<p>Animation utility</p>

@constructor - 



### anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



### NWTIO
<p>Provides ajax communication methods<br />Chainable methods</p>

<h2>The folllowing methods are chainable</h2>

<p>success - success handler<br /> failure - failure handler<br /> serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


### NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


### setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



### NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



### one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



### all
<p>Returns a NWTNodeList class</p>

@constructor - 



### NWTNodeList
<p>A node iterator</p>

@constructor - 



### each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



### NWTAnimate
<p>Animation utility</p>

@constructor - 



### anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



### NWTIO
<p>Provides ajax communication methods<br />Chainable methods</p>

<h2>The folllowing methods are chainable</h2>

<p>success - success handler<br /> failure - failure handler<br /> serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


### NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


### setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



### NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



### one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



### all
<p>Returns a NWTNodeList class</p>

@constructor - 



### NWTNodeList
<p>A node iterator</p>

@constructor - 



### each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



### NWTAnimate
<p>Animation utility</p>

@constructor - 



### anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



### NWTIO
<p>Provides ajax communication methods<br />Chainable methods</p>

<h2>The folllowing methods are chainable</h2>

<p>success - success handler<br /> failure - failure handler<br /> serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


### NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


### setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



### NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



### one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



### all
<p>Returns a NWTNodeList class</p>

@constructor - 



### NWTNodeList
<p>A node iterator</p>

@constructor - 



### each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



