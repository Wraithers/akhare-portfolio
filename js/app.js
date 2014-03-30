/**
 *	Initiate and set options for Foundation responsive framework
 *	- Set Cookie once Joyride tour is complete
 *	- Set location of tip for Joyride popup
 *	- After Joyride finished remove Joyride ref. list
 */
$(document).foundation(
	{ joyride :
		{
			'cookie_monster': true,
			'cookie_name': 'MenuTour',
			'cookie_domain': false,
			tip_location: 'bottom',
			post_ride_callback : function(){
				var elem = document.getElementById("joyride-block");
				elem.remove();
			}
		}
	}
);

$(document).ready(function(){
	/**
	*   GLOBAL VARIABLES
	*/
	var pageHeight = $(window).height();
	var pageWidth = $(window).width();
	var navigationHeight = $("#navigational").outerHeight();
	var myScroll = null;
	var iscrollY;
	var iscrollEnd;
	var iscrollInit;
	var nowScrollY;
	var position;
	var posY;
	var horScroll;
	var winHeight = pageHeight;
	var winWidth = pageWidth;
	var mainContentHeight = $('#main-content').height();
	var baseHeight = $('.work').outerHeight();
	var projectHeight;
	var projectWidth;
	var projectDisplay;
	var workWrapHeight;
	var landingWidth;
	var expArray;
	var owl;
	var aboutOwl;
	var peek = 2;
	var formFocus = 0;
	var tooltipExist;
	var joyrideBlock;
	var loadedReady = 0;

	/**
	*   ON RESIZE, check again
	*/
	$(window).resize(function () {
		pageWidth = $(window).width();
		winHeight = $(window).height();
		setTimeout(function() {
			calcDimensions();
		}, 200);
	});

	/**
	*   ON LOAD
	*/

	/* Initialize scroll so if user dropped to other part of page then home page. */
	$(window).trigger('scroll');

	function resize(){
			var heights = window.innerHeight;
			document.getElementById("landing").style.height = heights + "px";
	}

	resize(); // On load/window resize, recalc iScroll
	window.onresize = function() {
			resize();
	};

	/**
	 *	Styling of landing area links once iScroll allows scrolling
	 *	i.e. iScroll initialised and target classes attached to DOM elements
	 */
	var i = 0;
	function styleLinks () {
		setTimeout(function() {
			if ($('#pre-landing').hasClass('iScrollLoneScrollbar')) {
				$('.loading-page, .loading-status').addClass('exit').fadeOut('fast');
				$('#landing').addClass('quick-switch');
				iscrollInit = true;
				$('#menu-para a').addClass('ready-style');
				$('#scroll-main').addClass('ready-style');
				setTimeout(function () {
					$('#menu-para a').addClass('link-style');
					$('#scroll-main').addClass('ready-bounce');
					setTimeout(function() {
						$('#scroll-main').removeClass('ready-bounce');
					}, 400);
				}, 100);
			}
			else {
				if(i < 16) {
					var loadCheck = i++;
					loadingMessage(loadCheck);
					styleLinks();
				} else {
					i = 0;
					styleLinks();
				}
			}
		}, 200);
	}

	styleLinks();

	function loadingMessage (loadCheck) {
		switch(loadCheck)
		{
			case 0:
				$('.l-start').removeClass('exit').addClass('show');
				$('.l-content').removeClass('exit');
				break;
			case 5:
				$('.l-start').removeClass('show').addClass('exit').fadeOut('fast', function() {
					$('.l-content').addClass('show');
					$('.l-projects').removeClass('exit');
				});
				break;
			case 10:
				$('.l-content').removeClass('show').addClass('exit').fadeOut('fast', function() {
					$('.l-projects').addClass('show');
					$('.l-dinosaurs').removeClass('exit');
					$('.l-start').html("dragon fire");
				});
				break;
			case 15:
				$('.l-projects').removeClass('show').addClass('exit').fadeOut('fast', function() {
					$('.l-dinosaurs').addClass('show');
					$('.l-leprechauns').removeClass('exit');
					$('.l-content').html("pirate ships");
				});
				break;
			case 20:
				$('.l-dinosaurs').removeClass('show').addClass('exit').fadeOut('fast', function() {
					$('.l-leprechauns').addClass('show');
					$('.l-projects').html("secret islands");
				});
				break;
			case 25:
				$('.l-leprechauns').removeClass('show').addClass('exit').fadeOut('fast', function() {
					$('.l-dinosaurs').html("buried treasure");
					$('.l-leprechauns').html("your location");
				});
				break;
		}
	}

	/**
	 * Cookier checker via param name search
	 * @param  {string} sKey String containing cookie name
	 * @return {boolean}      If true, it means the cookie exists, else it doesn't
	 */
	function checkCookie (sKey) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	}

	/**
	 *	If 'MenuTour' cookie exists, set joyrideBlock to true,
	 *	this disables menu dropdown while scrolling down
	 */
	if ((checkCookie("MenuTour") === true)) {
		joyrideBlock = true;
	}

	/**
	 *	Resume snippets for landing area
	 */

	expArray = ["Freelance", "Fountainhead Digital", "Founder of Studio Quad", "RMIBLR Fashion Show", "Fastrack"];
	specArray = ["Web <br> Design", "Front-End Development", "UI <br> Design", "UX <br> Design", "Interaction Design", "Motion Graphics", "Graphic Design", "Branding & Logo Design", "Wordpress & Social Media"];
	skillArray = ["Sublime Text 3", "Adobe Illustrator", "After Effects", "Photoshop", "Premiere", "EventGhost", "HTML 5", "CSS3", "Sass", "Javascript", "jQuery", "Markdown", "Bootstrap", "Foundation", "CLIs (Grunt, Bower)", "GitHub", "InDesign", "MaxMSP", "Processing", "Fireworks", "PHP", "JSON", "MySQL", "CLIs (Guard, Node.js, Git)"];
	intArray = ["Automation", "Apps", "Hacking", "Games: <br> FPS", "Games: <br> RTS", "Games: <br> RPG", "Games: <br> ARTS", "Games: <br> Retro", "Movies: <br> Comedy", "Movies: <br> Thriller", "Movies: <br> Horror", "Movies: <br> Classics", "Food: <br> Desserts", "Food: <br> Mediterranean", "Food: <br> Asian", "Food: <br> Italian", "Music: <br> Punk Rock", "Music: <br> Twee-Pop", "Music: <br> Electronica", "Music: <br> Indie", "Music: <br> Crime", "Novels: <br> Fantasy", "Novels: <br> Mystery", "Novels: <br> Sci-fi"];

	$('#resume-sections .fa-certificate').mouseleave(function() {
		setTimeout(function() {
			var arr = Math.floor(Math.random()*expArray.length);
			$('.fa-certificate .below').html(expArray[arr]);
		}, 300);
	});

	$('#resume-sections .fa-magic').mouseleave(function() {
		setTimeout(function() {
			var arr = Math.floor(Math.random()*specArray.length);
			$('.fa-magic .below').html(specArray[arr]);
		}, 300);
	});

	$('#resume-sections .fa-rocket').mouseleave(function() {
		setTimeout(function() {
			var arr = Math.floor(Math.random()*skillArray.length);
			$('.fa-rocket .below').html(skillArray[arr]);
		}, 300);
	});

	$('#resume-sections .fa-flask').mouseleave(function() {
		setTimeout(function() {
			var arr = Math.floor(Math.random()*intArray.length);
			$('.fa-flask .below').html(intArray[arr]);
		}, 300);
	});

	/**
	 *   Owl Carousel for all the work
	 */

	owl = $("#portfolio");

	owl.owlCarousel({
		itemsCustom : [
		[0, 1],
		[640, 2],
		[1025, 3],
		[1200, 3],
		[1400, 4],
		[1600, 5]
		],
		afterInit : function(elem){
					var that = this;
					that.owlControls.prependTo(elem);
				}
	});

	/**
	 *	Custom Navigation Events for portfolio Owl Carousel
	 */
	$(".next").click(function(){
		owl.trigger('owl.next');
	});
	$(".prev").click(function(){
		owl.trigger('owl.prev');
	});

	$(function() {
		// Set up vars
		var	$workLinks     = $(".work-thumbs a"),
			$workDiv       = $(".work"),
			$workWrap      = $("#work-wrap"),
			baseWidth      = $('.guts').width(),
			baseHeight     = $workDiv.outerHeight();

		/**
		 *	If History supported, capture href of project clicked,
		 *	add to root url & set content to load
		 */
		if (history.pushState) {
			var everPushed  = false;

			$workLinks.click(function (e) {
				if ($(this).parents().hasClass('active') === false) {
					var toLoad = $(this).attr("href");
					history.pushState(null, '', toLoad);
					everPushed = true;
					$(this).children('.fa').addClass('loading-spin');
					loadContent(toLoad);
					return false;
				}
				e.preventDefault();
			});

			/**
			 *	Detect back and forward buttonpresses, and react based on new url
			 *	If url doesn't match certain strings, load project content
			 *	Else project must be open, so close project
			 */
			window.onpopstate = function () {
				if (everPushed) {
					$.getScript(location.href);

					var current_path = window.location.pathname.split('/').pop();
					if( current_path !== '' &&
						current_path !== '#' &&
						current_path !== 'index.html' &&
						current_path !== 'index.html#') {
						loadContent(current_path);
					} else {
						closeProject();
					}
				}
				everPushed = true;
			};
		} // otherwise, history is not supported, so nothing fancy here.

		/**
		 *	Get file name from current URL, if not homepage, run loadContent() on it
		 */
		var current_path = window.location.pathname.split('/').pop();

		function checkProject () {
			setTimeout(function() {
				if ($('#pre-landing').hasClass('iScrollLoneScrollbar')) {
					iscrollInit = true;
					if( current_path !== '' &&
						current_path !== '#' &&
						current_path !== 'index.html' &&
						current_path !== 'index.html#') {
						loadContent(current_path);
					}
				} else {
					checkProject();
				}
			}, 300);
		}

		checkProject();

		function loadContent(href) {
			// Change page title based on project name, derived from href value of button clicked
			var projectName = href.replace(/\.[^\.\/]+$/, "").replace(/-/g," ").replace(/\w\S*/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
			if ($(document).attr("title")!== projectName + "  | Aaron Khare") {
				$(document).attr("title", projectName + "  | Aaron Khare");
			}

			/**
			 *	Remove active class from all projects, before adding it to the project loaded,
			 *	based on the name of the project, derived from the see-more button href
			 */
			$('.work-thumbs').removeClass('active');
			$( "li[data-name='" + projectName + "']" ).addClass('active');

			/**
			 *	Hide existing content (if any), load .guts' content from project at href,
			 *	calc new dimensions of .work & width of loaded project content, append Close button to content,
			 *	animate height of .work and show
			 */
			$('.project-wrapper').hide('fast');
			$('.close-button').hide('fast');
			$('.project-close').remove();
			$workWrap.hide('fast', function () {
				$workWrap.load(href + ' .guts', function () {
					calcDimensions();
					$('<a href="index.html" class="project-close"><img src="img/close.svg"></a>').appendTo($('.close-button'));
					$('.video-wrap iframe').load(function () {
						vimeoApiSet(100);
					});
					$workDiv.animate({
						height: baseHeight + workWrapHeight + "px"
					}, 1000, function () {
						projectDisplay = 1;
						$workWrap.show('fast');
						$('.project-wrapper').show('fast');
						$('.close-button').show('fast');
						iscrollRefresh();
					});
				});
			});
		}
		return false;
	});

	function calcDimensions () {
		var numContentItems  = $('.project-content').length;
		var numImgItems      = $('.project-img').length;
		var numTotalItems    = numContentItems + numImgItems;
		var owlWidth         = $(".owl-wrapper-outer").width();
		var projectLiWidth   = 600;
		var projectImgWidth  = $('.project-img').outerWidth();
		var projectContWidth = $('.project-content').outerWidth();

		/**
		 *	Calc project content height based on window height
		 */
		if(winHeight < 500 || winHeight > 650) {
			projectHeight = 500;
		} else {
			projectHeight = (winHeight-80); // Make adjustments for work-wrap padding & guts padding
		}
		$('.guts').height(projectHeight);
		workWrapHeight = $("#work-wrap").outerHeight(true);

		/**
		 *	Set left and right wrappers to the same height as project content,
		 *	set the width of the work-wrap so it'll sit inside the project wrappers
		 */
		if(winWidth < 640) {
			var workWrapHeightN = (workWrapHeight-20);
			$('.project-wrapper').outerHeight(workWrapHeightN);
		} else if (winWidth > 640) {
			$('.project-wrapper').outerHeight(workWrapHeight);
		}
		var owlWidthNoPad = (owlWidth-20);
		$("#work-wrap").css('width', owlWidthNoPad);

		$('.landing-img').width(owlWidthNoPad);
		landingWidth = $('.landing-img').width();
		$('.landing-content-wrap').width((owlWidthNoPad-70));

		/**
		 *	Calc project content width based on window width
		 */
		if(winWidth < 600) {
			projectImgWidth = projectLiWidth;
			$('.project-content').outerWidth(owlWidthNoPad);
			projectContWidth = $('.project-content').outerWidth();
			$('.guts').width(
				landingWidth +
				(numImgItems * projectImgWidth) +
				(numContentItems * projectContWidth)
			);
		} else {
			projectLiWidth = 600;
			projectContWidth = projectLiWidth;
			$('.guts').width(
				landingWidth +
				(numTotalItems * projectLiWidth)
			);
		}

		/**
		 *	Detect click on Close button, prevent default action to load index.html,
		 *	set var backHome to value of href attribute, which is index.html,
		 *	call closeProject and changeToHome to which backHome is also sent
		 */
		$('.project-close').click(function(e) {
			e.preventDefault();
			var backHome = $(this).attr("href");
			closeProject();
			changeToHome(backHome);
		});
	}

	function iscrollRefresh () {
		setTimeout(function () {
			myScroll.refresh();
			horScroll.destroy();
			horScroll = null;
			loaded();
			if (projectDisplay == 1) {
				$('.work-thumbs .fa').removeClass('loading-spin');
				myScroll.scrollToElement(document.querySelector('#work-wrap'), 400, null, -10, IScroll.utils.ease.quadratic);
				if (peek > 0) {
					peek--;
					$('.buffer .fa').css('opacity', '1');
					setTimeout(function() {
						horScroll.scrollBy(-400, 0, 800, IScroll.utils.ease.circular);
						setTimeout(function() {
							horScroll.scrollTo(0, 0, 800, IScroll.utils.ease.circular);
							$('.buffer .fa').removeAttr('style');
						}, 1200);
					}, 600);
				}
			}
		}, 400);
	}

	/**
	 *	Set projectDisplay to 0 indicating no content,
	 *	set page title back to homepage, animate height of .work div back to base height via inline style,
	 *	remove inline style so responsive heights take over, refresh iScrolls and scroll to project carousel
	 */
	function closeProject () {
		projectDisplay = 0;
		$(document).attr("title", "Aaron Khare | Portfolio");
		$('.work-thumbs').removeClass('active');
		$('.project-wrapper').hide('fast');
		$('.project-close').remove();
		$('#work-wrap').hide('fast', function() {
			$('.work').animate({
				height: baseHeight +"px"
			}, 1000, function () {
				$('.work').removeAttr('style');
				myScroll.scrollToElement(document.querySelector('#portfolio'), 400, null, -20, IScroll.utils.ease.quadratic);
				iscrollRefresh();
			});
		});
	}

	/**
	 *	Also, if History supported, change url to backHome
	 *	@param {String}	backHome	value of .project-close button's href, which is index.html
	 */
	function changeToHome (backHome) {
		if (history.pushState) {
			var everPushed  = false;

			if (projectDisplay === 0) {
				history.pushState(null, '', backHome);
				everPushed = true;
				return false;
			}
		}
	}

	/**
	 *	Vimeo Player API Handling
	 */
	$('.video-wrap iframe').load(function(){
		vimeoApiSet(1200);
	});

	function vimeoApiSet (delay) {
		setTimeout(function() {
			var iframe = $('#projectplayer')[0],
				player = $f(iframe);

			// When the player is ready, add listeners for pause, finish, and playProgress
			player.addEvent('ready', function() {
				$('.landing-content-wrap').css('display', 'none');
				$('.landing-content-wrap').fadeIn('fast');
				console.clear();

				player.addEvent('pause', onPause);
				player.addEvent('finish', onFinish);
				player.addEvent('playProgress', onPlayProgress);
			});

			// Call the API when a button is pressed
			// $('button').bind('click', function() {
			// player.api($(this).text().toLowerCase());
			// });

			function onPause(id) {
				if ($('.landing-content-wrap').css('display') == 'none') {
					$('.landing-content-wrap').fadeIn('fast');
				}
			}

			function onFinish(id) {
				if ($('.landing-content-wrap').css('display') == 'none') {
					$('.landing-content-wrap').fadeIn('fast');
				}
			}

			function onPlayProgress(data, id) {
				if (data.seconds > 0) {
					$('.landing-content-wrap').fadeOut('fast');
				}
			}
		}, delay);
	}

	/**
	 *	MEDIA QUERY HANDLER - Enquire.js
	 */

	aboutOwl = $('.about-table-wrap');

	enquire.register("screen and (max-width:64em)", {

		/**
		 *	OPTIONAL
		 *	If supplied, triggered when a media query matches.
		 */
		match : function() {
			$('.about-table-wrap').addClass('owl-carousel');
		},

		/**
		 *	OPTIONAL
		 *	If supplied, triggered when the media query transitions
		 *	*from a matched state to an unmatched state*.
		 */
		unmatch : function() {
			$('.about-table-wrap').removeClass('owl-carousel');
		},

		/**
		 *	OPTIONAL
		 *	If supplied, triggered once, when the handler is registered.
		 */
		setup : function() {
			aboutOwl.owlCarousel({
				itemsCustom : [
				[0, 1],
				[640, 2],
				[1025, 4]
				],
				afterInit : function(elem){
					var that = this;
					that.owlControls.prependTo(elem);
				}
			});
		},

		/**
		 *	OPTIONAL, defaults to false
		 *	If set to true, defers execution of the setup function
		 *	until the first time the media query is matched
		 */
		deferSetup : true,

		/**
		 *	OPTIONAL
		 *	If supplied, triggered when handler is unregistered.
		 *	Place cleanup code here
		 */
		destroy : function() {
			$(".about-table-wrap").data('owlCarousel').destroy();
		}

	})
	.register("screen and (max-width:40.063em)", {
		match: function() {
			var workWrapHeightN = (workWrapHeight-20);
			$('.project-wrapper').css('height', workWrapHeightN);
		},
		unmatch: function() {
			$('.project-wrapper').css('height', workWrapHeight);
		}
	});

	/**
	*	CUSTOM CLICK & CSS FUNCTIONS
	**/

	/**
	 *	Whenever a specific input is focused on, set formFocus to diff. number
	 */
	$(".f-name").focusin(function() {
		formFocus = 1;
	});
	$(".f-mobile").focusin(function() {
		formFocus = 2;
	});
	$(".f-email").focusin(function() {
		formFocus = 3;
	});
	$(".f-select").focusin(function() {
		formFocus = 4;
	});
	$(".f-note").focusin(function() {
		formFocus = 5;
	});

	$('.has-tip').click(function() {
		tooltipExist = 1;
	});

	/**
	 *	On document click activity, form blurs or tooltips fade
	 *	If formFocus == 1,2,3,4,5, function blurs corresponding input, when clicking outside them
	 *	If tooltipExist == 1, function fades out tooltips, when clicking outside them
	 *	iScroll prevents both without this
	 */
	$(document).click(function() {
		switch(formFocus)
		{
			case 1:
				$(".f-name input").blur();
				formFocus = 0;
				break;
			case 2:
				$(".f-mobile input").blur();
				formFocus = 0;
				break;
			case 3:
				$(".f-email input").blur();
				formFocus = 0;
				break;
			case 4:
				$(".f-select select").blur();
				formFocus = 0;
				break;
			case 5:
				$(".f-note textarea").blur();
				formFocus = 0;
				break;
		}

		if (tooltipExist == 1) {
			$(":not(.has-tip)").click(function() {
				$(".tooltip").fadeOut('fast');
			});
			tooltipExist = 0;
		}
	});

	/**
	 * Function to toggle the fullscreen menu depending on certain conditions
	 * - Evaluate if menu has a class that shows it
	 * - If it doesn't then perform actions cover fullscreen & animate menu list into view
	 * - If it does then perform actions to hide it & animate menu list out of view
	 */
	function menuOverlay(){
		var menu= $("#main-menu").hasClass("show-main-menu");
		switch (menu)
		{
		case false:
			$("#main-menu").css("display", "block");
			$("#main-menu").css("opacity","1");
			$("#main-menu").toggleClass("show-main-menu");
			$(".tab-bar").toggleClass("no-bg");
			$(".menu-footer").toggleClass("invis");
			$(".off-canvas-wrap").toggleClass("move-left");
		break;
		case true:
			$(".off-canvas-wrap").addClass("move-left");
			$("#main-menu").css("opacity","0");
			$(".exit-off-canvas").toggleClass("exit-fade");
			$(".tab-bar").toggleClass("no-bg");
			$(".menu-footer").toggleClass("invis");
			setTimeout( function(){
				$("#main-menu").toggleClass("show-main-menu");
				$(".exit-off-canvas").toggleClass("exit-fade");
				$(".off-canvas-wrap").removeClass("move-left");
			}, 610);
		break;
		}
		$(".lines-button").toggleClass("close");
	}

	/**
	 *	Clicking on either the menu button or the fullscreen overlay
	 *	runs the menu toggling function `menuOverlay` above
	 */
	$(".lines-button").click(function() {
		menuOverlay();
	});

	$(".exit-off-canvas").click(function() {
		menuOverlay();
	});

	/**
	 * Trigger appropriate page scrolling on `Home`, `End`, `Pg Up`, `Pg Down`, `Up` and `Down` keypresses
	 * only when form is not focused, so that input field navigation is not interrupted
	 * @param  {Keydown} event Handler to trigger the check-event.which-and-scroll function
	 */
	$(document).on('keydown', function(event) {
		if (iscrollInit) {
			if (formFocus === 0) {
				var keyPress = event.which;
				switch (keyPress)
				{
				case 36: // Home key pressed
					myScroll.scrollTo(0, 0, 10, IScroll.utils.ease.quadratic);
				break;
				case 35: // End key pressed
					myScroll.scrollTo(0, -mainContentHeight, 10, IScroll.utils.ease.quadratic);
				break;
				case 33: // Page Up key pressed
					if (nowScrollY < -140) {
						myScroll.scrollBy(0, 500, 100, IScroll.utils.ease.quadratic);
					}
				break;
				case 34: // Page Down key pressed
					if (nowScrollY > (-mainContentHeight+200)) {
						myScroll.scrollBy(0, -500, 100, IScroll.utils.ease.quadratic);
					}
				break;
				case 38: // Up key pressed
					if (nowScrollY < -60) {
						myScroll.scrollBy(0, 100, 100, IScroll.utils.ease.quadratic);
					}
				break;
				case 40: // Down key pressed
					if (nowScrollY > (-mainContentHeight+60)) {
						myScroll.scrollBy(0, -100, 100, IScroll.utils.ease.quadratic);
					}
				break;
				}
			}
		}
	});

	/**
	*	iSCROLL FUNCTIONS ON SCROLL
	**/

	function updatePositionNow () {

		nowScrollY = this.y;

		if (this.y < 0) {
			$(".tooltip").fadeOut('fast');
		}

		if ( this.y < -(winHeight * 0.2)) {
			$("#pre-row").css("opacity","0");
		} else {
			$("#pre-row").css("opacity","1");
		}

		if ( this.y < -(winHeight * 0.8)) {
			$("#navigational").removeClass("hide-top").addClass("show-top");

			/**
			 *	Check if Joyride list exists via length, but not if cookie present and joyrideBlock still present,
			 *	then bring menu down and start Joyride
			 */
			if ($('#joyride-block').length > 0 && joyrideBlock !== true) {
				setTimeout( function() {
					$("#navigational").removeClass("hide-top").addClass("show-top");
					setTimeout( function() {
						$(document).foundation('joyride', 'start');
					}, 0);
				}, 600);
			}
		}
		else if ( this.y > -(winHeight * 0.8)) {
			$("#navigational").removeClass("show-top").addClass("hide-top");
			if ($("#main-menu").hasClass("show-main-menu")) {
				menuOverlay();
			}

		}

		if ($("#main-menu").hasClass("show-main-menu") === false) {
			if ( this.y < -(winHeight * 1.2)) {
				$("#navigational").removeClass("show-top").addClass("hide-top");
				if (this.y > iscrollY) { // Scrolling Up
					$('#landing .overlay').fadeIn('fast');
					$("#navigational").addClass("show-top").removeClass("hide-top");
				}
				else if (this.y < iscrollY) { // Scrolling Down
					$('#landing .overlay').css('display', 'none');
					setTimeout(function(){
						$("#navigational").removeClass("show-top").addClass("hide-top");
					}, 0);
				}
			}
		}
	}

	/**
	*	iSCROLL INIT & OPTIONS
	**/

	function loaded () {
		winHeight = window.innerHeight;

		calcDimensions();
		loadedReady = 1;

		setTimeout(function() {
			if (myScroll === null) {
				/**
				 * Vertical iScroll for project content
				 * @type {IScroll}
				 */
				myScroll = new IScroll('#wrapper', {
					probeType: 3,
					mouseWheel: true,
					click: true,
					tap: true,
					bounce: false,
					indicators: [{
						el: document.getElementById('pre-landing'),
						resize: false,
						ignoreBoundaries: true,
						speedRatioY: -0.4
					}, {
						el: document.getElementById('pre-row'),
						resize: false,
						ignoreBoundaries: true,
						speedRatioY: 0.8
					}]
				});
			}

			myScroll.on('scroll', updatePositionNow);
			myScroll.on('scrollStart', function(){
				iscrollY = this.y;
			});
			myScroll.on('beforeScrollStart', function(){
				iscrollY = this.y;
			});
			myScroll.on('onScrollEnd', function() {
				iscrollEnd = this.y;
			});

			/**
			 * Horizontal iScroll for project content
			 * @type {IScroll}
			 */
			horScroll = new IScroll('#work-wrap', {
				eventPassthrough: true,
				scrollX: true,
				scrollY: false,
				bounce: false,
				preventDefault: false
			});
		}, 100);

		/**
		 *	Recalculate #main-content height everytime loaded() called
		 *	Mainly when project content is loaded and closed, since .work's height is changed
		 */
		mainContentHeight = $('#main-content').height();

	}

	/**
	*	iSCROLL TO ANCHORS
	**/

	$("#scroll-main").click(function() {
		myScroll.scrollToElement(document.querySelector('#main-content'), 1200, null, null, IScroll.utils.ease.circular);
	});

	$(".work-link").click(function() {
		myScroll.scrollToElement(document.querySelector('#work'), 1200, null, null, IScroll.utils.ease.circular);
		$("#f-moon").addClass("hide-sumo");
		$("#f-sun").addClass("hide-sumo");
		$(".fa-fire").addClass("show-f");
		if ($("#main-menu").hasClass("show-main-menu")) {
			setTimeout(function(){
				menuOverlay();
			}, 1200);
		}
		setTimeout(function(){
			$(".fa-fire").toggleClass("show-f");
			$("#f-sun").toggleClass("hide-sumo");
			$("#f-moon").toggleClass("hide-sumo");
		}, 2000);
	});

	$(".about-link").click(function() {
		myScroll.scrollToElement(document.querySelector('#about'), 1200, null, null, IScroll.utils.ease.quadratic);
		$("#f-rocket").addClass("hide-sumo");
		$("#f-gamepad").addClass("hide-sumo");
		$(".fa-lightbulb-o").addClass("show-f");
		if ($("#main-menu").hasClass("show-main-menu")) {
			setTimeout(function(){
				menuOverlay();
			}, 1200);
		}
		setTimeout(function(){
			$(".fa-lightbulb-o").toggleClass("show-f");
			$("#f-gamepad").toggleClass("hide-sumo");
			$("#f-rocket").toggleClass("hide-sumo");
		}, 2000);
	});

	$(".mail-link").click(function() {
		myScroll.scrollToElement(document.querySelector('#contact'), 1200, null, null, IScroll.utils.ease.quadratic);
		$("#f-thumbsup").addClass("hide-sumo");
		$("#f-pencil").addClass("hide-sumo");
		$(".fa-flash").addClass("show-f");
		if ($("#main-menu").hasClass("show-main-menu")) {
			setTimeout(function(){
				menuOverlay();
			}, 1200);
		}
		setTimeout(function(){
			$(".fa-flash").toggleClass("show-f");
			$("#f-thumbsup").toggleClass("hide-sumo");
			$("#f-pencil").toggleClass("hide-sumo");
		}, 2000);
	});

	/**
	 *	FORM SUBMISSION
	 */

	$('#hiya')
	.on('invalid', function () {
		var invalid_fields = $(this).find('[data-invalid]');
	})
	.on('submit', function (e) {
		if ($('.form-input').hasClass('error')) {
			$('#hiya').addClass('not-valid');
		}
		if ($('#hiya').hasClass('not-valid') !== true) {
			$.ajax({
				type: 'post',
				url: 'contact.php',
				data: $('form').serialize(),
				success: function(data){
					if (data == "Thanks for the mail! I'll check back with you soon, enjoy your day."){
						$("input[type='text'], input[type='email'], textarea").val("");
						$("select").val($("select option:first").val());
						$('#form-status').html('Great to hear from you!');
						$('#form-data').html(data);
						$('#form-response').foundation('reveal', 'open');

					}
					else {
						$('#form-status').html('Oh no! There were some errors =(');
						$('#form-data').html(data);
						$('#form-response').foundation('reveal', 'open');
					}
				}
			});
		}
		e.preventDefault();
	})
	.on('valid', function(e) {
		e.preventDefault();
		$('#hiya').removeClass('not-valid');
	});

	/**
	*	EVENT LISTENERS
	**/

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	window.addEventListener('load', loaded);

});
