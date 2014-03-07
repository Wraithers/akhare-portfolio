module.exports = function(grunt) {
	// Measures the time each task takes
	require('time-grunt')(grunt);

	// Load Grunt Config
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		dirs: {
			output: 'build'
		},

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss'],
			},
			dist: {
			options: {
				outputStyle: 'compressed',
				sourceComments: 'map',
				sourceMap: 'scss/app.scss'
			},
			files: {
				'tmp/app.css': 'scss/app.scss'
			}
			}
		},

		autoprefixer: {
			dist: {
			files: {
				'public/build/css/app.css': 'tmp/app.css'
			}
			}
		},

		concat: {
			basic: {
			src: [
				'bower_components/jquery/dist/jquery.js',
				'bower_components/foundation/js/foundation/foundation.js',
				'bower_components/jquery.cookie/jquery.cookie.js',
				'bower_components/foundation/js/foundation/foundation.joyride.js',
				'bower_components/foundation/js/foundation/foundation.tooltip.js',
				'bower_components/owl-carousel/owl.carousel.min.js',
				'assets/js/app.js'
			],
			dest: 'tmp/app.js'
			},
			extras: {
			src: [
				'bower_components/iscroll/iscroll-probe.js',
				'bower_components/modernizr/modernizr.js'
			],
			dest: 'tmp/iscroll-modernizr.js'
			}
		},

		uglify: {
			build: {
			files: {
				'public/build/js/iscroll-modernizr.min.js' : 'tmp/iscroll-modernizr.js',
				'public/build/js/app.min.js' : 'tmp/app.js'
			}
			}
		},

		imagemin: {
			dynamic: {
			files: [{
				expand: true,
				cwd: 'assets/img/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'public/build/img/'
			}]
			}
		},

		clean: {
			dist: [
			'tmp/**'
			]
		},

		// Manual Calls or non-production related

		copy: {
			main: {
				expand: true,
				cwd: 'bower_components/',
				src: ['**/*.js'],
				dest: 'js/'
			},
		},

		notify_hooks: {
			options: {
				enabled: true,
				// max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "Portfolio Website" // defaults to the name in package.json, or will use project directory's name
			}
		},

		notify: {
			finished: {
				options: {
					enabled: true,
					title: 'Grunt Complete',  // optional
					message: 'Processes finished running', //required
				}
			}
		},

		watch: {
			grunt: { files: ['Gruntfile.js'] },

			sass: {
				files: 'scss/**/*.scss',
				tasks: ['newer:sass']
			},

			autoprefixer: {
				files: 'tmp/app.css',
				tasks: ['newer:autoprefixer']
			},

			css: {
				files: ['public/build/css/*'],
				options: {
					livereload: true
				}
			},

			js: {
				files: [
					'assets/js/*.js'
				],
				tasks: ['newer:concat', 'newer:uglify'],
				options: {
					livereload: true,
					atBegin: true
				}
			},

			imagemin: {
				files: [
					'assets/img/**'
				],
				tasks: ['newer:imagemin'],
				options: {
					livereload: true,
					atBegin: true
				}
			},

			options: {
				livereload: true,
			},

			watch_css: {
					files: ['public/build/**/*'],
					tasks: ['notify:finished'],
			},
		}
	});

	grunt.registerTask('build', ['newer:sass']);
	grunt.registerTask('default', ['build','watch', 'notify']);
	grunt.task.run('notify_hooks');
};
