<h2>NWTui</h2>

NWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.

## NWTAnimate::NWTAnimate
<p>Animation utility</p>

@constructor - 



NWTNodeinstanceObjectof styles to animate. E.g., {top: 10}Durationin seconds to animateEasingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);### anim
<p>Method to animate a node</p>

@param (object) - 
@param (object) - 
@param (integer) - 
@param (string) - 



## NWTIO::NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


## NWTNodeInstance::NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



CSSSelector### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - 



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


Dataattribute to get### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - 



Attributeto get### get
<p>Gets a property from the node object</p>

@param (string) - 



Attributeto setValueto set### set
<p>Sets an attribute on the node</p>

@param (string) - 
@param (string) - 



Attributeto get### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - 



Attributeto set### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - 



Styleattribute to get### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - 



Styleattribute to remove### removeStyle
<p>Removes a style attribute</p>

@param (string) - 



Arrayof styles to remove### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - 



Styleattribute to setValueto set### setStyle
<p>Sets a style attribute</p>

@param (string) - 
@param (string) - 



Objectmap of styles to set### setStyles
<p>Sets multiple styles</p>

@param (object) - 



Eventto listen forEventcallback function### on
<p>Adds an event listener tot he node</p>

@param (string) - 
@param (function) - 



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


Contentto set### setContent
<p>Sets the content of the node</p>

@param (string) - 



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


CSSSelector### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - 



CSSSelector### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - 



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


Amountof time in seconds to wait### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - 



## NWTNode::NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



Nodemarkup### create
<p>Creates a node from markup</p>

@param (string) - 



## one::one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all::all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList::NWTNodeList
<p>A node iterator</p>

@constructor - 



Callbackfor each node### each
<p>Node iterator</p>

@param (function) - 



Offsetof the item### item
<p>Returns a node specified by an offset</p>

@param (integer) - 



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate::NWTAnimate
<p>Animation utility</p>

@constructor - 



NWTNodeinstanceObjectof styles to animate. E.g., {top: 10}Durationin seconds to animateEasingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);### anim
<p>Method to animate a node</p>

@param (object) - 
@param (object) - 
@param (integer) - 
@param (string) - 



## NWTIO::NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


## NWTNodeInstance::NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



CSSSelector### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - 



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


Dataattribute to get### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - 



Attributeto get### get
<p>Gets a property from the node object</p>

@param (string) - 



Attributeto setValueto set### set
<p>Sets an attribute on the node</p>

@param (string) - 
@param (string) - 



Attributeto get### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - 



Attributeto set### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - 



Styleattribute to get### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - 



Styleattribute to remove### removeStyle
<p>Removes a style attribute</p>

@param (string) - 



Arrayof styles to remove### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - 



Styleattribute to setValueto set### setStyle
<p>Sets a style attribute</p>

@param (string) - 
@param (string) - 



Objectmap of styles to set### setStyles
<p>Sets multiple styles</p>

@param (object) - 



Eventto listen forEventcallback function### on
<p>Adds an event listener tot he node</p>

@param (string) - 
@param (function) - 



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


Contentto set### setContent
<p>Sets the content of the node</p>

@param (string) - 



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


CSSSelector### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - 



CSSSelector### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - 



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


Amountof time in seconds to wait### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - 



## NWTNode::NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



Nodemarkup### create
<p>Creates a node from markup</p>

@param (string) - 



## one::one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all::all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList::NWTNodeList
<p>A node iterator</p>

@constructor - 



Callbackfor each node### each
<p>Node iterator</p>

@param (function) - 



Offsetof the item### item
<p>Returns a node specified by an offset</p>

@param (integer) - 



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate::NWTAnimate
<p>Animation utility</p>

@constructor - 



NWTNodeinstanceObjectof styles to animate. E.g., {top: 10}Durationin seconds to animateEasingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);### anim
<p>Method to animate a node</p>

@param (object) - 
@param (object) - 
@param (integer) - 
@param (string) - 



## NWTIO::NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


## NWTNodeInstance::NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



CSSSelector### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - 



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


Dataattribute to get### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - 



Attributeto get### get
<p>Gets a property from the node object</p>

@param (string) - 



Attributeto setValueto set### set
<p>Sets an attribute on the node</p>

@param (string) - 
@param (string) - 



Attributeto get### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - 



Attributeto set### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - 



Styleattribute to get### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - 



Styleattribute to remove### removeStyle
<p>Removes a style attribute</p>

@param (string) - 



Arrayof styles to remove### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - 



Styleattribute to setValueto set### setStyle
<p>Sets a style attribute</p>

@param (string) - 
@param (string) - 



Objectmap of styles to set### setStyles
<p>Sets multiple styles</p>

@param (object) - 



Eventto listen forEventcallback function### on
<p>Adds an event listener tot he node</p>

@param (string) - 
@param (function) - 



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


Contentto set### setContent
<p>Sets the content of the node</p>

@param (string) - 



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


CSSSelector### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - 



CSSSelector### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - 



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


Amountof time in seconds to wait### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - 



## NWTNode::NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



Nodemarkup### create
<p>Creates a node from markup</p>

@param (string) - 



## one::one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all::all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList::NWTNodeList
<p>A node iterator</p>

@constructor - 



Callbackfor each node### each
<p>Node iterator</p>

@param (function) - 



Offsetof the item### item
<p>Returns a node specified by an offset</p>

@param (integer) - 



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate::NWTAnimate
<p>Animation utility</p>

@constructor - 



NWTNodeinstanceObjectof styles to animate. E.g., {top: 10}Durationin seconds to animateEasingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);### anim
<p>Method to animate a node</p>

@param (object) - 
@param (object) - 
@param (integer) - 
@param (string) - 



## NWTIO::NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


## NWTNodeInstance::NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



CSSSelector### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - 



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


Dataattribute to get### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - 



Attributeto get### get
<p>Gets a property from the node object</p>

@param (string) - 



Attributeto setValueto set### set
<p>Sets an attribute on the node</p>

@param (string) - 
@param (string) - 



Attributeto get### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - 



Attributeto set### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - 



Styleattribute to get### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - 



Styleattribute to remove### removeStyle
<p>Removes a style attribute</p>

@param (string) - 



Arrayof styles to remove### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - 



Styleattribute to setValueto set### setStyle
<p>Sets a style attribute</p>

@param (string) - 
@param (string) - 



Objectmap of styles to set### setStyles
<p>Sets multiple styles</p>

@param (object) - 



Eventto listen forEventcallback function### on
<p>Adds an event listener tot he node</p>

@param (string) - 
@param (function) - 



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


Contentto set### setContent
<p>Sets the content of the node</p>

@param (string) - 



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


CSSSelector### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - 



CSSSelector### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - 



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


Amountof time in seconds to wait### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - 



## NWTNode::NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



Nodemarkup### create
<p>Creates a node from markup</p>

@param (string) - 



## one::one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all::all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList::NWTNodeList
<p>A node iterator</p>

@constructor - 



Callbackfor each node### each
<p>Node iterator</p>

@param (function) - 



Offsetof the item### item
<p>Returns a node specified by an offset</p>

@param (integer) - 



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate::NWTAnimate
<p>Animation utility</p>

@constructor - 



NWTNodeinstanceObjectof styles to animate. E.g., {top: 10}Durationin seconds to animateEasingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);### anim
<p>Method to animate a node</p>

@param (object) - 
@param (object) - 
@param (integer) - 
@param (string) - 



## NWTIO::NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### post
<p>Runs IO POST</p>


### get
<p>Runs IO GET</p>


### put
<p>Runs IO PUT</p>


### delete
<p>Runs IO DELETE</p>


## NWTNodeInstance::NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



CSSSelector### ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - 



### hasClass
<p>Returns true if the class exists on the node, false if not</p>


### addClass
<p>Adds a class to the node</p>


### removeClass
<p>Removes a class from the node.</p>


Dataattribute to get### data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - 



Attributeto get### get
<p>Gets a property from the node object</p>

@param (string) - 



Attributeto setValueto set### set
<p>Sets an attribute on the node</p>

@param (string) - 
@param (string) - 



Attributeto get### getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - 



Attributeto set### setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - 



Styleattribute to get### getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - 



Styleattribute to remove### removeStyle
<p>Removes a style attribute</p>

@param (string) - 



Arrayof styles to remove### removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - 



Styleattribute to setValueto set### setStyle
<p>Sets a style attribute</p>

@param (string) - 
@param (string) - 



Objectmap of styles to set### setStyles
<p>Sets multiple styles</p>

@param (object) - 



Eventto listen forEventcallback function### on
<p>Adds an event listener tot he node</p>

@param (string) - 
@param (function) - 



### serialize
<p>Serializes sub children of the current node into post data</p>


### getContent
<p>Gets the content of the node</p>


Contentto set### setContent
<p>Sets the content of the node</p>

@param (string) - 



### next
<p>Returns the next node</p>


### previous
<p>Returns the previous node</p>


CSSSelector### one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - 



CSSSelector### all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - 



### append
<p>Appends a node instance to this node</p>


### remove
<p>Removes a node instance from the dom</p>


### insert
<p>Inserts a given node into this node at the proper position</p>


### click
<p>Simulates a click event on a node</p>


Amountof time in seconds to wait### wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - 



## NWTNode::NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



Nodemarkup### create
<p>Creates a node from markup</p>

@param (string) - 



## one::one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all::all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList::NWTNodeList
<p>A node iterator</p>

@constructor - 



Callbackfor each node### each
<p>Node iterator</p>

@param (function) - 



Offsetof the item### item
<p>Returns a node specified by an offset</p>

@param (integer) - 



### size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



