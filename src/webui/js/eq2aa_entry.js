$(function () {
   var hash = "";
   if (window.location.hash)
      hash = window.location.hash.slice(1);
   else if (window.location.search)
      hash = window.location.search.slice(1);
      
   var iconDir = "css/icons/",
      classLoader = new Beetny.EQ2AA.ClassLoader("js/trees/"),
      importer = new Beetny.EQ2AA.Importer(classLoader),
      elementBuilder = new Beetny.EQ2AA.Rendering.ElementBuilder(iconDir),
      graphicsRenderer = new Beetny.EQ2AA.Rendering.RaphaelRenderer,
      renderer = new Beetny.EQ2AA.Rendering.Renderer(graphicsRenderer, elementBuilder);
   
   Beetny.EQ2AA.Main.apply(Beetny.EQ2AA, [classLoader, renderer, importer, hash]);
});