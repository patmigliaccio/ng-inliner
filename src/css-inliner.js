'use strict';

var cssInline = {
	bindings: {
		elementId: '@',
		whitelist: '<',
		blacklist: '<'
	},
	controller: controller
};

controller.$inject = ['$window'];
function controller($window){
	var scope = this,
		element;

	if (scope.elementId){
		element = document.getElementById(scope.elementId);
	} else {
		throw new Error('Attribute element-id is not defined!');
	}

	console.log(scope.elementId, element);

	//whitelist css properties
	if (!angular.isDefined(scope.whitelist)) {
		//CSS 2.1 properties supported for default whitelist
		scope.whitelist = ["background", "background-color", "background-image", "background-position", "background-repeat", "border", "border-bottom", "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-style", "border-top-width", "border-width", "bottom", "color", "content", "cursor", "display", "float", "font", "font-family", "font-size", "font-style", "font-weight", "height", "left", "letter-spacing", "line-height", "list-style", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "max-height", "max-width", "min-height", "min-width", "overflow", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "position", "right", "table-layout", "text-align", "text-decoration", "text-indent", "text-transform", "top", "vertical-align", "visibility", "white-space", "width", "word-spacing", "z-index"];
	} else if (angular.isString(scope.whitelist)) {
		scope.whitelist = [scope.whitelist];
	} else if (!angular.isArray(scope.whitelist)) {
		throw new Error('Whitelist is not an Array or string!');
	}

	//blacklist css properties
	if (!angular.isDefined(scope.blacklist)) {
		scope.blacklist = [];
	} else if (angular.isString(scope.blacklist)) {
		scope.blacklist = [scope.blacklist];
	} else if (!angular.isArray(scope.blacklist)) {
		throw new Error('Blacklist is not an Array or string!');
	}


	//$timeout allows for DOM to get ready
	this.$postLink = function() {
		//recursive application of css styles on elements and children
		var applyInlineStyles = function (ele) {
			var childElements = ele.children;
			for (var i = 0; i < childElements.length; i++) {
				var child = childElements[i];

				var style = $window.getComputedStyle(child, null);
				var properties = [];

				for (var property in style) {
					//only selects from whitelist and ignores if blacklisted
					if (scope.whitelist.indexOf(property) > -1 && scope.blacklist.indexOf(property) === -1) {
						properties.push(property + ':' + style[property]);
					}
				}

				child.style.cssText = properties.join(';');

				//TODO add attribute to ignore nested elements
				applyInlineStyles(child);
			}
		};

		applyInlineStyles(element);
	};
}

angular.module('cssInliner', [])
	.component('cssInline', cssInline);