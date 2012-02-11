<h2>NWTui</h2>

NWTui is a modern approach at a javascript framework. NWTui combines the best practices of leading JS frameworks, along with some personal touches that make for an extremely familiar environment which you will be able to develop rapidly in.

## NWTAnimate
<p>Animation utility</p>

@constructor - <br>


### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance<br>@param (object) - Objectof styles to animate. E.g., {top: 10}<br>@param (integer) - Durationin seconds to animate<br>@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);<br>


## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - <br>


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

@constructor - <br>


### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector<br>


### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get<br>


### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set<br>


### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get<br>


### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove<br>


### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove<br>


### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set<br>


### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for<br>@param (function) - Eventcallback function<br>


### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set<br>


### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector<br>


### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector<br>


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

@param (integer) - Amountof time in seconds to wait<br>


## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - <br>


### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup<br>


## one
<p>Returns a NWTNodeInstance class</p>

@constructor - <br>


## all
<p>Returns a NWTNodeList class</p>

@constructor - <br>


## NWTNodeList
<p>A node iterator</p>

@constructor - <br>


### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node<br>


### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item<br>


### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - <br>


## NWTAnimate
<p>Animation utility</p>

@constructor - <br>


### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance<br>@param (object) - Objectof styles to animate. E.g., {top: 10}<br>@param (integer) - Durationin seconds to animate<br>@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);<br>


## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - <br>


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

@constructor - <br>


### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector<br>


### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get<br>


### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set<br>


### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get<br>


### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove<br>


### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove<br>


### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set<br>


### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for<br>@param (function) - Eventcallback function<br>


### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set<br>


### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector<br>


### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector<br>


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

@param (integer) - Amountof time in seconds to wait<br>


## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - <br>


### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup<br>


## one
<p>Returns a NWTNodeInstance class</p>

@constructor - <br>


## all
<p>Returns a NWTNodeList class</p>

@constructor - <br>


## NWTNodeList
<p>A node iterator</p>

@constructor - <br>


### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node<br>


### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item<br>


### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - <br>


## NWTAnimate
<p>Animation utility</p>

@constructor - <br>


### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance<br>@param (object) - Objectof styles to animate. E.g., {top: 10}<br>@param (integer) - Durationin seconds to animate<br>@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);<br>


## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - <br>


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

@constructor - <br>


### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector<br>


### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get<br>


### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set<br>


### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get<br>


### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove<br>


### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove<br>


### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set<br>


### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for<br>@param (function) - Eventcallback function<br>


### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set<br>


### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector<br>


### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector<br>


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

@param (integer) - Amountof time in seconds to wait<br>


## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - <br>


### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup<br>


## one
<p>Returns a NWTNodeInstance class</p>

@constructor - <br>


## all
<p>Returns a NWTNodeList class</p>

@constructor - <br>


## NWTNodeList
<p>A node iterator</p>

@constructor - <br>


### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node<br>


### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item<br>


### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - <br>


## NWTAnimate
<p>Animation utility</p>

@constructor - <br>


### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance<br>@param (object) - Objectof styles to animate. E.g., {top: 10}<br>@param (integer) - Durationin seconds to animate<br>@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);<br>


## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - <br>


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

@constructor - <br>


### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector<br>


### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get<br>


### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set<br>


### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get<br>


### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove<br>


### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove<br>


### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set<br>


### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for<br>@param (function) - Eventcallback function<br>


### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set<br>


### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector<br>


### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector<br>


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

@param (integer) - Amountof time in seconds to wait<br>


## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - <br>


### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup<br>


## one
<p>Returns a NWTNodeInstance class</p>

@constructor - <br>


## all
<p>Returns a NWTNodeList class</p>

@constructor - <br>


## NWTNodeList
<p>A node iterator</p>

@constructor - <br>


### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node<br>


### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item<br>


### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - <br>


## NWTAnimate
<p>Animation utility</p>

@constructor - <br>


### NWTAnimate::anim
<p>Method to animate a node</p>

@param (object) - NWTNodeinstance<br>@param (object) - Objectof styles to animate. E.g., {top: 10}<br>@param (integer) - Durationin seconds to animate<br>@param (string) - Easingtype. One of: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);<br>


## NWTIO
<p>Provides ajax communication methods<br />The folllowing methods are chainable<br />success - success handler<br />failure - failure handler<br />serialize - serialize a form, selector, array, or object to send</p>

@constructor - <br>


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

@constructor - <br>


### NWTNodeInstance::ancestor
<p>Returns the ancestor that matches the css selector</p>

@param (string) - CSSSelector<br>


### NWTNodeInstance::hasClass
<p>Returns true if the class exists on the node, false if not</p>


### NWTNodeInstance::addClass
<p>Adds a class to the node</p>


### NWTNodeInstance::removeClass
<p>Removes a class from the node.</p>


### NWTNodeInstance::data
<p>Gets a data attribute from the node<br />Pass just whatever comes after data-<br />If the attribute were data-user-id,<br />you should pass 'user-id' to this function</p>

@param (string) - Dataattribute to get<br>


### NWTNodeInstance::get
<p>Gets a property from the node object</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::set
<p>Sets an attribute on the node</p>

@param (string) - Attributeto set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::getAttribute
<p>Gets an attribute from the DOM node</p>

@param (string) - Attributeto get<br>


### NWTNodeInstance::setAttribute
<p>Sets an attribute on the DOM node</p>

@param (string) - Attributeto set<br>


### NWTNodeInstance::getStyle
<p>Gets a style attribute set on the node</p>

@param (string) - Styleattribute to get<br>


### NWTNodeInstance::removeStyle
<p>Removes a style attribute</p>

@param (string) - Styleattribute to remove<br>


### NWTNodeInstance::removeStyles
<p>Removes an array of styles from a node</p>

@param (array) - Arrayof styles to remove<br>


### NWTNodeInstance::setStyle
<p>Sets a style attribute</p>

@param (string) - Styleattribute to set<br>@param (string) - Valueto set<br>


### NWTNodeInstance::setStyles
<p>Sets multiple styles</p>

@param (object) - Objectmap of styles to set<br>


### NWTNodeInstance::on
<p>Adds an event listener tot he node</p>

@param (string) - Eventto listen for<br>@param (function) - Eventcallback function<br>


### NWTNodeInstance::serialize
<p>Serializes sub children of the current node into post data</p>


### NWTNodeInstance::getContent
<p>Gets the content of the node</p>


### NWTNodeInstance::setContent
<p>Sets the content of the node</p>

@param (string) - Contentto set<br>


### NWTNodeInstance::next
<p>Returns the next node</p>


### NWTNodeInstance::previous
<p>Returns the previous node</p>


### NWTNodeInstance::one
<p>Returns a child node instance based on a selector<br />Implements querySelector</p>

@param (string) - cssselector<br>


### NWTNodeInstance::all
<p>Returns a child nodelist based on a selector<br />Implements querySelector</p>

@param (string) - CSSSelector<br>


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

@param (integer) - Amountof time in seconds to wait<br>


## NWTNode
<p>NWTNode Class<br />Used for getting elements</p>

@constructor - <br>


### NWTNode::create
<p>Creates a node from markup</p>

@param (string) - Nodemarkup<br>


## one
<p>Returns a NWTNodeInstance class</p>

@constructor - <br>


## all
<p>Returns a NWTNodeList class</p>

@constructor - <br>


## NWTNodeList
<p>A node iterator</p>

@constructor - <br>


### NWTNodeList::each
<p>Node iterator</p>

@param (function) - Callbackfor each node<br>


### NWTNodeList::item
<p>Returns a node specified by an offset</p>

@param (integer) - Offsetof the item<br>


### NWTNodeList::size
<p>Returns the size of the current nodelist</p>

@return (integer) - <br>


