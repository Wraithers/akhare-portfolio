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
	var myScroll;
	var iscrollY;
	var iscrollEnd;
	var iscrollInit;
	var nowScrollY;
	var position;
	var posY;
	var winHeight = pageHeight;
	var mainContentHeight = $('#main-content').height();
	var owl;
	var aboutOwl;
	var formFocus;
	var tooltipExist;
	var joyrideBlock;

	/**
	*   ON RESIZE, check again
	*/
	$(window).resize(function () {
		pageWidth = $(window).width();
		winHeight = $(window).height();
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
		resize(); //IMPORTANT - Don't Ask...
	window.onresize = function() {
			resize();
	};

	/**
	 *	Styling of landing area links once iScroll allows scrolling
	 *	i.e. iScroll initialised and target classes attached to DOM elements
	 */
	function styleLinks () {
		setTimeout(function() {
			if ($('#pre-landing').hasClass('iScrollLoneScrollbar')) {
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
				styleLinks();
			}
		}, 10);
	}

	styleLinks();

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
	 *   Owl Carousel for all the work
	 */

	owl = $("#portfolio");

	owl.owlCarousel({
		itemsCustom : [
		[0, 1],
		[600, 2],
		[1000, 3],
		[1200, 3],
		[1400, 4],
		[1600, 5]
		]
	});

	// Custom Navigation Events for portfolio Owl Carousel
	$(".next").click(function(){
		owl.trigger('owl.next');
	});
	$(".prev").click(function(){
		owl.trigger('owl.prev');
	});

	/**
	 *	MEDIA QUERY HANDLER - Enquire.js
	 */

	aboutOwl = $('.about-table-wrap');

	enquire.register("screen and (max-width:64em)", {

		// OPTIONAL
		// If supplied, triggered when a media query matches.
		match : function() {
			$('.about-table-wrap').addClass('owl-carousel');
		},

		// OPTIONAL
		// If supplied, triggered when the media query transitions
		// *from a matched state to an unmatched state*.
		unmatch : function() {
			$('.about-table-wrap').removeClass('owl-carousel');
		},

		// OPTIONAL
		// If supplied, triggered once, when the handler is registered.
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

		// OPTIONAL, defaults to false
		// If set to true, defers execution of the setup function
		// until the first time the media query is matched
		deferSetup : true,

		// OPTIONAL
		// If supplied, triggered when handler is unregistered.
		// Place cleanup code here
		destroy : function() {
			$(".about-table-wrap").data('owlCarousel').destroy();
		}

	});

	/**
	*	CUSTOM CLICK & CSS FUNCTIONS
	**/

	/**
	 *	Calls formFocusIn function whenever an input is focused on
	 */
	$(".contact-me").focusin(clickActivity(1));

	$('.has-tip').click(clickActivity(2));

	/**
	 *	Function that receives click activity on the form or tooltip holders
	 * @param  {int} click Denotes if a form is selected (1) or tooltip created (2)
	 *	If 1, function blurs inputs, when clicking outside them
	 *	If 2, function fades out tooltips, when clicking outside them
	 *	iScroll prevents both without this
	 */
	function clickActivity (click) {
		formFocus = click;
		tooltipExist = click;
		if (formFocus == 1) {
			$(document).click(function() {
				formFocus = 0;
				$( ":input" ).blur();
			});
		}
		setTimeout(function() {
			if (tooltipExist == 2) {
				$(":not(.has-tip)").click(function() {
					tooltipExist = 0;
					$(".tooltip").fadeOut('fast');
				});
			}
		}, 200);
	}

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
			$("#main-menu").css("display","");
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
	$(".lines-button").click(menuOverlay);

	$(".exit-off-canvas").click(menuOverlay);

	/**
	 * Trigger appropriate page scrolling on `Home`, `End`, `Pg Up`, `Pg Down`, `Up` and `Down` keypresses
	 * @param  {Keydown} event Handler to trigger the check-event.which-and-scroll function
	 */
	$(document).on('keydown', function(event) {
		if (iscrollInit) {
			if (formFocus !== 1) {
				var keyPress = event.which;
				switch (keyPress)
				{
				case 36: // Home key pressed
					myScroll.scrollTo(0, 0, 400, IScroll.utils.ease.quadratic);
				break;
				case 35: // End key pressed
					myScroll.scrollTo(0, -mainContentHeight, 400, IScroll.utils.ease.quadratic);
				break;
				case 33: // Page Up key pressed
					if (nowScrollY < -140) {
						myScroll.scrollBy(0, 500, 300, IScroll.utils.ease.quadratic);
					}
				break;
				case 34: // Page Down key pressed
					if (nowScrollY > (-mainContentHeight+200)) {
						myScroll.scrollBy(0, -500, 300, IScroll.utils.ease.quadratic);
					}
				break;
				case 38: // Up key pressed
					myScroll.scrollBy(0, 100, 200, IScroll.utils.ease.quadratic);
				break;
				case 40: // Down key pressed
					myScroll.scrollBy(0, -100, 200, IScroll.utils.ease.quadratic);
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

			// Check if Joyride list exists via length, but not if cookie present and joyrideBlock still present,
			// then bring menu down and start Joyride
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
			// menuOverlay();
			$("#navigational").removeClass("show-top").addClass("hide-top");
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

		setTimeout(function() {
			myScroll = new IScroll('#wrapper', {
				probeType: 3,
				mouseWheel: true,
				click: true,
				bounce: false,
				// momentum: false,
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
		}, 100);
	}

	/**
	*	iSCROLL TO ANCHORS
	**/

	$("#scroll-main").click(function() {
		myScroll.scrollToElement(document.querySelector('#main-content'), 1200, null, null, IScroll.utils.ease.circular);
	});

	$(".work-link").click(function() {
		myScroll.scrollToElement(document.querySelector('#work'), 1200, null, null, IScroll.utils.ease.quadratic);
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
	*	EVENT LISTENERS
	**/

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	window.addEventListener('load', loaded);
});
