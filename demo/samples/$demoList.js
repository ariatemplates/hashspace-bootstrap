var asyncRequire = require("noder-js/asyncRequire");

//The list of demos to be loaded is defined here
var demos = [
    {id: 'carousel', prettyName: 'Carousel'},
    {id: 'tabbar', prettyName: 'Togglable tabs'},
    {id: 'dropdown', prettyName: 'Dropdown'},
    {id: 'alert', prettyName: 'Alert messages'}
];

exports.getDemo = function() {
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
};

exports.getDemo.$preload = function() {
    var modules = [];
    for (var i = 0; i < demos.length; i++) {
        modules.push('./samples/' + demos[i].id + '/demo.hsp');
        modules.push('./samples/' + demos[i].id + '/README.hsp');
    }
    return asyncRequire.apply(null, modules);
};
