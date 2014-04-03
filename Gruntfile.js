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

		clean: {
			dist: [
				'public/build/*.html',
				'public/build/*.pdf',
				'public/build/*.php',
				'public/build/css/**',
				'public/build/fonts/**',
				'public/build/img/**',
				'public/build/js/**',
			]
		},

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss'],
			},
			dev: {
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
			dev: {
				files: {
					'css/app.css': 'tmp/app.css'
				}
			},
			release: {
				files: {
					'public/build/css/app.css': 'tmp/app.css'
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/build/img/'
				}]
			}
		},

		/// userminPrepare
		useminPrepare: {
			html: 'index.html',
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
						'public/build/img/**/*.{png,gif,jpg,svg}',
						'public/build/js/*.js',
						'public/build/css/*.css',
						'public/build/*.pdf',
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
			js: ['public/build/js/*.js'],
			options: {
				assetsDirs: ['public/build', 'public/build/css'],
				patterns: {
					js: [
						[/["']([^:"']+\.(?:png|gif|svg|jpe?g))["']/img, 'Image replacement in js files']
					]
				}
			}
		},

		// Copy HTML and fonts
		copy: {
			// copy:release copies all html files to dist
			// preserving the structure
			release: {
				files: [
					{
						expand: true,
						src: [
							'img/**/*.svg',
							'img/**/*.php',
							'css/owl.carousel.css',
							'fonts/*.{otf,eot,ttf,woff,svg}',
							'*.html',
							'*.pdf',
							'*.php'
						],
						dest: 'public/build'
					}
				]
			},
			secondary: {
				files: [
					{
						expand: true,
						src: [
							'img/**/small.jpg',
							'img/**/large.jpg'
						],
						dest: 'public/build'
					}
				]
			}
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
			},
			released: {
				options: {
					enabled: true,
					title: 'Released',  // optional
					message: 'Finished creating release', //required
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
				tasks: ['autoprefixer:dev']
			},

			css: {
				files: ['css/*'],
				options: {
					livereload: true
				}
			},

			js: {
				files: ['js/*'],
				options: {
					livereload: true
				}
			},

			html: {
				files: ['*.html'],
				options: {
					livereload: true
				}
			},

			//Called on Release instead
			//imagemin: {
			//	files: ['img/**'],
			//	tasks: ['newer:imagemin'],
			//	options: {
			//		livereload: true,
			//		atBegin: true
			//	}
			//},

			//Call Livereload when Watch task runs - Unnecessary
			//options: {
			//	livereload: true,
			//},

			watch_grunt: {
					files: ['css/*', 'js/*', 'img/*'],
					tasks: ['notify:finished']
			},

			watch_files: {
					files: ['*.html'],
					tasks: ['notify:changed'],
					options: {
						livereload: true
					}
			},

			watch_release: {
					files: ['public/build/*.html'],
					tasks: ['notify:released']
			},
		}
	});

	grunt.registerTask('build', ['newer:sass']);
	grunt.registerTask('default', ['build','watch', 'notify']);
	// Invoked with grunt release, creates a release structure
	grunt.registerTask('release', 'Creates a release in public/build', [
		'clean',
		'sass',
		'autoprefixer:release',
		'imagemin',
		'useminPrepare',
		'concat',
		'uglify',
		'copy:release',
		'filerev',
		'usemin',
		'copy:secondary'
	]);
};
