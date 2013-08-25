Beetny.StringBuilder = Beetny.Class.extend({
   init: function () {
      this._string = "";
   },
   
   appendLine: function (str) {
      this._string += str + '\n';
      return this;
   },
   
   build: function () {
      return this._string;
   }
});
