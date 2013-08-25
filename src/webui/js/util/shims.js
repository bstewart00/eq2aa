if (!Object.keys)
   Object.keys = function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = ! {
         toString : null
      }.propertyIsEnumerable("toString"), dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], dontEnumsLength = dontEnums.length;
      return function(obj) {
         if ( typeof obj !== "object" && typeof obj !== "function" || obj === null)
            throw new TypeError("Object.keys called on non-object");
         var result = [];
         for (var prop in obj)
         if (hasOwnProperty.call(obj, prop))
            result.push(prop);
         if (hasDontEnumBug)
            for (var i = 0; i < dontEnumsLength; i++)
               if (hasOwnProperty.call(obj, dontEnums[i]))
                  result.push(dontEnums[i]);
         return result
      }
   }();
if (!Array.prototype.forEach)
   Array.prototype.forEach = function forEach(callback, thisArg) {
      var T, k;
      if (this == null)
         throw new TypeError("this is null or not defined");
      var O = Object(this);
      var len = O.length >>> 0;
      if ( {}.toString.call(callback) !== "[object Function]")
         throw new TypeError(callback + " is not a function");
      if (thisArg)
         T = thisArg;
      k = 0;
      while (k < len) {
         var kValue;
         if (Object.prototype.hasOwnProperty.call(O, k)) {
            kValue = O[k];
            callback.call(T, kValue, k, O)
         }
         k++
      }
   };
if (!Array.prototype.map)
   Array.prototype.map = function(callback, thisArg) {
      var T, A, k;
      if (this == null)
         throw new TypeError(" this is null or not defined");
      var O = Object(this);
      var len = O.length >>> 0;
      if ( typeof callback !== "function")
         throw new TypeError(callback + " is not a function");
      if (thisArg)
         T = thisArg;
      A = new Array(len);
      k = 0;
      while (k < len) {
         var kValue, mappedValue;
         if ( k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);
            A[k] = mappedValue
         }
         k++
      }
      return A
   };
if (!Array.prototype.reduce)
   Array.prototype.reduce = function reduce(accumulator) {
      if (this === null || this === undefined)
         throw new TypeError("Object is null or undefined");
      var i = 0, l = this.length >> 0, curr;
      if ( typeof accumulator !== "function")
         throw new TypeError("First argument is not callable");
      if (arguments.length < 2) {
         if (l === 0)
            throw new TypeError("Array length is 0 and no second argument");
         curr = this[0];
         i = 1
      } else
         curr = arguments[1];
      while (i < l) {
         if ( i in this)
            curr = accumulator.call(undefined, curr, this[i], i, this);
         ++i
      }
      return curr
   };
if (!Array.prototype.filter) {
   Array.prototype.filter = function(fun /*, thisp*/) {'use strict';

      if (!this) {
         throw new TypeError();
      }

      var objects = Object(this);
      var len = objects.length >>> 0;
      if ( typeof fun !== 'function') {
         throw new TypeError();
      }

      var res = [];
      var thisp = arguments[1];
      for (var i in objects) {
         if (objects.hasOwnProperty(i)) {
            if (fun.call(thisp, objects[i], i, objects)) {
               res.push(objects[i]);
            }
         }
      }

      return res;
   };
}