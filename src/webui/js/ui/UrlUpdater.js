namespace('Beetny.EQ2AA');
Beetny.EQ2AA.UrlUpdater = Class.extend({
   updateUrlHash : function(classObj) {
      var hash = Beetny.EQ2AA.GameVersions.LatestUpdate + ";" + classObj.createHash();
      if (window.location.search.length === 0)
         window.location.hash = hash;
      var exportUrl = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "#" + hash;
      $("#commands .command.export a").prop("href", exportUrl); //TODO: OnUrlUpdated event
   }
});
