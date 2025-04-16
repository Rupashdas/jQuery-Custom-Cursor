!(function ($) {
	// Utility: Detect browser name and version
	const getBrowserName = () => {
		const userAgent = navigator.userAgent;
		const match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		let name = "";

		if (/trident/i.test(match[1])) {
			const ieVersion = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
			name = "IE " + (ieVersion[1] || "");
		} else if (match[1] === "Chrome") {
			const opera = userAgent.match(/\bOPR\/(\d+)/);
			name = opera ? "Opera " + opera[1] : "Chrome";
		} else {
			const fallback = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion];
			const versionMatch = userAgent.match(/version\/(\d+)/i);
			if (versionMatch) fallback[1] = versionMatch[1];
			name = fallback.join(" ");
		}
		return name;
	};

	/**
	 * jQuery plugin to show a custom cursor that follows the mouse.
	 * 
	 * @param {Object} options Configuration options
	 * @param {string} options.imageUrl Path to the cursor image
	 * @param {number|string} [options.offsetX="auto"] Horizontal offset (or "auto")
	 * @param {number|string} [options.offsetY="auto"] Vertical offset (or "auto")
	 * @param {number} [options.height=50] Cursor height in pixels
	 * @param {number} [options.width=50] Cursor width in pixels
	 * @param {number} [options.zIndex=999999] Z-index of the cursor
	 * @param {string} [options.cursorId="custom-cursor"] DOM ID for the cursor
	 * @param {string|jQuery} [options.excludeSelector=""] Elements that should temporarily hide the custom cursor
	 */
	$.fn.customCursor = function ({
		imageUrl = "",
		offsetX = "auto",
		offsetY = "auto",
		height = 50,
		width = 50,
		zIndex = 999999,
		cursorId = "custom-cursor",
		excludeSelector = ""
	} = {}) {
		// Skip if touch-enabled device
		if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) return this;

		const browser = getBrowserName();
		const isOldIE = browser.includes("IE");
		const ieVersion = parseInt(browser.replace(/^\D+/g, ""), 10);

		const calculatedOffsetX = offsetX === "auto" ? Math.ceil(width / 2) : offsetX;
		const calculatedOffsetY = offsetY === "auto" ? Math.ceil(height / 2) : offsetY;

		// Create and style cursor element
		const $cursor = $(`
			<div id="${cursorId}" class="custom-cursor" style="height:${height}px; width:${width}px;"></div>
		`).css({
			background: `url("${imageUrl}") no-repeat left top`,
			position: "fixed",
			display: "block",
			"z-index": zIndex,
			"pointer-events": "none",
			transform: "translateZ(0)"
		}).appendTo("body");

		const cursorEl = $cursor[0];

		// Handlers
		const showCursor = () => { $cursor.show(); return false; };
		const hideCursor = () => { $cursor.hide(); return false; };

		// Skip binding on very old IE
		if (!(isOldIE && ieVersion < 9)) {
			this
				.on("mouseenter", showCursor)
				.on("mouseleave", hideCursor)
				.on("mousemove", (e) => {
					cursorEl.style.left = (e.clientX - calculatedOffsetX) + "px";
					cursorEl.style.top = (e.clientY - calculatedOffsetY) + "px";
				})
				.css("cursor", "none");

			// Allow certain elements to hide the cursor
			$(excludeSelector)
				.on("mouseenter", hideCursor)
				.on("mouseleave", showCursor);

			// Initialize position
			$(document).trigger("mousemove");
		}

		return this;
	};
})(jQuery);
