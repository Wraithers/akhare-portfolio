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
	var projectName;
	var projectNamePrev;
	var workWrapHeight;
	var landingWidth;
	var pageProject;
	var screenSmall;
	var tick;
	var $bar;
	var expArray;
	var owl;
	var aboutOwl;
	var projectOwl;
	var peek = 2;
	var formFocus = 0;
	var tooltipExist;
	var joyrideBlock;
	var tock;
	var ticktock = 0;

	/**
	*   ON RESIZE, check again
	*/
	$(window).resize(function () {
		winWidth = $(window).width();
		winHeight = $(window).height();
		setTimeout(function() {
			if (winWidth > 0 && winWidth < 640) {
				baseHeight = 1070;
			} else if (winWidth > 640 && winWidth < 1025) {
				baseHeight = 1140;
			} else if (winWidth > 1025) {
				baseHeight = 920;
			}
			calcDimensions(projectName);
			if (projectDisplay == 1) {
				$('.work').outerHeight((baseHeight + workWrapHeight));
				horScroll.refresh();
			}
		}, 200);
	});

	//function fullHeight () {
	//	ticktock++;
	//	clearTimeout(tock);
	//	if (ticktock > 0 && ticktock < 2) {
	//		ticktock = 0;
	//		setTimeout(function() {
	//			var screenAvailHeight = screen.availHeight;
	//			var windowFullHeight = window.outerHeight;
	//			if (windowFullHeight == screenAvailHeight) {
	//				console.log(screenAvailHeight + " & " + windowFullHeight);
	//				calcDimensions(projectName);
	//				myScroll.refresh();
	//				if ($('.guts.active').length > 0) {
	//					horScroll.refresh();
	//				}
	//			}
	//		}, 1000);
	//	}
	//}

	/**
	*   ON LOAD
	*/

	/* Initialize scroll so if user dropped to other part of page then home page. */
	$(window).trigger('scroll');

	function resize() {
		var heights = window.innerHeight;
		document.getElementById("landing").style.height = heights + "px";
	}
	resize(); // On load/window resize calc landing area height

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
				iscrollInit = true;
				$('.loading-page, .loading-status').addClass('exit').fadeOut('fast');
				$('#landing').addClass('quick-switch');
				$('#menu-para a').addClass('ready-style');
				$('#scroll-main').addClass('ready-style');
				setTimeout(function () {
					$('#menu-para a').addClass('link-style').mouseenter();
					$('#scroll-main').addClass('ready-bounce');
					setTimeout(function() {
						$('#menu-para a').mouseleave();
						$('#scroll-main').removeClass('ready-bounce');
					}, 400);
				}, 100);
				setTimeout(function() {
					$('#item1 img').css('background-image', 'url("img/projects/sspl/thumb.png")');
					$('#item2 img').css('background-image', 'url("img/projects/continuum/thumbs/rotate.php")');
					$('#item3 img').css('background-image', 'url("img/projects/circa/thumb.png")');
					$('#item4 img').css('background-image', 'url("img/projects/unitedgamers/thumb.png")');
					$('#item5 img').css('background-image', 'url("img/projects/altfilmfestival/thumb.png")');
					$('#item6 img').css('background-image', 'url("img/projects/dotaunitedus/thumb.png")');
				}, 1000);
			}
			else {
				if(i < 26) { // This is the upper limit, allowing loadingMessage() to loop back
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

	$('#menu-para a').one('mouseenter', function() {
		$(this).prepend('<div class="anchor-style"></div>');
	});

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

	expArray = ["Freelance", "SSPL", "RMIBLR Continuum '12", "Fountainhead Digital", "Founder of Studio Quad", "RMIBLR Fashion Show", "Fastrack"];
	specArray = ["Web<br>Design", "Front-End Development", "UI<br>Design", "UX<br>Design", "Interaction Design", "Motion Graphics", "Graphic Design", "Branding & Logo Design", "Wordpress & Social Media", "Video & Post Production"];
	skillArray = ["Sublime<br>Text 3", "Illustrator", "After Effects", "Photoshop", "Premiere", "EventGhost", "HTML 5", "CSS3<br>(& Sass)", "Javascript", "jQuery", "Markdown", "Bootstrap", "Foundation", "CLIs (Grunt, Bower)", "GitHub", "InDesign", "MaxMSP", "Processing", "Fireworks", "PHP", "JSON", "MySQL", "CLIs (Guard, Node.js, Git)"];
	intArray = ["Automation", "Apps", "Hacking", "Games:<br>FPS", "Games:<br>RTS", "Games:<br>RPG", "Games:<br>ARTS", "Games:<br>Retro", "Movies:<br>Comedy", "Movies:<br>Thriller", "Movies:<br>Horror", "Movies:<br>Classics", "Food:<br>Desserts", "Food:<br>Mediterranean", "Food:<br>Asian", "Food:<br>Italian", "Music:<br>Punk Rock", "Music:<br>Twee-Pop", "Music:<br>Electronica", "Music:<br>Indie", "Music:<br>Crime", "Novels:<br>Fantasy", "Novels:<br>Mystery", "Novels:<br>Sci-fi"];

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
	$(".custom-navigation .next").click(function(){
		owl.trigger('owl.next');
	});
	$(".custom-navigation .prev").click(function(){
		owl.trigger('owl.prev');
	});

	/**
	 *	Function wrap for Project loading
	 */
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
					$(this).addClass('selected-project');
					history.pushState(null, '', toLoad);
					everPushed = true;
					$(this).children('.fa').addClass('loading-spin');
					if ($('[data-name="' + projectNamePrev + '"].active .img-carousel .play').hasClass('started')) {
						$('.active .img-carousel .play').click();
					}
					$('.guts.active').removeClass('active').fadeOut('fast').addClass('old');
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
						$('.guts.active').removeClass('active').fadeOut('fast').addClass('old');
						pageProject = true;
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

		function checkCurrentProject () {
			setTimeout(function() {
				if ($('#pre-landing').hasClass('iScrollLoneScrollbar')) {
					iscrollInit = true;
					if( current_path !== '' &&
						current_path !== '#' &&
						current_path !== 'index.html' &&
						current_path !== 'index.html#') {
						makeProjectName(current_path);
						$('.guts').addClass('active').attr('data-name', projectName);
						pageProject = true;
						loadContent(current_path);
					}
				} else {
					checkCurrentProject();
				}
			}, 300);
		}

		checkCurrentProject();

		function makeProjectName (href) {
			// Change page title based on project name, derived from href value of button clicked
			projectName = href.replace(/\.[^\.\/]+$/, "").replace(/-/g," ").replace(/\w\S*/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
			if (projectName == "Sspl") {
				projectName = "SSPL";
			} else if (projectName == "Alt Film Festival") {
				projectName = "ALT Film Festival";
			} else if (projectName == "Dotaunited.us") {
				projectName = "DotaUnited.us";
			}
			return projectName;
		}

		function loadContent(href) {
			makeProjectName(href);
			if ($(document).attr("title")!== projectName + "  | Aaron Khare") {
				$(document).attr("title", projectName + "  | Aaron Khare");
			}

			/**
			 *	Remove active class from all projects, before adding it to the project loaded,
			 *	based on the name of the project, derived from the see-more button href
			 */
			$('.work-thumbs').removeClass('active');
			$( "li[data-name='" + projectName + "']" ).addClass('active');
			if (pageProject) {
				var projectSelected = parseInt($('.work-thumbs.active').attr('id').replace('item','')) - 2;
				if (projectSelected < 0) {
					projectSelected = 0;
				}
				$('#portfolio').trigger('owl.goTo', projectSelected);
				pageProject = false;
			}

			/**
			 *	Hide existing content (if any), load .guts' content from project at href,
			 *	calc new dimensions of .work & width of loaded project content, append Close button to content,
			 *	animate height of .work and show
			 */
			$('.project-wrapper').fadeOut('slow');
			$('.project-button').fadeOut('fast');
			$workWrap.fadeOut('slow', function () {
				checkProject(projectName, href);
			});

			function checkProject (projectName, href) {
				if (projectName !== projectNamePrev && $(".guts[data-name='" + projectName + "']").length === 0) {
					$('.guts.original').remove();
					$.get(href, function (data) {
						$(data).find('.guts').prependTo($workWrap).attr('data-name', projectName).addClass('active').css('display', 'block');
						loadProject(projectName);
					});
				}
				else if (projectName == projectNamePrev || $(".guts[data-name='" + projectName + "']").length > 0) {
					$(".guts[data-name='" + projectName + "']").removeClass('old').addClass('active').css('display', 'block').prependTo($workWrap);
					loadProject(projectName);
				}
			}

			function loadProject (projectName) {
				projectOwl = $(".guts[data-name='" + projectName + "'].active .img-carousel");
				projectNamePrev = projectName;

				calcDimensions(projectName);

				// Automated project info generator, based on portfolio carousel project info
				$workLinkParent = $('.work-thumbs.active div');
				var projectTitle = $workLinkParent.children('h2').html();
				$(".guts[data-name='" + projectName + "'] .landing-content-wrap h2").html(projectTitle);
				var projectScope = $workLinkParent.children('.project-type').html().replace('<br>', ' | ');
				$(".guts[data-name='" + projectName + "'] .project-scope").html(projectScope);
				var projectTags = $workLinkParent.children('.project-tags').html();
				$(".guts[data-name='" + projectName + "'] .project-tags").html(projectTags);
				// console.log("projectTitle: " + projectTitle + "\n" + "projectScope: " + projectScope + "\n" + "projectTags: " + projectTags);

				if ($('.guts.active .video-wrap').length > 0) {
					$('.guts.active .project-description').css('bottom', '8%');
					$('.video-wrap iframe').load(function () {
						vimeoApiSet(100);
					});
				}
				if ($('.guts.active .img-carousel.owl-carousel').length > 0) {
					projectOwl.owlCarousel({
						slideSpeed : 300,
						paginationSpeed : 400,
						mouseDrag : false,
						touchDrag : false,
						singleItem: true,
						afterInit : buildControls,
						afterMove : moved
					});
				}

				$workDiv.animate({
					height: baseHeight + workWrapHeight + "px"
				}, 1000, function () {
					projectDisplay = 1;
					iscrollRefresh();
					$workWrap.fadeIn('slow');
					$('.project-wrapper').fadeIn('slow');
					$('.project-button').fadeIn('fast');
				});
			}
		}
		return false;
	});

	function calcDimensions (projectName) {
		var numContentItems  = $('.guts.active .project-content').length;
		var numImgItems      = $('.guts.active .project-img').length;
		var numTotalItems    = numContentItems + numImgItems;
		var owlWidth         = $("#portfolio .owl-wrapper-outer").width();
		var projectLiWidth   = 600;
		var projectImgWidth  = $('.guts.active .project-img').outerWidth();
		var projectContWidth = $('.guts.active .project-content').outerWidth();

		/**
		 *	Calc project content height based on window height
		 */
		if(winHeight < 500) {
			projectHeight = 500;
		} else if (winHeight > 650) {
			projectHeight = 600;
		} else {
			projectHeight = (winHeight-80); // Make adjustments for work-wrap padding & guts padding
		}
		$('.guts.active').height(projectHeight);
		workWrapHeight = $("#work-wrap").outerHeight(true);
		$('.project-wrapper').height((projectHeight + 60)); // Make adjustments for work-wrap padding

		/**
		 *	Set the width of the work-wrap so it'll sit inside the project wrappers
		 */
		var owlWidthNoPad = (owlWidth-20);
		$("#work-wrap").css('width', owlWidthNoPad);

		$('.guts.active .landing-img').width(owlWidthNoPad);
		landingWidth = $('.landing-img').width();
		$('.guts.active .landing-content-wrap').width((owlWidthNoPad-70));

		/**
		 *	Calc project content width based on window width
		 */
		if(winWidth < 600) {
			$('.guts.active .project-content').outerWidth(owlWidthNoPad);
			projectContWidth = $('.guts.active .project-content').outerWidth();
			$('.guts.active .project-img').outerWidth(owlWidthNoPad);
			projectImgWidth = projectContWidth;
			$('.guts.active').width(
				landingWidth +
				(numImgItems * projectImgWidth) +
				(numContentItems * projectContWidth)
			);
			screenSmall = true;
		} else {
			projectLiWidth = ((owlWidthNoPad-600)/2);
			$('.guts.active .project-content').outerWidth(owlWidthNoPad).css({
				'padding-left': projectLiWidth,
				'padding-right': projectLiWidth
			});
			$('.guts.active .project-img').outerWidth(owlWidthNoPad).css({
				'padding-left': projectLiWidth,
				'padding-right': projectLiWidth
			});
			$('.guts.active').width(
				landingWidth +
				(numTotalItems * owlWidthNoPad)
			);
			screenSmall = false;
		}

		$gutsLandingImg = $(".guts[data-name='" + projectName + "'] .landing-img");
		if ($gutsLandingImg.css('background-image') !== "none" && $('.guts.active').length > 0) {
			var bgCheck = $gutsLandingImg.css('background-image');
			bgCheck = bgCheck.replace('url(','').replace(')','');
			bgVal = bgCheck.split('/').pop();
			if (screenSmall) {
				bgNew = "url('" + bgCheck.replace(bgVal,'small.jpg') + "')";
			} else {
				bgNew = "url('" + bgCheck.replace(bgVal,'large.jpg') + "')";
			}
			$gutsLandingImg.css('background-image', bgNew);
		}
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
				setTimeout(function() {
					$("#navigational").removeClass("show-top").addClass("hide-top");
				}, 500);
				$('.guts.active .pc-last').addClass('fix');
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
			} else if (projectDisplay === 0) {
				myScroll.scrollToElement(document.querySelector('#portfolio'), 400, null, -10, IScroll.utils.ease.quadratic);
				setTimeout(function() {
					$("#navigational").removeClass("show-top").addClass("hide-top");
				}, 500);
			}
		}, 400);
	}

	var time = 5; // time in seconds
	var $progressBar,
	$elem,
	isPause,
	percentTime;

	function afterAction () {
		if ($('.active .img-carousel .play').hasClass('loaded')) {
			$('.active .img-carousel .play').removeClass('loaded').addClass('minimised');
			$('.active .img-carousel .play .fa').fadeIn('slow');
		}
	}
	//create div#progressBar and div#bar then prepend to $(".guts.active .img-carousel")
	function buildControls(elem){
		$elem = elem;
		if ($elem.children('.button').length === 0) {
			$elem.append(
				'<a class="button prev"><i class="fa fa-angle-left"></i></a>' +
				'<a class="button next"><i class="fa fa-angle-right"></i></a>' +
				'<a class="button-center loaded play stopped" title="Start carousel"><i class="fa fa-play"></i><i class="fa fa-stop"></i></a>');
		}
		$progressBar = $("<div>",{ class:"progress-bar" });
		$bar = $("<div>",{ class:"bar" });
		$progressBar.append($bar).appendTo($elem);

		$(".active .img-carousel .prev").click(function(e){
			projectOwl.trigger('owl.prev');
		});
		$(".active .img-carousel .next").click(function(e){
			projectOwl.trigger('owl.next');
		});
		$('.active .img-carousel .play').click(function () {
			if ($(this).hasClass('stopped')) {
				owlStart();
				afterAction();
				$('.active .img-carousel .play').removeClass('stopped').addClass('started').attr('title', 'Stop carousel');
			} else if ($(this).hasClass('started')) {
				clearTimeout(tick);
				$('.active .img-carousel .play').removeClass('started').addClass('stopped').attr('title', 'Start carousel');
			}
		});
	}
	function owlStart() {
		//reset timer
		percentTime = 0;
		isPause = false;
		//run interval every 0.01 second
		tick = setInterval(interval, 10);
	}
	function interval() {
		if(isPause === false){
			percentTime += 1 / time;
			$bar = $('.active .img-carousel .bar');
			$bar.css({
				width: percentTime+"%"
			});
			//if percentTime is equal or greater than 100
			if(percentTime >= 100){
				//slide to next item
				projectOwl.trigger('owl.next');
			}
		}
	}
	//moved callback
	function moved(){
		//minimise play button
		afterAction();
		if (projectOwl.children('.play').hasClass('started')) {
			//clear interval
			clearTimeout(tick);
			//start again
			owlStart();
		}
	}

	$('.active .img-carousel .item').on('mouseover',function(){
		isPause = true;
	});
	$('.active .img-carousel .item').on('mouseout',function(){
		isPause = false;
	});
	$('.active .img-carousel').children('.button').on('mouseover',function(){
		isPause = false;
	});

	/**
	 *	Detect click on Close button, prevent default action to load index.html,
	 *	set var backHome to value of href attribute, which is index.html,
	 *	call closeProject and changeToHome to which backHome is also sent
	 */
	$('.close-button').click(function(e) {
		e.preventDefault();
		var backHome = "index.html";
		closeProject();
		changeToHome(backHome);
	});

	/**
	 *	Set projectDisplay to 0 indicating no content,
	 *	set page title back to homepage, animate height of .work div back to base height via inline style,
	 *	remove inline style so responsive heights take over, refresh iScrolls and scroll to project carousel
	 */
	function closeProject () {
		projectDisplay = 0;
		if ($('.active .img-carousel .play').hasClass('started')) {
			$('.active .img-carousel .play').click();
		}
		$(document).attr("title", "Aaron Khare | Portfolio");
		$('.work-thumbs').removeClass('active');
		$('.project-wrapper').fadeOut('slow');
		$('.project-button').fadeOut('fast');
		$('#work-wrap').fadeOut('slow', function() {
			$('.guts.active').removeClass('active').fadeOut('fast').addClass('old');
			$('.work').animate({
				height: baseHeight +"px"
			}, 1000, function () {
				$('.work').removeAttr('style');
				iscrollRefresh();
			});
		});
	}

	/**
	 *	Also, if History supported, change url to backHome
	 *	@param {string}	backHome	"index.html"
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

	$('.project-scroll-left').click(function(e) {
		e.preventDefault();
		horScroll.scrollBy(landingWidth, 0, 100, IScroll.utils.ease.quadratic);
	});
	$('.project-scroll-right').click(function(e) {
		e.preventDefault();
		horScroll.scrollBy(-landingWidth, 0, 100, IScroll.utils.ease.quadratic);
	});

	function redrawThis (elemental) {
		var those = elemental;
		$(those).hide();
		setTimeout(function() {
			$(those).show();
		}, 0);
	}

	/**
	 *	Vimeo Player API Handling
	 */
	function vimeoApiSet (delay) {
		setTimeout(function() {
			var iframe = $('#projectplayer')[0],
				player = $f(iframe);

			// When the player is ready, add listeners for pause, finish, and playProgress
			player.addEvent('ready', ready);

			function ready () {
				player.addEvent('pause', onPause);
				player.addEvent('play', onPlay);
				player.addEvent('finish', onFinish);
			}

			// Call the API when a button is pressed
			// $('button').bind('click', function() {
			// player.api($(this).text().toLowerCase());
			// });
		}, delay);
	}

	function onPause(id) {
		if ($('.guts.active .landing-content-wrap').css('display') == 'none') {
			$('.guts.active .landing-content-wrap').fadeIn('fast');
		}
	}

	function onPlay (id) {
		$('.guts.active .landing-content-wrap').fadeOut('fast');
	}

	function onFinish(id) {
		if ($('.guts.active .landing-content-wrap').css('display') == 'none') {
			$('.guts.active .landing-content-wrap').fadeIn('fast');
		}
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

	});

	/**
	*	CUSTOM CLICK & CSS FUNCTIONS
	**/

	/**
	 *	Change cursor for draggable sections
	 */
	$('.owl-wrapper, .about-table').mousedown(function() {
		$('.owl-wrapper').addClass('cursor-grab');
	});
	$(document).mouseup(function() {
		$('.owl-wrapper').removeClass('cursor-grab');
	});

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
				$(".tooltip").css('display', 'none');
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
			$(".tooltip").css('display', 'none');
		}

		if ( this.y < -(winHeight * 0.2)) {
			$("#pre-row").css("opacity","0");
		} else {
			$("#pre-row").css("opacity","1");
		}

		if ( this.y < -(winHeight * 0.99)) {
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

		if ( this.y < -(winHeight * 0.99) && this.y > -(winHeight * 1.2) ) {
			$("#navigational").removeClass("hide-top").addClass("show-top");
		}
		else if ( this.y > -(winHeight * 0.99)) {
			$("#navigational").removeClass("show-top").addClass("hide-top");
			if ($("#main-menu").hasClass("show-main-menu")) {
				menuOverlay();
			}

		}

		if ($("#main-menu").hasClass("show-main-menu") === false) {
			if ( this.y < -(winHeight * 1.2) && this.y > -(winHeight * 1.4) ) {
				$("#navigational").removeClass("show-top").addClass("hide-top");
			}
			if (this.y < -(winHeight * 1.4)) {
				if (this.y < iscrollY) { // Scrolling Down
					$("#navigational").removeClass("show-top").addClass("hide-top");
					$('#landing .overlay').css('display', 'none');
				}
				else if (this.y > iscrollY) { // Scrolling Up
					$('#landing .overlay').fadeIn('fast');
					$("#navigational").addClass("show-top").removeClass("hide-top");
				}
			}
		}
	}

	/**
	*	iSCROLL INIT & OPTIONS
	**/
	function loaded () {
		winHeight = window.innerHeight;

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
			//myScroll.on('scrollEnd', function() {
			//	iscrollEnd = this.y;
			//});

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

			horScroll.on('beforeScrollStart', function() {
				$('.guts li').addClass('cursor-grab');
				setTimeout(function() {
					$('.guts li').removeClass('cursor-grab');
				}, 500);
			});
			horScroll.on('scrollEnd', function() {
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
