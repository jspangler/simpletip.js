var SimpleTip;

(function(z) {
	// Local tooltip
	var Tooltip = function(options) {
		this.options = options;
		this.create();
	};
	
	Tooltip.prototype = {
		// concise way to create single element
		createElement: function(str) {
			var div = document.createElement('div');
			div.innerHTML = str;
			return div.childNodes[0];
		},

		// calculates location for the tip
		positionTip: function() {
			var offset = 6, pos_top = 0, pos_left = 0;
			var rect			= this.options.element.getBoundingClientRect();
			var tip_rect		= this.shell.getBoundingClientRect();
			
			switch (this.options.position) {
				case 'left':
					pos_top		= rect.top + (rect.height / 2) - (tip_rect.height / 2);
					pos_left	= rect.left - tip_rect.width - offset;
					break;
				case 'right':
					pos_top		= rect.top + (rect.height / 2) - (tip_rect.height / 2);
					pos_left	= rect.left + rect.width + offset;
					break;
				case 'bottom':
					pos_top		= rect.top + rect.height + offset;
					pos_left	= rect.left + (rect.width / 2) - (tip_rect.width / 2);
					break;
				default:
					pos_top		= rect.top - tip_rect.height - offset;
					pos_left	= rect.left + (rect.width / 2) - (tip_rect.width / 2);
					break;
			}

			this.shell.style.top	= pos_top + 'px';
			this.shell.style.left	= pos_left + 'px';
		},
		
		create: function() {
			this.shell		= this.createElement('<div class="z-tip">' + this.options.html + '</div>');
			
			document.body.appendChild(this.shell);
			
			this.mouseoutFunc = this.destroy.bind(this);
			this.options.element.addEventListener('mouseout', this.mouseoutFunc);
			
			this.positionTip();

			this.shell.style.opacity = 1;
		},
		
		destroy: function() {
			window.setTimeout(function() {
				this.shell.parentNode.removeChild(this.shell);
			}.bind(this), 250);
			this.shell.style.opacity = 0;
			this.options.element.removeEventListener('mouseout', this.mouseoutFunc);
		}
	};
	
	z = Tooltip;
	
	document.addEventListener('mouseover', function(e) {
		
		if (e.target.hasAttribute('data-tooltip')) {
			var options			= {};
			options.position	= e.target.getAttribute('data-tooltip');
			options.html		= e.target.getAttribute('data-html');
			options.element		= e.target;
			new Tooltip(options);
			return false;
		}
	});
})(SimpleTip);