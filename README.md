<h2>NWTui</h2>

NWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.

## NWTAnimate
<p>Animation utility</p>

@constructor - 



### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### NWTIO::post
<p>Runs IO POST</p>


### NWTIO::get
<p>Runs IO GET</p>


### NWTIO::put
<p>Runs IO PUT</p>


### NWTIO::delete
<p>Runs IO DELETE</p>


## NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector



### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### NWTNodeInstance::append
<p>Appends a node instance to this node</p>


### NWTNodeInstance::remove
<p>Removes a node instance from the dom</p>


### NWTNodeInstance::insert
<p>Inserts a given node into this node at the proper position</p>


### NWTNodeInstance::click
<p>Simulates a click event on a node</p>


### NWTNodeInstance::wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



## one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList
<p>A node iterator</p>

@constructor - 



### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate
<p>Animation utility</p>

@constructor - 



### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### NWTIO::post
<p>Runs IO POST</p>


### NWTIO::get
<p>Runs IO GET</p>


### NWTIO::put
<p>Runs IO PUT</p>


### NWTIO::delete
<p>Runs IO DELETE</p>


## NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector



### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### NWTNodeInstance::append
<p>Appends a node instance to this node</p>


### NWTNodeInstance::remove
<p>Removes a node instance from the dom</p>


### NWTNodeInstance::insert
<p>Inserts a given node into this node at the proper position</p>


### NWTNodeInstance::click
<p>Simulates a click event on a node</p>


### NWTNodeInstance::wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



## one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList
<p>A node iterator</p>

@constructor - 



### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate
<p>Animation utility</p>

@constructor - 



### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### NWTIO::post
<p>Runs IO POST</p>


### NWTIO::get
<p>Runs IO GET</p>


### NWTIO::put
<p>Runs IO PUT</p>


### NWTIO::delete
<p>Runs IO DELETE</p>


## NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector



### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### NWTNodeInstance::append
<p>Appends a node instance to this node</p>


### NWTNodeInstance::remove
<p>Removes a node instance from the dom</p>


### NWTNodeInstance::insert
<p>Inserts a given node into this node at the proper position</p>


### NWTNodeInstance::click
<p>Simulates a click event on a node</p>


### NWTNodeInstance::wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



## one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList
<p>A node iterator</p>

@constructor - 



### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate
<p>Animation utility</p>

@constructor - 



### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### NWTIO::post
<p>Runs IO POST</p>


### NWTIO::get
<p>Runs IO GET</p>


### NWTIO::put
<p>Runs IO PUT</p>


### NWTIO::delete
<p>Runs IO DELETE</p>


## NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector



### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### NWTNodeInstance::append
<p>Appends a node instance to this node</p>


### NWTNodeInstance::remove
<p>Removes a node instance from the dom</p>


### NWTNodeInstance::insert
<p>Inserts a given node into this node at the proper position</p>


### NWTNodeInstance::click
<p>Simulates a click event on a node</p>


### NWTNodeInstance::wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



## one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList
<p>A node iterator</p>

@constructor - 



### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



## NWTAnimate
<p>Animation utility</p>

@constructor - 



### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance
@param (object) - Objectof styles to animate. E.g., {top: 10}
@param (integer) - Durationin seconds to animate
@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);



## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - 



### NWTIO::post
<p>Runs IO POST</p>


### NWTIO::get
<p>Runs IO GET</p>


### NWTIO::put
<p>Runs IO PUT</p>


### NWTIO::delete
<p>Runs IO DELETE</p>


## NWTNodeInstance
<p>Individually wrapped NWTNode</p>

@constructor - 



### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector



### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get



### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get



### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set
@param (string) - Valueto set



### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get



### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set



### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get



### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove



### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove



### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set
@param (string) - Valueto set



### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set



### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for
@param (function) - Eventcallback function



### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set



### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector



### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector



### NWTNodeInstance::append
<p>Appends a node instance to this node</p>


### NWTNodeInstance::remove
<p>Removes a node instance from the dom</p>


### NWTNodeInstance::insert
<p>Inserts a given node into this node at the proper position</p>


### NWTNodeInstance::click
<p>Simulates a click event on a node</p>


### NWTNodeInstance::wait
<p>Waits a certain amount of time before running<br />chained callbacks</p>

@param (integer) - Amountof time in seconds to wait



## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - 



### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup



## one
<p>Returns a NWTNodeInstance class</p>

@constructor - 



## all
<p>Returns a NWTNodeList class</p>

@constructor - 



## NWTNodeList
<p>A node iterator</p>

@constructor - 



### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node



### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item



### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - 



