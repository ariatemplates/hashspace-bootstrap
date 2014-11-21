(function(define) {
define("samples/$demoList.js", ["hsp/$set","noder-js/asyncRequire"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); var asyncRequire = require("noder-js/asyncRequire");

//The list of demos to be loaded is defined here
var demos = [
    {id: 'carousel', prettyName: 'Carousel'},
    {id: 'tabbar', prettyName: 'Togglable tabs'},
    {id: 'alert', prettyName: 'Alert messages'}
];

$set(exports, "getDemo", function() {
    var demosTpl = [];
    for (var i = 0; i < demos.length; i++) {
        demosTpl.push({
            id: demos[i].id,
            prettyName: demos[i].prettyName,
            demo: require('./' + demos[i].id + '/demo.hsp').demo,
            description: require('./' + demos[i].id + '/README.hsp').description
        });
    }
    return demosTpl;
});

$set(exports.getDemo, "$preload", function() {
    var modules = [];
    for (var i = 0; i < demos.length; i++) {
        modules.push('./samples/' + demos[i].id + '/demo.hsp');
        modules.push('./samples/' + demos[i].id + '/README.hsp');
    }
    return asyncRequire.apply(null, modules);
});

});
define("samples/index.hsp", ["hsp/$set","./$demoList",{"module":"./$demoList","method":"getDemo","args":[]},"hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 

    var demos = require('./$demoList').getDemo();


var index =$set(exports, "index", require("hsp/rt").template([], function(n){
  var _demos,_demo;try {_demos=demos} catch(e) {_demos=n.g('demos')};try {_demo=demo} catch(e) {_demo=n.g('demo')};
  var __s = {demos : typeof demos === 'undefined' ? n.g('demos') : demos, demo : typeof demo === 'undefined' ? n.g('demo') : demo};
  return [__s,n.elt("div",0,{"class":"navbar navbar-inverse navbar-fixed-top","role":"navigation"},0,[n.elt("div",0,{"class":"container-fluid"},0,[n.elt("div",0,{"class":"navbar-header"},0,[n.elt("a",0,{"class":"navbar-brand","href":"#"},0,[n.$text(0,["Hashspace-Bootstrap"])]),n.$foreach({e1:[9,"demos"]},"demo_key","demo",0,1,[n.elt("a",{e1:[9,"demo.id"]},{"class":"navbar-brand","href":["#",1]},0,[n.$text({e1:[9,"demo.prettyName"]},["",1])])]),n.$text(0,[" "])]),n.elt("div",0,{"class":"collapse navbar-collapse"},0,[n.elt("ul",0,{"class":"nav navbar-nav navbar-right"},0,[n.elt("li",0,0,0,[n.elt("a",0,{"href":"https://github.com/ariatemplates/hashspace-bootstrap"},0,[n.$text(0,["Github"])])])])]),n.$text(0,[" "])])]),n.elt("div",0,{"class":"container-fluid"},0,[n.elt("div",0,{"class":"content"},0,[n.elt("h1",0,0,0,[n.$text(0,["Hashspace-Bootstrap"])]),n.elt("p",0,{"class":"lead"},0,[n.$text(0,["Hashspace components for Bootstrap."])]),n.$foreach({e1:[9,"demos"]},"demo_key","demo",0,1,[n.elt("section",0,0,0,[n.elt("hr",0,0,0),n.elt("h1",{e1:[9,"demo.id"]},{"id":["",1]},0,[n.$text({e1:[9,"demo.prettyName"]},["",1])]),n.elt("div",0,{"class":"row"},0,[n.elt("div",0,{"class":"col-md-6"},0,[n.cpt([null,"demo","demo"],0,0,0)]),n.elt("div",0,{"class":"col-md-6"},0,[n.cpt([null,"demo","description"],0,0,0)])])])]),n.$text(0,[" "])])])];
}));

});
define("samples/alert/README.hsp", ["hsp/$set","hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 
var description =$set(exports, "description", require("hsp/rt").template([], function(n){

  var __s = {};
  return [__s,n.elt("p",0,0,0,[n.$text(0,["An alert similar to "]),n.elt("a",0,{"href":"http://getbootstrap.com/javascript/#alerts"},0,[n.$text(0,["Bootstrap javascript alert"])]),n.$text(0,[" "])]),n.elt("h4",0,{"id":"attributes"},0,[n.$text(0,["Attributes"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Binding"])]),n.elt("th",0,0,0,[n.$text(0,["Type"])]),n.elt("th",0,0,0,[n.$text(0,["Default"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])])])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["closebutton"])])]),n.elt("td",0,0,0,[n.$text(0,["1-way"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["true"])]),n.elt("td",0,0,0,[n.$text(0,["Whether the alert contains a close button."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["fade"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["true"])]),n.elt("td",0,0,0,[n.$text(0,["Whether the alert will  animate out when closed."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["type"])])]),n.elt("td",0,0,0,[n.$text(0,["1-way"])]),n.elt("td",0,0,0,[n.$text(0,["string"])]),n.elt("td",0,0,0,[n.$text(0,["success"])]),n.elt("td",0,0,0,[n.$text(0,["Possible types include: success, info, warning, danger."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["closed"])])]),n.elt("td",0,0,0,[n.$text(0,["2-way"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["false"])]),n.elt("td",0,0,0,[n.$text(0,["Used to bind the onclose method."])])])])]),n.elt("h4",0,{"id":"events"},0,[n.$text(0,["Events"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])])])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["onclosestart"])])]),n.elt("td",0,0,0,[n.$text(0,["Called immediately when the close method is called."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["oncloseend"])])]),n.elt("td",0,0,0,[n.$text(0,["Called when the alert has been closed (will wait for CSS transitions to complete)."])])])])])];
}));

});
define("samples/alert/demo.hsp", ["hsp/$set","../../alert/alert.hsp","./demo","hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 

    var alert = require('../../alert/alert.hsp').alert;
    var alertCtrl = require("./demo");
    var alertController = alertCtrl.AlertController;


var demo =$set(exports, "demo", require("hsp/rt").template({ctl:[alertController,"alertController"],ref:"ctrl"}, function(n){
  var _ctrl,_$event,_alert;try {_ctrl=ctrl} catch(e) {_ctrl=n.g('ctrl')};try {_$event=$event} catch(e) {_$event=n.g('$event')};try {_alert=alert} catch(e) {_alert=n.g('alert')};
  var __s = {ctrl : typeof ctrl === 'undefined' ? n.g('ctrl') : ctrl, $event : typeof $event === 'undefined' ? n.g('$event') : $event, alert : typeof alert === 'undefined' ? n.g('alert') : alert};
  return [__s,n.elt("div",0,{"style":"width:400px"},0,[n.cpt([_alert,"alert"],{e1:[9,"ctrl.alertClosed"]},{"type":"success","closebutton":"false","closed":["",1]},0,[n.$text(0,["I am an alert without a close button! "]),n.elt("br",0,0,0),n.elt("a",{e1:[9,"ctrl.onclose($event)"]},{"href":"#"},{"click":1},[n.$text(0,["Close Me!"])])]),n.$text(0,[" "]),n.cpt([_alert,"alert"],0,{"type":"info","fade":"false"},0,[n.$text(0,["I am an alert without any closing transition - close me and I just disappear!"])]),n.$text(0,[" "]),n.cpt([_alert,"alert"],{e1:[9,"ctrl.onclosestart()"],e2:[9,"ctrl.oncloseend()"]},{"type":"warning"},{"closestart":1,"closeend":2},[n.$text(0,["I am an alert with callbacks for onclosestart and oncloseend - close me and check your console!"])]),n.$text(0,[" "]),n.cpt([_alert,"alert"],0,0,0,[n.$text(0,["I am the default type of alert which is \"danger\", so no attributes needed for me!"])]),n.elt("button",{e1:[9,"ctrl.toggle()"]},{"type":"button","class":"btn btn-default"},{"click":1},[n.$text(0,["Open and close an alert from a button!"])])])];
}));

});
define("samples/alert/demo.js", ["hsp/$set","hsp/klass"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); var klass = require("hsp/klass");

$set(exports, "AlertController", new klass({
    onclosestart : function (args) {
        console.log("onclosestart has been called.");
    },
    oncloseend : function (args) {
        console.log("oncloseend has been called.");
    },
    onclose : function (event) {
        event.preventDefault();
        $set(this, "alertClosed", true);
    },
    toggle : function () {
        $set(this, "alertClosed", (!this.alertClosed));
    }
}));

});
define("samples/carousel/README.hsp", ["hsp/$set","hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 
var description =$set(exports, "description", require("hsp/rt").template([], function(n){

  var __s = {};
  return [__s,n.elt("p",0,0,0,[n.$text(0,["A carousel component similar to "]),n.elt("a",0,{"href":"http://getbootstrap.com/javascript/#carousel"},0,[n.$text(0,["Bootstrap javascript carousel"])])]),n.elt("h4",0,{"id":"attributes"},0,[n.$text(0,["Attributes"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Binding"])]),n.elt("th",0,0,0,[n.$text(0,["Type"])]),n.elt("th",0,0,0,[n.$text(0,["Default"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])])])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["index"])])]),n.elt("td",0,0,0,[n.$text(0,["2-way"])]),n.elt("td",0,0,0,[n.$text(0,["int"])]),n.elt("td",0,0,0,[n.$text(0,["0"])]),n.elt("td",0,0,0,[n.$text(0,["Index (0-based) of the active slide."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["interval"])])]),n.elt("td",0,0,0,[n.$text(0,["1-way"])]),n.elt("td",0,0,0,[n.$text(0,["int"])]),n.elt("td",0,0,0,[n.$text(0,["5000"])]),n.elt("td",0,0,0,[n.$text(0,["The amount of time to delay between automatically cycling an item. If false or negative, carousel will not automatically cycle."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["pause"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["string"])]),n.elt("td",0,0,0,[n.$text(0,["\"hover\""])]),n.elt("td",0,0,0,[n.$text(0,["Pauses the cycling of the carousel on mouseover and resumes the cycling of the carousel on mouseout."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["wrap"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["true"])]),n.elt("td",0,0,0,[n.$text(0,["Whether the carousel should cycle continuously or have hard stops."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["noTransition"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["false"])]),n.elt("td",0,0,0,[n.$text(0,["Whether transitions are activated."])])])])]),n.elt("h4",0,{"id":"elements"},0,[n.$text(0,["Elements"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])]),n.elt("th",0,0,0)])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@slide"])])]),n.elt("td",0,0,0,[n.$text(0,["A slide of the carousel."])]),n.elt("td",0,0,0)]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@slide / @body"])])]),n.elt("td",0,0,0,[n.$text(0,["The body of the slide, any HTML element."])]),n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["Default"])])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@slide / @caption"])])]),n.elt("td",0,0,0,[n.$text(0,["The caption of the slide, a block of HTML displayed at the bottom center."])]),n.elt("td",0,0,0,[n.$text(0,["Optionnal"])])])])]),n.elt("h4",0,{"id":"events"},0,[n.$text(0,["Events"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])])])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["onslidestart"])])]),n.elt("td",0,0,0,[n.$text(0,["This event fires immediately when the transition starts."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["onslideend"])])]),n.elt("td",0,0,0,[n.$text(0,["This event is fired when the carousel has completed its slide transition."])])])])])];
}));

});
define("samples/carousel/demo.hsp", ["hsp/$set","../../carousel/carousel.hsp","hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 

    var carousel = require('../../carousel/carousel.hsp').carousel;


var demo =$set(exports, "demo", require("hsp/rt").template([], function(n){
  var _slideInterval,_slideIndex,_carousel;try {_slideInterval=slideInterval} catch(e) {_slideInterval=n.g('slideInterval')};try {_slideIndex=slideIndex} catch(e) {_slideIndex=n.g('slideIndex')};try {_carousel=carousel} catch(e) {_carousel=n.g('carousel')};
  var __s = {slideInterval : typeof slideInterval === 'undefined' ? n.g('slideInterval') : slideInterval, slideIndex : typeof slideIndex === 'undefined' ? n.g('slideIndex') : slideIndex, carousel : typeof carousel === 'undefined' ? n.g('carousel') : carousel};
  return [__s,n.let({e1:[9,"slideIndex = 0"]}),n.let({e1:[9,"slideInterval = 2000"]}),n.cpt([_carousel,"carousel"],{e1:[9,"slideInterval"],e2:[9,"slideIndex"]},{"interval":["",1],"index":["",2]},0,[n.catt("slide",0,0,0,[n.catt("body",0,0,0,[n.elt("img",0,{"style":"width: 800px; height: 400px;","src":"http://placekitten.com/800/400"},0)]),n.catt("caption",0,0,0,[n.elt("h3",0,0,0,[n.$text(0,["First slide label"])]),n.elt("p",0,0,0,[n.$text(0,["Nulla vitae elit libero, a pharetra augue mollis interdum."])])])]),n.catt("slide",0,0,0,[n.catt("body",0,0,0,[n.elt("img",0,{"style":"width: 800px; height: 400px;","src":"http://placekitten.com/801/400"},0)]),n.catt("caption",0,0,0,[n.elt("h3",0,0,0,[n.$text(0,["Second slide label"])]),n.elt("p",0,0,0,[n.$text(0,["Lorem ipsum dolor sit amet, consectetur adipiscing elit."])])])]),n.catt("slide",0,0,0,[n.elt("img",0,{"style":"width: 800px; height: 400px;","src":"http://placekitten.com/800/401"},0)])]),n.$text(0,[" "]),n.elt("form",0,{"role":"form"},0,[n.elt("div",0,{"class":"form-group"},0,[n.elt("label",0,{"for":"indexField"},0,[n.$text(0,["Index (0-based)"])]),n.elt("input",{e1:[9,"slideIndex"]},{"type":"number","class":"form-control","id":"indexField","value":["",1]},0)]),n.elt("div",0,{"class":"form-group"},0,[n.elt("label",0,{"for":"intervalField"},0,[n.$text(0,["Interval (negative number to stop the cycle)"])]),n.elt("input",{e1:[9,"slideInterval"]},{"type":"number","class":"form-control","id":"intervalField","value":["",1]},0)])])];
}));

});
define("samples/tabbar/README.hsp", ["hsp/$set","hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 
var description =$set(exports, "description", require("hsp/rt").template([], function(n){

  var __s = {};
  return [__s,n.elt("p",0,0,0,[n.$text(0,["A tabbar component similar to "]),n.elt("a",0,{"href":"http://getbootstrap.com/javascript/#tabs"},0,[n.$text(0,["Bootstrap javascript togglable tabs"])])]),n.elt("h4",0,{"id":"attributes"},0,[n.$text(0,["Attributes"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Binding"])]),n.elt("th",0,0,0,[n.$text(0,["Type"])]),n.elt("th",0,0,0,[n.$text(0,["Default"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])])])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["index"])])]),n.elt("td",0,0,0,[n.$text(0,["2-way"])]),n.elt("td",0,0,0,[n.$text(0,["int"])]),n.elt("td",0,0,0,[n.$text(0,["0"])]),n.elt("td",0,0,0,[n.$text(0,["Index (0-based) of the active tab."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["noTransition"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["false"])]),n.elt("td",0,0,0,[n.$text(0,["Whether transitions are activated."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["display"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["string"])]),n.elt("td",0,0,0,[n.$text(0,["\"tabs\""])]),n.elt("td",0,0,0,[n.$text(0,["Define how the tabs must be display. The available values are \"tabs\", \"pills\" and \"vertical\""])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["justified"])])]),n.elt("td",0,0,0,[n.$text(0,["none"])]),n.elt("td",0,0,0,[n.$text(0,["boolean"])]),n.elt("td",0,0,0,[n.$text(0,["false"])]),n.elt("td",0,0,0,[n.$text(0,["if true, the tabs width are equally distributed through the whole width"])])])])]),n.elt("h4",0,{"id":"elements"},0,[n.$text(0,["Elements"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])]),n.elt("th",0,0,0)])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@tab"])])]),n.elt("td",0,0,0,[n.$text(0,["A tab of the carousel."])]),n.elt("td",0,0,0)]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@tab / @content"])])]),n.elt("td",0,0,0,[n.$text(0,["The content of the tab, any HTML element."])]),n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["Default"])])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@tab / @label"])])]),n.elt("td",0,0,0,[n.$text(0,["The label of the tab, a block of HTML displayed at the bottom center."])]),n.elt("td",0,0,0)]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["@tab / @disabled"])])]),n.elt("td",0,0,0,[n.$text(0,["boolean. false by default. If true, the tab is disabled and not clickable"])])])])]),n.elt("h4",0,{"id":"events"},0,[n.$text(0,["Events"])]),n.elt("table",0,{"class":"table table-bordered"},0,[n.elt("thead",0,0,0,[n.elt("tr",0,0,0,[n.elt("th",0,0,0,[n.$text(0,["Name"])]),n.elt("th",0,0,0,[n.$text(0,["Description"])])])]),n.elt("tbody",0,0,0,[n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["onshow"])])]),n.elt("td",0,0,0,[n.$text(0,["This event fires when a tab has been clicked, before the new tab has been shown."])])]),n.elt("tr",0,0,0,[n.elt("td",0,0,0,[n.elt("strong",0,0,0,[n.$text(0,["onshown"])])]),n.elt("td",0,0,0,[n.$text(0,["This event fires when a tab has been clicked, after the new tab has been shown."])])])])])];
}));

});
define("samples/tabbar/demo.hsp", ["hsp/$set","../../tabbar/tabbar.hsp","hsp/rt"], function (module, global){
var require = module.require, exports = module.exports, __filename = module.filename, __dirname = module.dirname;

var $set=require("hsp/$set"); 
// ################################################################ 
//  This file has been generated by the hashspace compiler          
//  Direct MODIFICATIONS WILL BE LOST when the file is recompiled!  
// ################################################################ 

    var tabbar = require('../../tabbar/tabbar.hsp').tabbar;


var demo =$set(exports, "demo", require("hsp/rt").template([], function(n){
  var _index,_noTransition,_tabbar;try {_index=index} catch(e) {_index=n.g('index')};try {_noTransition=noTransition} catch(e) {_noTransition=n.g('noTransition')};try {_tabbar=tabbar} catch(e) {_tabbar=n.g('tabbar')};
  var __s = {index : typeof index === 'undefined' ? n.g('index') : index, noTransition : typeof noTransition === 'undefined' ? n.g('noTransition') : noTransition, tabbar : typeof tabbar === 'undefined' ? n.g('tabbar') : tabbar};
  return [__s,n.let({e1:[9,"index = 0"]}),n.let({e1:[9,"noTransition = false"]}),n.cpt([_tabbar,"tabbar"],{e1:[9,"index"],e2:[9,"noTransition"]},{"index":["",1],"noTransition":["",2]},0,[n.catt("tab",0,0,0,[n.catt("label",0,0,0,[n.elt("i",0,0,0,[n.$text(0,["Home"])])]),n.catt("content",0,0,0,[n.$text(0,["Panel 'Home'"]),n.elt("br",0,0,0),n.elt("br",0,0,0),n.$text(0,["Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui. "])])]),n.catt("tab",0,{"label":"Profile"},0,[n.$text(0,["Panel 'Profile'"]),n.elt("br",0,0,0),n.elt("br",0,0,0),n.$text(0,["Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park. "])]),n.catt("tab",0,{"label":"Disabled tab","disabled":"true"},0,[n.$text(0,["Panel 'Disabled tab'"]),n.elt("br",0,0,0),n.elt("br",0,0,0)])]),n.$text(0,[" "]),n.elt("form",0,{"role":"form"},0,[n.elt("div",0,{"class":"form-group"},0,[n.elt("label",0,{"for":"indexField"},0,[n.$text(0,["Index (0-based)"])]),n.elt("input",{e1:[9,"index"]},{"type":"number","class":"form-control","id":"indexField","value":["",1]},0)])])];
}));

});
})(noder.define);