$(function() {
   var printBuild = Beetny.getUrlParameterByName("build");
   if (printBuild.length > 0) {
      var classLoader = new Beetny.EQ2AA.ClassLoader("js/trees/");
      var importer = new Beetny.EQ2AA.Importer(classLoader);
      var importResult = importer.importClassFromHash(printBuild);
      if (importResult.classObj) {
         var printer = new Beetny.EQ2AA.ClassPrinter;
         printer.print(importResult.classObj, $("body"))
      }
   }
});
