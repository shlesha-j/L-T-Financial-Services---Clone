module.exports = function(grunt) {
    grunt.initConfig({

        useminPrepare: {
            html: {
                src: ["source/*.html"],
            },
            options: {
                dest: "build/",
            },
        },
        cssmin: {
            minify: {
                files: [{
                    expand: true,
                    cwd: "source/assets/css/",
                    src: ["*.css"],
                    dest: "build/assets/css/",
                    ext: ".css",
                }, ],
            },
        },
        cmq: {
            options: {
                log: false,
            },
            your_target: {
                files: {
                    "source/assets/css/aos.css": "source/assets/css/aos.css",
                    "source/assets/css/global.css": "source/assets/css/global.css",
                    "source/assets/css/homePage.css": "source/assets/css/homePage.css",
                },
            },
        },
        autoprefixer: {
            options: {
                browsers: ["last 6 versions", "ie 8", "ie 9"],
            },
            your_target: {
                files: {
                    "source/assets/css/aos.css": "source/assets/css/aos.css",
                    "source/assets/css/global.css": "source/assets/css/global.css",
                    "source/assets/css/homePage.css": "source/assets/css/homePage.css",
                },
            },
        },
        imagemin: {
            images: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                },
                files: [{
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    cwd: "source/assets/images/",
                    src: ["**/*.{png,jpg,gif}"],
                    // Could also match cwd line above. i.e. project-directory/img/
                    dest: "source/assets/images/",
                }, ],
            },
            imagesthroughcss: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    cwd: 'source/assets/css/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    // Could also match cwd. i.e. project-directory/img/
                    dest: 'source/assets/css/images/'
                }]
            },
        },
        terser: {
            options: {},
            build: {
                files: {
                    "build/assets/js/vendor/jquery-3.7.1.min.js": [
                        "source/assets/js/vendor/jquery-3.7.1.min.js",
                    ],
                    "build/assets/js/vendor/aos.js": [
                        "source/assets/js/vendor/aos.js",
                    ],
                    "build/assets/js/vendor/swiper-bundle.min.js": [
                        "source/assets/js/vendor/swiper-bundle.min.js",
                    ],
                    "build/assets/js/global.js": [
                        "source/assets/js/global.js",
                    ],
                },
            },
        },
        usemin: {
            html: ["build/*.html"],
        },
        copy: {
            html: {
                expand: true,
                cwd: "source/",
                src: ["*.html"],
                dest: "build/",
            },
            images: {
                expand: true,
                cwd: "source/assets/images/",
                src: "**",
                dest: "build/assets/images/",
            },

            videos: {
                expand: true,
                src: ["source/assets/videos/**.{mov,mp4}"],
                cwd: "assets/",
                dest: "build/assets/videos/",
            },
            fonts: {
                expand: true,
                cwd: "source/assets/fonts/",
                src: "**",
                dest: "build/assets/fonts/",
            },
            js: {
                expand: true,
                cwd: "source/assets/js/",
                src: [],
                dest: "build/assets/js/",
            },
            css: {
                expand: true,
                cwd: "source/assets/css/",
                src: "**",
                dest: "build/assets/css/",
            },
            json: {
                expand: true,
                cwd: "source/assets/js/json",
                src: "**",
                dest: "build/assets/js/json",
            },
        },
        pug: {
            compile: {
                options: {
                    client: false,
                    pretty: "\t",
                    data: function(dest, src) {
                        return {
                            Page: { section: "home" } // Change dynamically per page
                        };
                    }
                },
                files: [{
                    expand: true,
                    cwd: "source/pages/",
                    src: ["*.pug"],
                    dest: "source/",
                    ext: ".html",
                }, ],
            },
        },
        sass: {
            options: {
                style: 'compressed',
            },
            compile: {
                files: {
                    "source/assets/css/aos.css": "source/scss/vendor/aos.scss",
                    "source/assets/css/global.css": "source/scss/layout.scss",
                    "source/assets/css/homePage.css": "source/scss/homePage/master.scss",
                },
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ["assets/css/*.css"],
                },
                options: {
                    watchTask: true,
                    server: "./source",
                },
                notify: true,
            },
        },

        /* Watch Plugin*/
        watch: {
            grunt: {
                files: ["Gruntfile.js"]
            },
            pug: {
                files: [
                    "source/pages/*.pug",
                    "source/layout/*.*",
                    "source/modules/*.*",
                    "source/include/*.*",
                    "source/modules/*/*.*",
                    "source/modules/*/*/*.*",
                ],
                tasks: ["pug"],
            },
            scss: {
                files: ["source/scss/*.scss", "source/scss/*/*.*", "source/scss/*/*/*.*"],
                tasks: ["sass", "cmq", "autoprefixer"],
            },
        },
    });
    grunt.loadNpmTasks("grunt-usemin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-combine-media-queries");
    grunt.registerTask("htmlize", ["pug"]);
    grunt.registerTask("watcher", ["browserSync", "watch"]);
    grunt.registerTask("css", ["sass"]);
    grunt.registerTask("default", ["browserSync", "watch", "terser"]);
    grunt.registerTask("build", [
        // "imagemin",
        "copy",
        "cssmin",
        "cmq",
        "useminPrepare",
        "usemin",
        "terser",
    ]);
};