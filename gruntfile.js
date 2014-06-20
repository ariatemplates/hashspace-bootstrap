module.exports = function (grunt) {

    grunt.initConfig({
        atpackager : {
            options : {
                sourceDirectories : ['target/dev'],
                sourceFiles : [ '**/*.js', '**/*.hsp'],
                outputDirectory : 'target/prod/',
                visitors : ["NoderDependencies"]
            },
            bootstrap : {
                options : {
                    defaultBuilder : {
                        type : "NoderPackage",
                        cfg : {
                            outputFileWrapper : "(function(define){$CONTENT$;})(noder.define);"
                        }
                    },
                    packages : [
                        {
                            name : "hashspace-bootstrap-demo.js",
                            files : ['demo/**/*.js', 'demo/**/*.hsp']
                        }, {
                            name : "hashspace-bootstrap.js",
                            files : ['**/*.js', '**/*.hsp', '!demo/**/*.*']
                        }]
                }
            }
        }
    });

    // Automatically load all the grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('atpackager');
    require('atpackager').loadNpmPlugin('noder-js');

    grunt.registerTask('package', ['atpackager:bootstrap']);
    grunt.registerTask('default', ['package']);
};
