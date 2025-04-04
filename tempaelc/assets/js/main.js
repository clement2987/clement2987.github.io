/*
	Wide Angle by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var	$window		= $(window),
		$header		= $('#header'),
		$banner		= $('#banner'),
		$body		= $('body'),
		settings	= {
			banner: {

				// Indicators (= the clickable dots at the bottom).
					indicators: true,

				// Transition speed (in ms)
				// For timing purposes only. It *must* match the transition speed of "#banner > article".
					speed: 1500,

				// Transition delay (in ms)
					delay: 4000

			}
		};

	/**
	 * Custom banner slider for Zenith.
	 * @return {jQuery} jQuery object.
	 */
		$.fn._slider = function(options) {

			var	$window = $(window),
				$this = $(this);

			if (this.length == 0)
				return $this;

			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i])._slider(options);

				return $this;

			}

			// Vars.
				var	current = 0, pos = 0, lastPos = 0,
					slides = [], indicators = [],
					$indicators,
					$slides = $this.children('article'),
					intervalId,
					isLocked = false,
					i = 0;

			// Turn off indicators if we only have one slide.
				if ($slides.length == 1)
					options.indicators = false;

			// Functions.
				$this._switchTo = function(x, stop) {

					if (isLocked || pos == x)
						return;

					isLocked = true;

					if (stop)
						window.clearInterval(intervalId);

					// Update positions.
						lastPos = pos;
						pos = x;

					// Hide last slide.
						slides[lastPos].removeClass('top');

						if (options.indicators)
							indicators[lastPos].removeClass('visible');

					// Show new slide.
						slides[pos].addClass('visible').addClass('top');

						if (options.indicators)
							indicators[pos].addClass('visible');

					// Finish hiding last slide after a short delay.
						window.setTimeout(function() {

							slides[lastPos].addClass('instant').removeClass('visible');

							window.setTimeout(function() {

								slides[lastPos].removeClass('instant');
								isLocked = false;

							}, 100);

						}, options.speed);

				};

			// Indicators.
				if (options.indicators)
					$indicators = $('<ul class="indicators"></ul>').appendTo($this);

			// Slides.
				$slides
					.each(function() {

						var $slide = $(this),
							$img = $slide.find('img');

						// Slide.
							$slide
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-position', ($slide.data('position') ? $slide.data('position') : 'center'));

						// Add to slides.
							slides.push($slide);

						// Indicators.
							if (options.indicators) {

								var $indicator_li = $('<li>' + i + '</li>').appendTo($indicators);

								// Indicator.
									$indicator_li
										.data('index', i)
										.on('click', function() {
											$this._switchTo($(this).data('index'), true);
										});

								// Add to indicators.
									indicators.push($indicator_li);

							}

						i++;

					});

			// Initial slide.
				slides[pos].addClass('visible').addClass('top');

				if (options.indicators)
					indicators[pos].addClass('visible');

			// Bail if we only have a single slide.
				if (slides.length == 1)
					return;

			// Main loop.
				intervalId = window.setInterval(function() {

					current++;

					if (current >= slides.length)
						current = 0;

					$this._switchTo(current);

				}, options.delay);

		};

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Slider.
		$banner._slider(settings.banner);

	// Dropdowns.
		$('.nav')
			.dropotron({
				offsetY: -50,
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center',
				hideDelay: 350
			});

	// Menu.
		$('<a href="#navPanel" class="navPanelToggle"><span class="label">Menu</span></a>')
			.appendTo($header);

		$('<div id="navPanel">' + '<nav>' + $('.nav').navList() + '</nav>' + '<a href="#navPanel" class="close"></a>' + '</div>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left'
			});

})(jQuery);

/* lightning effect */

const heroLogo = document.getElementById("hero-logo");

function getRandomPoint(){
	// Get element's position and dimensions
    const rect = heroLogo.getBoundingClientRect();

    // Generate random X and Y within the element
    const randomX = rect.left + Math.random() * rect.width;
    const randomY = rect.top + Math.random() * rect.height;

    return { x: randomX, y: randomY };
}

function drawLightning(x1, y1, x2, y2){
	console.log("drawing lightning")
	const lightning = document.createElement('div');
	lightning.classList.add('lightning');

	const dx = x2-x1;
	const dy = y2-y1;
	const length = Math.sqrt(dx * dx + dy * dy);

	const angle = Math.atan2(dy, dx) * (180 / Math.PI);

	// Position and style the lightning
	lightning.style.width = `${length}px`;
	lightning.style.left = `${x1}px`;
	lightning.style.top = `${y1}px`;
	lightning.style.transform = `rotate(${angle}deg)`;

	document.body.appendChild(lightning);

	setTimeout(() => {
		lightning.style.transition = 'opacity 100ms ease-out';
		lightning.style.opacity = '0';
		setTimeout(() => lightning.remove(), 100);
	}, 50);
}

function generatePath(x1, y1, x2, y2) {
	const points = [{ x: x1, y: y1 }];
	const segments = 6;
	const dx = (x2 - x1) / segments;
	const dy = (y2 - y1) / segments;

	for (let i = 1; i < segments; i++) {
		const px = x1 + dx * i;
		const py = y1 + dy * i;

		// Offset perpendicular to the line
		const offset = (Math.random() - 0.5) * 20; // control jaggedness here
		const perpAngle = Math.atan2(dy, dx) + Math.PI / 2;
		const ox = Math.cos(perpAngle) * offset;
		const oy = Math.sin(perpAngle) * offset;

		points.push({
			x: px + ox,
			y: py + oy
		});
	}

	points.push({ x: x2, y: y2 });
	return points;
}



function trackMouse(event) {
	const lightningTarget = getRandomPoint();
	const path = generatePath(event.x, event.y, lightningTarget.x, lightningTarget.y);

	for (let i = 0; i < path.length - 1; i++) {
		const start = path[i];
		const end = path[i + 1];
		drawLightning(start.x, start.y, end.x, end.y);
	}
}

heroLogo.addEventListener("mouseover", ()=> {
	document.addEventListener("mousemove", trackMouse)
})
heroLogo.addEventListener("mouseout", ()=> {
	document.removeEventListener("mousemove", trackMouse)
})

