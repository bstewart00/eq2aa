Beetny = {};
Beetny.emptyFunc = function () {};
Beetny.reorderArray = function (array, orderedIndexes) {
	if (!orderedIndexes)
		return array;
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		var orderedIndex = orderedIndexes[i];
		if (orderedIndex == null)
			orderedIndex = i;
		newArray[orderedIndex] = array[i]
	}
	return newArray
};
Beetny.getUrlParameterByName = function (name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if (results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "))
};
Beetny.repeatChar = function (str, n) {
	var result = "";
	for (var i = 0; i < n; i++)
		result += str;
	return result
};
Object.size = function (obj) {
	var size = 0,
	key;
	for (key in obj)
		if (obj.hasOwnProperty(key))
			size++;
	return size
};
Object.values = function (obj) {
	return Object.keys(obj).map(function (key) {
		return obj[key]
	}, this)
};
Object.items = function (obj) {
	return Object.keys(obj).map(function (key) {
		return {
			key : key,
			value : obj[key]
		}
	}, this)
};
Object.iterItems = function (obj, callback, thisValue) {
	Object.items(obj).forEach(function (item) {
		callback.apply(thisValue || obj, [item.key, item.value])
	})
};
Array.prototype.trueForAll = function () {
	if (this.length === 0)
		return false;
	for (var i = 0; i < this.length; ++i)
		if (!this[i])
			return false;
	return true
};
Array.prototype.sum = function () {
	for (var i = 0, sum = 0; i < this.length; sum += this[i++]);
	return sum
};
Array.prototype.collateAdjacentDuplicates = function () {
	for (var i = 0; i < this.length; ++i) {
		var current = this[i];
		var adjacentDuplicateCount = 0;
		for (var j = 1; i + j < this.length && this[i + j] === current; ++j)
			++adjacentDuplicateCount;
		for (var dupe = 0; dupe < adjacentDuplicateCount; ++dupe)
			this[i] += current;
		this.splice(i + 1, adjacentDuplicateCount)
	}
	return this
};
window.namespace = function () {
	var a = arguments,
	o = window,
	i = 0,
	j = 0,
	tok = null,
	name = null;
	for (i = 0; i < a.length; i = i + 1) {
		tok = a[i].split(".");
		for (j = 0; j < tok.length; j = j + 1) {
			name = tok[j];
			o[name] = o[name] || {};
			o = o[name]
		}
	}
	return o
};
(function ($) {
	$.fn.disableSelection = function () {
		return this.each(function () {
			$(this).attr("unselectable", "on").css({
				"-moz-user-select" : "none",
				"-webkit-user-select" : "none",
				"user-select" : "none",
				"-ms-user-select" : "none"
			}).each(function () {
				this.onselectstart = function () {
					return false
				}
			})
		})
	}
})(jQuery);
(function () {
	var initializing = false,
	fnTest = /xyz/.test(function () {
			xyz
		}) ? /\b_super\b/ : /.*/;
	this.Class = function () {};
	Class.extend = function (prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this;
		initializing = false;
		for (var name in prop)
			prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? function (name, fn) {
				return function () {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret
				}
			}
		(name, prop[name]) :
		prop[name];
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments)
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class
	}
})();