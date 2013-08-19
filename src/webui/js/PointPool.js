namespace("Beetny.EQ2AA.Model");
Beetny.EQ2AA.Model.PointPool = Class.extend({
		init : function (poolJson) {
			$.extend(this, poolJson);
			this.spent = 0
		},
		type : function () {
			return this.name.replace(" ", "")
		},
		html : function () {
			return '<li><label class="{Type}">{Label}:<span class="spent">{NumSpent}</span>/<span class="max">{Max}</span></label></li>'.replace("{Type}", this.type()).replace("{Label}", this.name).replace("{NumSpent}", this.spent).replace("{Max}", this.max)
		}
	});
Beetny.EQ2AA.Model.CompositePointPool = Class.extend({
		init : function (childPoolsJson) {
			$.extend(this, childPoolsJson);
			Object.iterItems(this.child_pools, function (type, pool) {
				this.child_pools[type] = new Beetny.EQ2AA.Model.PointPool(pool)
			}, this)
		},
		type : function () {
			return this.name.replace(" ", "")
		},
		orderedChildPools : function () {
			var orderedTypes = Object.keys(this.child_pools).sort();
			return orderedTypes.map(function (t) {
				return this.child_pools[t]
			}, this)
		},
		html : function () {
			var html = "<li><ul><label>{Name}:</label>".replace("{Name}",
					this.name);
			html += this.orderedChildPools().reduce(function (previousValue, childPool) {
				return previousValue + childPool.html()
			}, "");
			html += "</ul></li>";
			return html
		}
	});