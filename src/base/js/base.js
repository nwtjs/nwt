/*!
 * NWT primary entry point
 * @constructor
 */
function NWT() {

};

var nwt = new NWT();

/*! 
 * Global window object with a reference to the nwt object
 * This is so we can share libraries client and server side
 */
window.nwt = nwt;