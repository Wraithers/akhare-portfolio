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

		/// userminPrepare
		useminPrepare: {
			html: ['index.html', 'test.html'],
			options: {
				dest: 'public/build'
			}
		},

		// Concat
		concat: {
			options: {
				separator: ';'
			},
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		// Uglify
		uglify: {
			// dist configuration is provided by useminPrepare
			dist: {}
		},

		filerev: {
			options: {
					encoding: 'utf8',
					algorithm: 'md5',
					length: 20
				},
				release: {
					// filerev:release hashes(md5) all assets (images, js and css )
					// in dist directory
					files: [{
						src: [
							'public/build/img/*.{png,gif,jpg,svg}',
							'public/build/js/*.js',
							'public/build/css/*.css',
						]
					}]
				}
		},

		// Usemin
		// Replaces all assets with their revved version in html and css files.
		// options.assetDirs contains the directories for finding the assets
		// according to their relative paths
		usemin: {
			html: ['public/build/*.html'],
			css: ['public/build/css/*.css'],
			options: {
				assetsDirs: ['public/build', 'public/build/css']
			}
		},

		// Copy HTML and fonts
		copy: {
			// copy:release copies all html and image files to dist
			// preserving the structure
			release: {
				files: [
					{
						expand: true,
						src: [
							'*.html'
						],
						dest: 'public/build'
					}
				]
			}
		},

		clean: {
			dist: [
				'tmp/**',
				'public/build/*.html'
			]
		},

		// Manual Calls or non-production related

		//copy: {
		//	main: {
		//		expand: true,
		//		cwd: 'bower_components/',
		//		src: ['**/*.js'],
		//		dest: 'js/'
		//	},
		//},

		notify: {
			finished: {
				options: {
					enabled: true,
					title: 'Grunt Complete',  // optional
					message: 'Processes finished running', //required
				}
			},
			changed: {
				options: {
					enabled: true,
					title: 'Updated',  // optional
					message: 'Files finished updating', //required
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

			//Call Livereload when Watch task runs - Unnecessary
			//options: {
			//	livereload: true,
			//},

			watch_grunt: {
					files: ['public/build/css/*', 'public/build/js/*', 'public/build/img/*'],
					tasks: ['notify:finished']
			},

			watch_files: {
					files: ['public/build/*.html'],
					tasks: ['notify:changed'],
					options: {
						livereload: true
					}
			},
		}
	});

	grunt.registerTask('build', ['newer:sass']);
	grunt.registerTask('default', ['build','watch', 'notify']);
};
