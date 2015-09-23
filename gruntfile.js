module.exports = function(grunt) {

    grunt.initConfig({

        // get the configuration info from package.json
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // configure csslint
        csslint: {
            options: {
                // reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint all css files in src
            build: ['css/**/*.css']
        },

        // configure jshint
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'js/main.js']
        },      

        // configure cssmin
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'css/styles.min.css': 'css/**/*.css'
                }
            }
        },

        // configure uglify
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
                },

            build: {
                files: {
                  'js/app.min.js': ['js/main.js']
                }
            }
        },

        // configure htmlmin
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'public/',
                src: ['**/*.html'],
                dest: 'public/'
                // files: {
                //     'public/index.html': 'src/index.html'
                // }      
            }
        },

        // configure watch to auto update
        watch: {

            // for stylesheets, run cssmin 
            css: {
                files: ['css/main.css'],
                tasks: ['csslint', 'cssmin']
                // options: {
                //     // Start a live reload server on the default port 35729
                //     livereload: true,
                // },
            },

            // for scripts, run jshint and uglify 
            scripts: { 
                files: ['js/main.js'], 
                tasks: ['jshint', 'uglify'] 
            },

            // for html, run htmlmin 
            html: {
                files: ['index.html'], 
                tasks: ['htmlmin']               
            },

            options: {
                livereload: true
            }          
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "css/*.css",
                        "js/*.js",
                        "index.html",
                    ]
                },
                options: {
                    open: true,
                    port: 4000,
                    browser: [
                            "google-chrome-stable",                            
                    ],
                    watchTask: true,
                    proxy: "localhost/html5-boilerplate-bower-grunt"
                }
            }
        }              

    });
                         
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default task
    grunt.registerTask('default', ['csslint', 'jshint', 'cssmin', 'uglify', 'htmlmin', 'browserSync', 'watch']);

};