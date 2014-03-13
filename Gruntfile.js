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

		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			files: {
				src: 'public/build/img/**/*.{jpg,jpeg,gif,png,webp}'
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

			//Call Livereload when Watch task runs - Unnecessary
			//options: {
			//	livereload: true,
			//},

			filerev: {
				files: 'public/build/img/**/*.{jpg,jpeg,gif,png,webp}',
				tasks: ['filerev:files']
			},

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
