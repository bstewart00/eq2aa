namespace("Beetny.EQ2AA");
Beetny.EQ2AA.Main = function (classLoader, renderer, importer, importHash, urlUpdater) {
	var currentViewer = null;
	var viewerContainer = $("#content");
	
	addClassLinks();
	addViewerCommands();
	initializeCharacterSearch();
	
	if (importHash && importHash.length > 0) {
		var importResult = importer.importClassFromHash(importHash);
		if (importResult.errorMessage) {
			var html = '<div class="error">{Message}</div>'.replace("{Message}", importResult.errorMessage);
			$(html).appendTo(viewerContainer)
		} else {
			selectClassLink(importResult.classObj.name);
			currentViewer =
				createViewerAndRender(importResult.classObj);
			currentViewer.selectTree(importResult.classObj.trees[0]);
			currentViewer.updateHash()
		}
	}
	
	function selectClassLink(className) {
		$("#class-list .selected").removeClass("selected");
		$("#class-list li").filter(function () {
			return $(this).text() === className
		}).addClass("selected")
	}
	
	function addClassLinks() {
		var classList = $("#class-list");
				
		Object.iterItems(Beetny.EQ2AA.Constants.SortedClassNames, function (className, id) {
			var template = '<li><a href="javascript:;">{Name}</a></li>'.replace("{Name}", className);
					
			$(template)
				.appendTo(classList)
				.on("click", onClassLinkClick(id));
		});
		
		function onClassLinkClick(classId) {
			return function (e) {
				var link = $(e.target);
				selectClassLink(link.text());
				var className = Beetny.EQ2AA.Constants.ClassNames[classId];
				$(".tree-viewer").hide();
				$("#content .error").remove();
				var existingViewer = $(".tree-viewer." + className);
				if (existingViewer.length > 0) {
					currentViewer = existingViewer.data("viewer");
					currentViewer.fullRefresh();
					existingViewer.show()
				} else {
					var classObj = classLoader.loadClass(classId);
					currentViewer = createViewerAndRender(classObj);
					currentViewer.selectTree(classObj.trees[0])
				}
			}
		}
	}
	
	function createViewerAndRender(classObj) {
		var viewer = new Beetny.EQ2AA.AATreeViewer(classObj, renderer, urlUpdater);
		viewer.render("#content");
		return viewer
	}
	
	function addViewerCommands() {
		Beetny.EQ2AA.Commands.forEach(function (command) {
			command.render().on("click", onCommandClick).appendTo("#commands");
			
			function onCommandClick() {
				if (currentViewer)
					command.execute(currentViewer)
			}
		})
	}
	
	function initializeCharacterSearch() {
		$("#character-search").autocomplete({
			source : function (request, response) {
				$.ajax({
					url : "http://census.daybreakgames.com/s:eq2aa/json/get/eq2/character/",
					dataType : "jsonp",
					data : {
						"c:limit" : 10,
						displayname : "/" + request.term,
						"c:show" : "id,displayname"
					},
					success : function (data) {
						response(data.character_list.map(function (character) {
								return {
									label : character.displayname,
									value : character.id
								}
							}))
					}
				})
			},
			minLength : 2,
			select : function (event, ui) {
				var url = "http://beetny.com/eq2aa/character/" + ui.item.value;
				window.location =
					url;
				return false
			},
			open : function () {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top")
			},
			close : function () {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all")
			}
		})
	}
};

